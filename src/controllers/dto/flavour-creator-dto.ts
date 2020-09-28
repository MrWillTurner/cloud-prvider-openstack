import { model, property } from '@loopback/repository';

@model()
export class FlavourCreatorDto {
  @property({
    type: 'string',
    required: true
  })
  name: string;

  @property({
    type: 'string'
  })
  description?: string;

  @property({
    type: 'string',
    required: true
  })
  computeId: string;

  @property({
    type: 'number',
    required: true
  })
  cpus: number;

  @property({
    type: 'number',
    required: true
  })
  disk: number;

  @property({
    type: 'number',
    required: true
  })
  ram: number;



  constructor(data?: Partial<FlavourCreatorDto>) {
    Object.assign(this, data);
  }
}
