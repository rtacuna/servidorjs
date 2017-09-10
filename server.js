const http = require('http');
const PORT = 3000;

let visits = [];

const server = http.createServer((req, res) => {
  if (visits.length > 10){
    var x = visits.sort((a , b) => a.date - b.date).shift();
  }

  visits.push({
    display: `IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress }, Time: ${new Date()}`,
    date: Date.now()
  });

  res.end(visits.sort((a , b) => b.date - a.date).map(obj => obj.display).join('\n'));
})

server.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }

  console.log(`Listening on port ${PORT}`)
});
