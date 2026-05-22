const https = require('https');

const options = {
  hostname: 'rasalassad.ae',
  port: 443,
  path: '/projects',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(`Status Code: ${res.statusCode}`);
    if (res.statusCode === 200) {
      // Print first 2000 chars of HTML
      console.log(data.substring(0, 10000));
      // Save to scratch/projects.html
      const fs = require('fs');
      fs.writeFileSync('scratch_projects.html', data);
      console.log('Saved to scratch_projects.html');
    }
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
