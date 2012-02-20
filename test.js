var Lexer = require('./lexer.js');
var lexer = new Lexer();
var fs = require('fs');
var e;

fs.readFile(process.argv[2], 'utf-8', function(err,data){
  if(err) {
    console.error("Could not open file: %s", err);
    process.exit(1);
  }

  try {
    console.dir(lexer.tokenize(data));    
  } catch(e) {
    console.error('Error:');
    console.error(e);
  }
});