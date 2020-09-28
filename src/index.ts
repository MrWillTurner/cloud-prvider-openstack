import * as dotenv from 'dotenv';
import {CloudProviderOpenstackApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
dotenv.config();

import {OpenStackDatasource} from './datasources/openstack.datasource';


export {CloudProviderOpenstackApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new CloudProviderOpenstackApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;

  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
