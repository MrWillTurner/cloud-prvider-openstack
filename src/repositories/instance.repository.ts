import {Image, Instance} from '../models/domain';
import {BaseRepository} from './base.repository';
import {inject} from '@loopback/context';
import {TypeORMDataSource} from '../datasources';

export class InstanceRepository extends BaseRepository<Instance, number> {
  constructor(@inject('datasources.typeorm') dataSource: TypeORMDataSource) {
    super(dataSource, Instance);
  }

  find(): Promise<Instance[]> {
    return super.find({ order: { id: 'ASC' } });
  }

}
