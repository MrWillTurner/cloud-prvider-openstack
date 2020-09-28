import {Image} from '../models/domain';
import {BaseRepository} from './base.repository';
import {inject} from '@loopback/context';
import {TypeORMDataSource} from '../datasources';

export class ImageRepository extends BaseRepository<Image, number> {
  constructor(@inject('datasources.typeorm') dataSource: TypeORMDataSource) {
    super(dataSource, Image);
  }

  find(): Promise<Image[]> {
    return super.find({ order: { id: 'ASC' } });
  }

}
