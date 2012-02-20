function Lexer() {
  var self = this;
  var pos = 0; // Position
  var chunk;
  var patterns = {
    'identifier': /([a-z]+)*/,
    'whitespace': /^[^\n\S]+/,
    'number': /^([0-9]+)/,
    'indent': /^(?:\n[^\n\S]*)+/
  }

  var keywords = ['if', 'def', 'print'];
  var tokens = [];

  function identifier() {
    var name;
    var value;
    var token = patterns.identifier.exec(chunk);
    if(token[1]) {
      value = token[0];
      if(keywords.indexOf(value) !== -1) {
        tokens.push([value.toUpperCase(), value]);
      } else {
        tokens.push(['IDENTIFIER', value]);
      }

      return value.length;
    }
  }

  function whitespace() {
    var token = patterns.whitespace.exec(chunk);
    if(token) {
      return token.length;
    }
  }

  function string() {
    var isQuote = function(c) {
      return c === '"' || c === "'";
    }

    var firstChar = chunk.charAt(0);
    var nextChar;
    // If the first char is a quote
    if(isQuote(firstChar)) {
      // Now, let's read all the chars until we find the one we started with
      for(var i = 1; i < chunk.length; i++) {
        // Check and see if our char was scaped
        var isScaped = chunk.charAt(i-1) === "\\";
        // If we find the same char we started with, close the string unless
        // it was scaped using \
        if(!isScaped && chunk.charAt(i) === firstChar) {
          tokens.push(['STRING', chunk.substr(0, i+1)]);
          return i + 1;
        }
      }
    }
  }

  function number() {
    var token = patterns.number.exec(chunk);
    var n;
    if(token) {
      n = parseInt(token[0]);
      // If n is a number:
      if(!n.isNaN) {
        tokens.push(['NUMBER', n]);
        return token[0].length;
      }
    }
  }

  function newline() {
    var token = patterns.indent.exec(chunk);
    if(token) {
      if(token[0] === '\n') {
        tokens.push(['NEWLINE', token[0]]);
      } else {
        console.dir(tokens);
      } 
      return token[0].length;
    }
  }

  function tokenize(code) {
    var diff;
    while(chunk = code.slice(pos)) {
      diff = identifier() || string() || number() || whitespace() || newline();
      if(!diff) {
        console.dir(tokens);
        throw('Tokenizer failed. Cannot tokenize: ' + chunk);
      }
      pos += diff;
    }
    return tokens;
  }

  return {
    'tokenize': tokenize
  };
}

module.exports = Lexer;