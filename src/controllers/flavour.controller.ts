import {BaseController} from './base.controller';
import {FlavourService} from '../services';
import {del, get, getModelSchemaRef, param, post, requestBody} from '@loopback/openapi-v3';
import {inject} from '@loopback/context';
import {Flavour} from '../models/domain';
import {OpenStackDatasource} from '../datasources';
import {OpenStackFlavourService} from '../services/openstack';
import {FlavourCreatorDto} from './dto';


export class FlavourController extends BaseController {

  private _openStackFlavourService: OpenStackFlavourService;

  constructor(@inject('services.FlavourService') private _flavourService: FlavourService,@inject('datasources.openStack') dataSource: OpenStackDatasource) {
    super();
    this._openStackFlavourService = new OpenStackFlavourService(dataSource);
  }

  @get('/flavours', {
    summary: 'Get a list of all flavours',
    responses: {
      '200': {
        description: 'OK',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Flavour)},
          },
        },
      },
    },
  })
  getAll(): Promise<Flavour[]> {
    return this._flavourService.getAll();
  }


  @get('/flavours/{id}', {
    summary: 'Get an flavour by a given identifier',
    responses: {
      '200': {
        description: 'Ok',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Flavour),
          },
        },
      },
    },
  })
  async getById(@param.path.string('id') id: number): Promise<Flavour> {
    const flavour = await this._flavourService.getById(id);
    this.throwNotFoundIfNull(flavour, 'Flavour with given id does not exist');

    return flavour;
  }


  @post('/flavours', {
    summary: 'Create a new flavour',
    responses: {
      '201': {
        description: 'Created',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Flavour),
          },
        },
      },
    },
  })
  async create(@requestBody() flavourCreator: FlavourCreatorDto): Promise<Flavour> {


    const flavour: Flavour = new Flavour({
      name: flavourCreator.name,
      description: flavourCreator.description,
      computeId: flavourCreator.computeId,
      ram: flavourCreator.ram,
      cpus: flavourCreator.cpus,
    });

    const persistedFlavour = await this._flavourService.save(flavour);

    return persistedFlavour;
  }


  @del('/flavours/{id}', {
    summary: 'Delete a flavour by a given identifier',
    responses: {
      '200': {
        description: 'Ok'
      }
    }
  })
  async delete(@param.path.string('id') id: number): Promise<boolean> {
    const flavour = await this._flavourService.getById(id);
    this.throwNotFoundIfNull(flavour, 'Flavour with given id does not exist');

    return this._flavourService.delete(flavour);
  }
}



