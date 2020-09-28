import {model, property} from '@loopback/repository';
import {EmployerDto} from './employer-dto';

@model()
export class UserSimpleDto {

  @property({ type: 'string', required: true })
  fullName: string;

  @property({ type: 'string' })
  firstName: string;

  @property({ type: 'number' })
  lastName: number;

  @property({ itemType: EmployerDto })
  affiliation: EmployerDto;

  @property({ type:'array'})
  roles: string[];

  constructor(data?: Partial<UserSimpleDto>) {
    Object.assign(this, data);
  }
}
