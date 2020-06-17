// This file is not transpiled so we will use commonjs and es5

//Register  babel to transpile before our tests run
require('babel-register')();

//disable webpack features that mocha doesnt understand
require.extensions['.css'] = function() {};
