import {OpenStackDatasource} from '../../datasources';
import {inject} from '@loopback/context';
import {OpenStackFlavour} from '../../models/openstack';
import {bind, BindingScope} from '@loopback/core';

@bind({ scope: BindingScope.SINGLETON })
export class OpenStackFlavourService{

  constructor(@inject('datasources.openStack') private _dataSource: OpenStackDatasource) {
  }

  async getAll(): Promise<OpenStackFlavour[]> {
    return await this._dataSource.getFlavourList();
  }

  async getById(id:number): Promise<OpenStackFlavour> {
    return await this._dataSource.getFlavour(id)

  }
}
