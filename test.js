var Lexer = require('./lexer.js');
var lexer = new Lexer();
var fs = require('fs');
var e;

fs.readFile(process.argv[2], 'utf-8', function readFile(err,data) {
  if(err) {
    console.error("Could not open file: %s", err);
    process.exit(1);
  }

  console.dir(lexer.tokenize(data));    
});