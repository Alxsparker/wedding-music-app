const { spawn } = require('child_process');

const command = spawn('react-scripts', ['start'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_OPTIONS: '--openssl-legacy-provider',
  },
});

command.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
