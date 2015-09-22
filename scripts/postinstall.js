#!/usr/bin/env node

if (__dirname !== process.cwd()) {
  oldPath = process.cwd()
  process.chdir(__dirname);
}

var fs = require('fs');
var path = require('path');

var localFile   = path.normalize( __dirname + '/../dist/config/bot.js');
var projectPath = path.normalize(oldPath + '/config');
var projectFile = path.normalize(projectPath + '/bot.js');
console.log(localFile);
console.log(projectPath);
console.log(projectFile);

if(!fs.existsSync(projectFile)){
  console.log("coppying " + localFile + " to " + projectFile);
  try{
    fs.mkdirSync(projectPath);
  }catch(e){ }
  fs.createReadStream(localFile).pipe(fs.createWriteStream(projectFile));
}