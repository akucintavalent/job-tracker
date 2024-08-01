'use strict';

import { exec } from 'child_process';

exec(`yarn run typeorm migration:revert -- -d src/data-source.ts`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Error output: ${stderr}`);
    return;
  }

  console.log(`Command output:\n${stdout}`);
});
