"use strict"; //ES6 compliant mode
const http = require('http');
const fs = require('fs');

class Getter {
  constructor(port, path, dest) {
    this.port = port;
    this.path = path;
    this.dest = dest;
  }
  getStatus() {
    http.get("http://127.0.0.1:"+this.port+this.path, function(res) {
        console.log("Got response: " + res.statusCode);
    });
  }
  getToFile() {
    var file = fs.createWriteStream(this.dest);
    var request = http.get("http://127.0.0.1:"+this.port+this.path, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(console.log('done' + this.path));  // close() is async, call cb after close completes.
      });
    }).on('error', function(err) { // Handle errors
      fs.unlink(this.dest); // Delete the file async. (But we don't check the result)
    });
  }
}

var getter1 = new Getter(8008, '/down1', 'D:\\prestigio\\Загрузки\\node_response\\response1.txt');
var getter2 = new Getter(8008, '/down2', 'D:\\prestigio\\Загрузки\\node_response\\response2.txt');
getter1.getStatus();
getter2.getStatus();
getter1.getToFile();
getter2.getToFile();


/**
console.log("init")
const req = http.request({
    hostname: '127.0.0.1',
    port: this.port,
    path: this.path
  }, (res) => {
    res.setEncoding('utf8');
    res.on('end', (res) => {
      console.log(res);
    });
  })
**/
