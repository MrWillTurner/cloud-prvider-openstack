import {OpenStackDatasource} from '../../datasources';
import {inject} from '@loopback/context';
import {OpenStackImage} from '../../models/openstack';
import {bind, BindingScope} from '@loopback/core';

@bind({ scope: BindingScope.SINGLETON })
export class OpenStackImageService{

  constructor(@inject('datasources.openStack') private _dataSource: OpenStackDatasource) {
  }

  async getAll(): Promise<OpenStackImage[]> {
    return await this._dataSource.getImageList();
  }

  async getById(id:number): Promise<OpenStackImage> {
    return await this._dataSource.getImage(id)

  }
}
