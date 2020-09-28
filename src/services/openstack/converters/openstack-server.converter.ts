import {OpenStackInstance} from '../../../models/openstack/openstack-instance.model';

export class OpenStackServerConverter {

  public static fromJson( jsonObject:any ) : OpenStackInstance {
    const flavour:OpenStackInstance = new OpenStackInstance();
    flavour.id = jsonObject.id;
    flavour.name = jsonObject.name;
    flavour.createdAt = new Date(jsonObject.created);
    flavour.imageId = jsonObject.image.id
    flavour.flavourId = jsonObject.flavour.id;
    flavour.address = jsonObject.adress;
    return flavour;
  }
}
