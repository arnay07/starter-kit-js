/*
This script generates mock data for local
development. This way you don't need to point
to an actual API, but you can enjoy realistic,
but randomized data, and rapid page loads due
to local, static data.
*/

/* eslint-disable no-console */

import jsf from 'json-schema-faker';
import {schema} from './mockDataSchema';
import fs from 'fs';
import chalk from 'chalk';

/*if this line is ignored there will be no data generated */
jsf.extend('faker', () => require('faker'));

const json = JSON.stringify(jsf(schema));

/* we will put data in db.json*/
fs.writeFile("./src/api/db.json", json, (err) => {
  if(err) {
    return console.log(chalk.red(err));
  }
  else {
    console.log(chalk.green("Mock data generatedd"));
  }
});
