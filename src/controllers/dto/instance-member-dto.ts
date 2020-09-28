import {property} from '@loopback/repository';
import {UserSimpleDto} from './user-simple-dto';
import {InstanceMemberRole} from '../../models/enumerations';

export class InstanceMemberDto {
  @property({
    itemType: UserSimpleDto,
  })
  user: UserSimpleDto;

  @property({
    itemType: InstanceMemberRole,
  })
  role: InstanceMemberRole;

}
