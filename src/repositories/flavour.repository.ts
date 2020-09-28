import {Flavour} from '../models/domain';
import {BaseRepository} from './base.repository';
import {inject} from '@loopback/context';
import {TypeORMDataSource} from '../datasources';

export class FlavourRepository extends BaseRepository<Flavour, number> {
  constructor(@inject('datasources.typeorm') dataSource: TypeORMDataSource) {
    super(dataSource, Flavour);
  }

  find(): Promise<Flavour[]> {
    return super.find({ order: { id: 'ASC' } });
  }

}
