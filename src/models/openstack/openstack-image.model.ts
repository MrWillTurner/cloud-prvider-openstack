

export class OpenStackImage {

  private _id: string;
  private _name: string;
  private _size: number;
  private _createdAt: string;

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

  public get size() {
    return this._size;
  }

  public set size(size: number) {
    this._size = size;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public set createdAt(createdAt: string) {
    this._createdAt = createdAt;
  }

  constructor() {}
}
