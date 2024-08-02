'use strict';

import { exec } from 'child_process';

const migrationName = process.argv[2];

exec(
  `yarn run typeorm migration:create src/migrations/${migrationName} `,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return;
    }

    console.log(`Command output:\n${stdout}`);
  },
);
