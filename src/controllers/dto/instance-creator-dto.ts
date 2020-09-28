import { model, property } from '@loopback/repository';
import {InstanceMemberDto} from './instance-member-dto';

@model()
export class InstanceCreatorDto {

  @property({ type: 'string', required: true })
  name: string;

  @property({ type: 'string' })
  description?: string;

  @property({ type: 'number' })
  flavourId: number;

  @property({ type: 'number' })
  imageId: number;

  @property({ type: 'array',itemType:InstanceMemberDto })
  members: InstanceMemberDto[];

  constructor(data?: Partial<InstanceCreatorDto>) {
    Object.assign(this, data);
  }
}
