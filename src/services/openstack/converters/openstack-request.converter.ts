import {OpenStackConfig} from '../../../datasources/openstack-config';

export class OpenStackRequestConverter {


  static createAuthenticationRequest(config: OpenStackConfig): any {
    return {
      auth: {
        identity: {
          methods: [
            'application_credential',
          ],
          'application_credential': {
            id: config.getApplicationId(),
            secret: config.getApplicationSecret(),
          },
        },
      },
    };
  };

  static rebootInstanceRequest(): any {
    return {
      reboot: {
        type: 'HARD',
      },
    };
  }

  static startInstanceRequest(): any {
    return {
      'os-start': null,
    };
  }

  static shutdownInstanceRequest(): any {
    return {
      'os-stop': null,
    };
  }

  static createInstanceRequest(name: string, imageRef: string, flavourRef: string,
                               securityGroups: Array<Map<string, string>>,
                               networks: Array<Map<string, string>>,
                               metadataNodes: Array<Map<string, string>>,
                               userData: string): any {
    return {
      'server': {
        'name': name,
        'imageRef': imageRef,
        'flavorRef': flavourRef,
        'security_groups': securityGroups,
        'networks':networks,
        'metadata': metadataNodes,
        'user_data': userData,
      },
    };
  }

  // TODO: Add security Group request

}
