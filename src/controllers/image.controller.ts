import {BaseController} from './base.controller';
import {ImageService} from '../services';
import {del, get, getModelSchemaRef, param, post, requestBody} from '@loopback/openapi-v3';
import {inject} from '@loopback/context';
import {Image, ImageEnvVar, ImageProtocol, ImageVolume, Protocol} from '../models/domain';
import {HttpErrors} from '@loopback/rest';
import {ImageCreatorDto} from './dto';
import {OpenStackDatasource} from '../datasources';


export class ImageController extends BaseController {


  constructor(@inject('services.ImageService') private _imageService: ImageService,@inject('datasources.openStack') dataSource: OpenStackDatasource) {
    super();
  }

  @get('/images', {
    summary: 'Get a list of all images',
    responses: {
      '200': {
        description: 'OK',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Image)},
          },
        },
      },
    },
  })
  getAll(): Promise<Image[]> {
    return this._imageService.getAll();
  }

  @get('/images/protocols', {
    summary: 'Get a list of all image protocols',
    responses: {
      '200': {
        description: 'OK',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Protocol)},
          },
        },
      },
    },
  })
  getAllProtocols(): Promise<Protocol[]> {
    return this._imageService.getAllProtocols();
  }

  @get('/images/{id}', {
    summary: 'Get an image by a given identifier',
    responses: {
      '200': {
        description: 'Ok',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Image),
          },
        },
      },
    },
  })
  async getById(@param.path.string('id') id: number): Promise<Image> {
    const image = await this._imageService.getById(id);

    this.throwNotFoundIfNull(image, 'Image with given id does not exist');

    return image;
  }


  @post('/images', {
    summary: 'Create a new image',
    responses: {
      '201': {
        description: 'Created',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Image),
          },
        },
      },
    },
  })
  async create(@requestBody() imageCreator: ImageCreatorDto): Promise<Image> {
    this.throwBadRequestIfNull(imageCreator.protocols, 'Image must have protocols specified');
    this.throwBadRequestIfEmpty(imageCreator.protocols, 'Image must have protocols specified');

    const protocols = await this._imageService.getProtocolByIds(imageCreator.protocols.map(imageProtocol => imageProtocol.protocolId));
    if (protocols.find(protocol => protocol == null) != null) {
      throw new HttpErrors.BadRequest('A specified protocol does not exist');
    }

    const image: Image = new Image({
      name: imageCreator.name,
      computeId: imageCreator.computeId,
      description: imageCreator.description,
      environmentType: imageCreator.environmentType,
      command: imageCreator.command,
      args: imageCreator.args,
      protocols: imageCreator.protocols.map(imageProtocol => new ImageProtocol({
        port: imageProtocol.port,
        protocol: protocols.find(protocol => protocol.id === imageProtocol.protocolId),
      })),
      volumes: imageCreator.volumes.map(imageVolume => new ImageVolume({
        name: imageVolume.name,
        path: imageVolume.path,
        readOnly: imageVolume.readOnly,
      })),
      envVars: imageCreator.envVars.map(imageEnvVar => new ImageEnvVar({
        name: imageEnvVar.name,
        value: imageEnvVar.value,
      })),
    });

    const persistedImage = await this._imageService.save(image);

    return persistedImage;
  }

  @del('/images/{id}', {
    summary: 'Delete an image by a given identifier',
    responses: {
      '200': {
        description: 'Ok'
      }
    }
  })
  async delete(@param.path.string('id') id: number): Promise<boolean> {
    const image = await this._imageService.getById(id);
    this.throwNotFoundIfNull(image, 'Image with given id does not exist');

    return this._imageService.delete(image);
  }
}



