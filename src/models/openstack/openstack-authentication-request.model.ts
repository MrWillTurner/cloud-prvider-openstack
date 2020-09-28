
export interface  OpenStackAuthenticationRequestConfig{
  applicationId: string,
  applicationSecret: string,
}

export class OpenStackAuthenticationRequest {
  private _model: any;


  constructor(_config: OpenStackAuthenticationRequestConfig) {
    this._model = {
      auth: {
        identity: {
          methods:[
            'application_credential'
          ],
          'application_credential': {
            id: _config.applicationId,
            secret: _config.applicationSecret
          }
        }
      }
    };
  }

  get model(): any {
    return this._model;
  }

}
