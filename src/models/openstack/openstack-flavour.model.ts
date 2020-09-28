export class OpenStackFlavour {

  private _id: string;
  private _name: string;
  private _cpus: number;
  private _disk: number;
  private _ram: number;

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get cpus(): number {
    return this._cpus;
  }

  public set cpus(cpus: number) {
    this._cpus = cpus;
  }

  public get disk(): number {
    return this._disk;
  }

  public set disk(disk: number) {
    this._disk = disk;
  }

  public get ram(): number {
    return this._ram;
  }

  public set ram(ram: number) {
    this._ram = ram;
  }

  constructor() {
  }
}
