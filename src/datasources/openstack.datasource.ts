import {lifeCycleObserver, LifeCycleObserver, ValueOrPromise} from '@loopback/core';
import {OpenStackConfig} from './openstack-config';
import {logger} from '../utils';
import axios from 'axios';
import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { OpenStackFlavour, OpenStackImage} from '../models';
import {OpenStackRequestConverter,OpenStackImageConverter,OpenStackFlavourConverter} from '../services/openstack/converters';
import {OpenStackInstance} from '../models/openstack/openstack-instance.model';
import {OpenStackServerConverter} from '../services/openstack/converters/openstack-server.converter';

@lifeCycleObserver('datasource')
export class OpenStackDatasource implements LifeCycleObserver {
  private static dataSourceName = 'openStack';
  private static HEADER_X_SUBJECT_TOKEN: string = 'x-subject-token';
  private static HEADER_X_AUTH_TOKEN: string = 'X-Auth-Token';

  private _apiClient: AxiosInstance;
  private _config: OpenStackConfig;

  constructor() {
    try {
      this._config = new OpenStackConfig();
    } catch (error) {
      logger.error(`Failed to create OpenStack Client: ${error.message}`);
      this._config = null;
    }
  }

  /**
   * Start the datasource when application is started
   */
  start(): ValueOrPromise<void> {
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
  }

  isConnected(): boolean {
    return this._config != null;
  }

  protected get apiClient(): AxiosInstance {
    if (this._apiClient == null) {
      this._apiClient = Axios.create({
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Use interceptor to add access_token
      this._apiClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
        try {
          const authToken = await this.authenticate();
          let token = {};
          token[OpenStackDatasource.HEADER_X_AUTH_TOKEN] = authToken;
          config.headers = token;
          return config;

        } catch (error) {
          console.error('Failed to add access token to request headers');
          throw error;
        }
      });

      this._apiClient.interceptors.response.use((response) => response, (error) => {
        if (error.response.data && error.response.data.error) {
          console.error(error.response.data.error.message);
        }
        return Promise.reject(error);
      });
    }
    return this._apiClient;
  }


  private async authenticate(): Promise<String> {
    try {
      let data: any = OpenStackRequestConverter.createAuthenticationRequest(this._config);
      let identityEndpoint: String = this._config.getIdentityEndpoint();
      let url: string = `${identityEndpoint}/v3/auth/tokens`;
      let response = await axios.post(url, data);
      if (response.status == 201) {
        return response.headers[OpenStackDatasource.HEADER_X_SUBJECT_TOKEN];
      }
    } catch (error) {
      throw new Error(`Error authenticating to openstack: ${error}`);
    }

  }


  public async getImageList(): Promise<OpenStackImage[]> {
    try {
      const imageEndpoint: String = this._config.getImageEndpoint();
      let url: string = `${imageEndpoint}/v2/images`;
      let response = await this.apiClient.get(url);
      if (response.status != 200) {
        return null;
      }
      const results = response.data;
      const images: OpenStackImage[] = [];

      for (let resultImage of results['images']) {
        const image: OpenStackImage = OpenStackImageConverter.fromJson(resultImage);
        images.push(image);
      }
      return images;
    } catch (error) {
      console.log(error);
    }

  }

  public async getImage(id: number): Promise<OpenStackImage> {
    const imageEndpoint: String = this._config.getImageEndpoint();
    let url: string = `${imageEndpoint}/v2/images/${id}`;
    let response = await this.apiClient.get(url);
    if (response.status != 200) {
      return null;
    }
    const resultImage = response.data;
    return OpenStackImageConverter.fromJson(resultImage);
  }

  public async getFlavourList(): Promise<OpenStackFlavour[]> {
    try {
      const computeEndpoint: String = this._config.getComputeEndpoint();
      let url: string = `${computeEndpoint}/v2/flavors/detail`;
      let response = await this.apiClient.get(url);
      if (response.status != 200) {
        return null;
      }
      const results = response.data;
      const flavours = [];

      for (let resultFlavour of results['flavors']) {
        const flavour: OpenStackFlavour = OpenStackFlavourConverter.fromJson(resultFlavour);
        flavours.push(flavour);
      }
      return flavours;

    } catch (error) {
      console.log(error);

    }
  };

  public async getFlavour(id: number): Promise<OpenStackFlavour> {
    const computeEndpoint: String = this._config.getComputeEndpoint();
    let url: string = `${computeEndpoint}/v2/flavors/${id}`;
    let response = await this.apiClient.get(url);
    if (response.status != 200) {
      return null;
    }
    const resultFlavour = response.data.flavor;
    return OpenStackFlavourConverter.fromJson(resultFlavour);
  }

  public async instances(): Promise<OpenStackInstance[]> {
    try {
      const computeEndpoint: String = this._config.getComputeEndpoint();
      let url: string = `${computeEndpoint}/v2/servers/detail`;
      let response = await this.apiClient.get(url);
      if (response.status != 200) {
        return null;
      }
      const results = response.data;
      const servers = [];

      for (let resultServer of results['servers']) {
        const server: OpenStackInstance = OpenStackServerConverter.fromJson(resultServer);
        servers.push(server);
      }
      return servers;

    } catch (error) {
      console.log(error);

    }
  };

  public async instance(id: number): Promise<OpenStackInstance> {
    const computeEndpoint: String = this._config.getComputeEndpoint();
    let url: string = `${computeEndpoint}/v2/servers/${id}`;
    let response = await this.apiClient.get(url);
    if (response.status != 200) {
      return null;
    }
    const resultServer = response.data.flavor;
    return OpenStackServerConverter.fromJson(resultServer);
  }


}
