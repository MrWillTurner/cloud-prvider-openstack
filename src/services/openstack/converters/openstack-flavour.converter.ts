import {OpenStackFlavour} from '../../../models/openstack';

export class OpenStackFlavourConverter {

  public static fromJson( jsonObject:any ) : OpenStackFlavour {
    const flavour:OpenStackFlavour = new OpenStackFlavour();
    flavour.id = jsonObject.id;
    flavour.name = jsonObject.name;
    flavour.disk = jsonObject.disk;
    flavour.cpus = jsonObject.cpus;
    flavour.ram = jsonObject.ram;
    return flavour;
  }
}
