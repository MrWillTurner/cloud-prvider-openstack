import {model, property} from '@loopback/repository';

@model()
export class EmployerDto {
  @property({
    type: 'string',
    required: true
  })
  name: string;

  @property({
    type: 'string',
    required: true
  })
  town: string;

  @property({
    type: 'string',
    required: true
  })
  countryCode: string;

  constructor(data?: Partial<EmployerDto>) {
    Object.assign(this, data);
  }
}
