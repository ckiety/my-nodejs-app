const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/time') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ time: new Date().toISOString() }));
    return;
  }

  if (req.method === 'POST' && req.url === '/tasks/log-time') {
    console.log('Cron job ran at', new Date().toISOString());
    res.writeHead(200);
    res.end('ok');
    return;
  }

  if (req.method === 'POST' && req.url === '/tasks/cleanup') {
    console.log('Daily cleanup ran');
    res.writeHead(200);
    res.end('ok');
    return;
  }

  // Everything else gets the HTML page
  fs.readFile(path.join(__dirname, 'index.html'), (err, html) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading page');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
