const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

let browserPath = edgePath;
if (!fs.existsSync(edgePath)) {
  if (fs.existsSync(chromePath)) {
    browserPath = chromePath;
  } else {
    console.log('Neither Edge nor Chrome found in default locations. Trying "start msedge" or "start chrome"...');
    browserPath = 'msedge';
  }
}

console.log(`Using browser path: ${browserPath}`);

const outputFile = path.join(__dirname, 'projects_dump.html');
const cmd = `"${browserPath}" --headless --disable-gpu --dump-dom https://rasalassad.ae/projects`;

console.log(`Executing command: ${cmd}`);

exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    // If it fails, let's try with raw command
    return;
  }
  
  if (stdout) {
    fs.writeFileSync(outputFile, stdout);
    console.log(`Successfully dumped DOM to ${outputFile}. Total bytes: ${stdout.length}`);
  } else {
    console.log('No stdout returned.');
  }
  
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
});
