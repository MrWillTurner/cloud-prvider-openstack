import { bind, BindingScope } from '@loopback/core';
import { Instance} from '../models';
import { repository } from '@loopback/repository';
import { BaseService } from './base.service';
import {InstanceRepository} from '../repositories';

@bind({ scope: BindingScope.SINGLETON })
export class InstanceService extends BaseService<Instance, InstanceRepository> {

  constructor(@repository(InstanceRepository) repo: InstanceRepository) {
    super(repo);
  }


}
