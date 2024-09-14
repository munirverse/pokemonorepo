import { spawn } from 'child_process';

/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;

module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  const server = spawn('npx', ['nx', 'run', 'pokemon-be:serve'], {
    shell: true,
    stdio: 'inherit',
  });

  globalThis.__SERVER_PROCESS__ = server;

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';

  await new Promise((resolve) => setTimeout(resolve, 5000));
};
