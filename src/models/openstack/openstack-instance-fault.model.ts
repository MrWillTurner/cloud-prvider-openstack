export class OpenStackInstanceFault {
  private _message: string;
  private _code: number;
  private _details: string;
  private _created: string;

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get code(): number {
    return this._code;
  }

  set code(value: number) {
    this._code = value;
  }

  get details(): string {
    return this._details;
  }

  set details(value: string) {
    this._details = value;
  }

  get created(): string {
    return this._created;
  }

  set created(value: string) {
    this._created = value;
  }
}
