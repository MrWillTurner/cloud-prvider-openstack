import {BaseController} from '../base.controller';
import {OpenStackImageService} from '../../services/openstack';
import {inject} from '@loopback/context';
import {ImageService} from '../../services';
import {OpenStackDatasource} from '../../datasources';
import {get, getModelSchemaRef} from '@loopback/openapi-v3';
import {Image} from '../../models/domain';
import {OpenStackImage} from '../../models/openstack';

export class OpenStackImageController extends BaseController {

  constructor(@inject('services.OpenStackFlavourService') private _openStackImageService: OpenStackImageService,@inject('datasources.openStack') dataSource: OpenStackDatasource) {
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
  getAll(): Promise<OpenStackImage[]> {
    return this._openStackImageService.getAll();
  }

}
