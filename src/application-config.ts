export class ApplicationConfig {
  database: {
    type: string,
    host: string,
    port: string,
    userName: string,
    password: string,
    name: string,
    schema: string,
    synchronize: boolean,
    logging: boolean
  };
  openstack: {
    applicationId: string,
    applicationSecret: string,
    computeEndpoint: string,
    imageEndpoint: string,
    addressProvider: string,
    addressProviderUUID: string,
    identityEndpoint: string,
    securityGroup: string,

  };
  logging: {
    level: string
  };

  scheduler: {
    enabled: boolean,
    config: string
  };

  constructor(data?: Partial<ApplicationConfig>) {
    Object.assign(this, data);
  }
}

let applicationConfig: ApplicationConfig;

export function APPLICATION_CONFIG(): ApplicationConfig {
  if (applicationConfig == null) {
    applicationConfig = {
      database: {
        type: process.env.CLOUD_PROVIDER_K8S_DATABASE_TYPE,
        host: process.env.CLOUD_PROVIDER_K8S_DATABASE_HOST,
        port: process.env.CLOUD_PROVIDER_K8S_DATABASE_PORT,
        userName: process.env.CLOUD_PROVIDER_K8S_DATABASE_USERNAME,
        password: process.env.CLOUD_PROVIDER_K8S_DATABASE_PASSWORD,
        name: process.env.CLOUD_PROVIDER_K8S_DATABASE_NAME,
        schema: process.env.CLOUD_PROVIDER_K8S_DATABASE_SCHEMA,
        synchronize: process.env.CLOUD_PROVIDER_K8S_DATABASE_SYNCHRONIZE === 'true',
        logging: process.env.CLOUD_PROVIDER_K8S_DATABASE_LOGGING === 'true'
      },
      openstack: {
        applicationId: process.env.CLOUD_PROVIDER_OPENSTACK_APPLICATION_ID,
        applicationSecret: process.env.CLOUD_PROVIDER_OPENSTACK_APPLICATION_SECRET,
        computeEndpoint: process.env.CLOUD_PROVIDER_OPENSTACK_COMPUTE_ENDPOINT,
        imageEndpoint: process.env.CLOUD_PROVIDER_OPENSTACK_IMAGE_ENDPOINT,
        addressProvider: process.env.CLOUD_PROVIDER_OPENSTACK_ADDRESS_PROVIDER,
        addressProviderUUID: process.env.CLOUD_PROVIDER_OPENSTACK_ADDRESS_PROVIDER_UUID,
        identityEndpoint: process.env.CLOUD_PROVIDER_OPENSTACK_IDENTITY_ENDPOINT,
        securityGroup: process.env.CLOUD_PROVIDER_OPENSTACK_SECURITY_GROUP

      },
      logging: {
        level: process.env.CLOUD_PROVIDER_K8S_LOG_LEVEL
      },
      scheduler: {
        enabled: process.env.CLOUD_PROVIDER_K8S_SCHEDULER_ENABLED != null ? (process.env.CLOUD_PROVIDER_K8S_SCHEDULER_ENABLED === 'true') : true,
        config: process.env.CLOUD_PROVIDER_K8S_SCHEDULER_CONFIG
      }
    };
  }

  return applicationConfig;
}
