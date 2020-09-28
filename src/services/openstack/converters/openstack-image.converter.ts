import {OpenStackImage} from '../../../models/openstack';

export class OpenStackImageConverter {

  public static fromJson( jsonObject:any ){
    const image:OpenStackImage = new OpenStackImage();
    image.id = jsonObject.id;
    image.name = jsonObject.name;
    image.size = jsonObject.size;
    image.createdAt = jsonObject.created_at;
    return image;
  }
}
