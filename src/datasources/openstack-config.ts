import { APPLICATION_CONFIG } from '../application-config';


export class OpenStackConfig {

  private applicationId: String;
  private applicationSecret: String;

  private computeEndpoint: String;
  private imageEndpoint: String;
  private identityEndpoint: String;

  private addressProvider: String;

  private securityGroup: String;
  private addressProviderUUID: String;


  config: any;

  constructor() {
    this.setApplicationId(APPLICATION_CONFIG().openstack.applicationId);
    this.setApplicationSecret(APPLICATION_CONFIG().openstack.applicationSecret);
    this.setComputeEndpoint(APPLICATION_CONFIG().openstack.computeEndpoint);
    this.setImageEndpoint(APPLICATION_CONFIG().openstack.imageEndpoint);
    this.setAddressProvider(APPLICATION_CONFIG().openstack.addressProvider);
    this.setAddressProviderUUID(APPLICATION_CONFIG().openstack.addressProviderUUID);
    this.setIdentityEndpoint(APPLICATION_CONFIG().openstack.identityEndpoint);
    this.setAddressProvider(APPLICATION_CONFIG().openstack.securityGroup);
  }

  private setAddressProviderUUID(addressProviderUUID: String): void {
    this.addressProviderUUID = addressProviderUUID;
  }

  public getAddressProviderUUID(): String {
    return this.addressProviderUUID;
  }

  public getApplicationId(): String {
    return this.applicationId;
  }

  public setApplicationId(applicationId: String): void {
    this.applicationId = applicationId;
  }

  public getApplicationSecret(): String {
    return this.applicationSecret;
  }

  public setApplicationSecret(applicationSecret: String): void {
    this.applicationSecret = applicationSecret;
  }

  public getComputeEndpoint(): String {
    return this.computeEndpoint;
  }

  public setComputeEndpoint(computeEndpoint: String): void {
    this.computeEndpoint = computeEndpoint;
  }

  public getImageEndpoint(): String {
    return this.imageEndpoint;
  }

  public setImageEndpoint(imageEndpoint: String): void {
    this.imageEndpoint = imageEndpoint;
  }

  public getIdentityEndpoint(): String {
    return this.identityEndpoint;
  }

  public setIdentityEndpoint(identityEndpoint: String): void {
    this.identityEndpoint = identityEndpoint;
  }


  public getAddressProvider(): String {
    return this.addressProvider;
  }

  public setAddressProvider(addressProvider: String): void {
    this.addressProvider = addressProvider;
  }

  public getSecurityGroup(): String {
    return this.securityGroup;
  }

  public setSecurityGroup(securityGroup: String): void {
    this.securityGroup = securityGroup;
  }

}
