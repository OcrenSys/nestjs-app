import * as PackageJSON from '../../package.json';

export default () => ({
  /*--------------------------------------------------------------------------
  | Application Meta Data
  |--------------------------------------------------------------------------
  |
  | This values are defined in the package.json file.
  |--------------------------------------------------------------------------*/

  name: PackageJSON.name,
  title: PackageJSON.title,
  description: PackageJSON.description,
  version: PackageJSON.version,

  /*--------------------------------------------------------------------------
  | Application Port
  |--------------------------------------------------------------------------
  |
  | This value define on witch port the application is available. Default is
  | the standard port 8080
  |--------------------------------------------------------------------------*/

  port: parseInt(process.env.PORT, 10) || 3000,
});
