"use strict"; //ES6 compliant mode
const http = require('http');
const url = require('url');
const fs = require('fs');

class Server {
  constructor(file1, file2, port) {
    this.rs1 = fs.createReadStream(file1, {encoding:'utf8'});
    this.rs2 = fs.createReadStream(file2, {encoding:'utf8'});
    this.port = port;
  }
  ServerInstance() {
    const _serverInstance = http.createServer( (req, res) => {
      this.obj_url = url.parse(req.url, true, true)
      res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
      if(this.obj_url.pathname == '/down1') {
        this.rs1.pipe(res);
      }
      else if(this.obj_url.pathname == '/down2') {
        this.rs2.pipe(res);
      }
      else {
        res.end("path not recognized - 404 \nPath = " + this.obj_url.pathname);
      }
    });
    _serverInstance.listen(this.port);
    console.log(`server is listening on ${this.port}`);
  }
}

class FileServerInstance {
  constructor(string1, string2, int) {
    this.file1 = string1;
    this.file2 = string2;
    this.port = int;
  }
  initServer() {
    this.server = new Server(this.file1, this.file2 , this.port);
    this.server.ServerInstance();
  }
}

var file_server = new FileServerInstance("C:\\Users\\prestigio\\Downloads\\Messages(48515).txt", "C:\\Users\\prestigio\\Downloads\\Messages2(20408).txt", 8008);
file_server.initServer();
