import {BaseController} from './base.controller';
import {del, get, getModelSchemaRef, param, post, requestBody} from '@loopback/openapi-v3';
import {Instance} from '../models/domain';
import {inject} from '@loopback/context';
import {OpenStackDatasource} from '../datasources';
import {InstanceService} from '../services';
import {InstanceCreatorDto} from './dto';


export class InstanceController extends BaseController {

  constructor(@inject('services.InstanceService') private _instanceService: InstanceService, @inject('datasources.openStack') dataSource: OpenStackDatasource) {
    super();
  }

  @get('/instances', {
    summary: 'Get a list of all instances',
    responses: {
      '200': {
        description: 'OK',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Instance)},
          },
        },
      },
    },
  })
  getAll(): Promise<Instance[]> {
    return this._instanceService.getAll();
  }

  @get('/instances/{id}', {
    summary: 'Get an instance by a given identifier',
    responses: {
      '200': {
        description: 'OK',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Instance),
          },
        },
      },
    },
  })
  async getById(@param.path.string('id') id: number): Promise<Instance> {
    const instance = await this._instanceService.getById(id);
    this.throwNotFoundIfNull(instance, 'Instance with given id does not exist');
    return instance;
  }

  @post('/instances', {
    summary: 'Create a new instance',
    responses: {
      '201': {
        description: 'Created',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Instance),
          },
        },
      },
    },
  })
  async create(@requestBody() instanceCreator: InstanceCreatorDto): Promise<Instance> {


    const instance: Instance = new Instance({
      name: instanceCreator.name,
      description: instanceCreator.description,
    });

    const persistedInstance = await this._instanceService.save(instance);

    return persistedInstance;
  }

  @del('/instances/{id}', {
    summary: 'Delete an instance by a given identifier',
    responses: {
      '200': {
        description: 'Ok',
      },
    },
  })
  async delete(@param.path.string('id') id: number): Promise<boolean> {
    const instance = await this._instanceService.getById(id);
    this.throwNotFoundIfNull(instance, 'Instance with given id does not exist');

    return this._instanceService.delete(instance);
  }
}
