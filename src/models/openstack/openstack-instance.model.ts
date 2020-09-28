

export class OpenStackInstance {

  private _id: string;
  private _name: string;
  private _address: string;
  private _imageId: string;
  private _flavourId: string;
  private _createdAt: Date;

  public get id() {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get imageId(): string {
    return this._imageId;
  }

  set imageId(value: string) {
    this._imageId = value;
  }

  get flavourId(): string {
    return this._flavourId;
  }

  set flavourId(value: string) {
    this._flavourId = value;
  }


  public get createdAt() {
    return this._createdAt;
  }

  public set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  constructor() {}
}
