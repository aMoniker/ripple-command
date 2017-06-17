'use strict'

require('dotenv').config(); // load .env vars into process.env

var program = require('commander');
var {Console} = require('./src/console.js');
var {Commands} = require('./src/api/commands.js');
var p = require('./package.json');

console.log(''); // extra line for readability

program
    .version(p.version)
    ;

program
    .command('list')
    .alias('l')
    .description('list all possible commands')
    .action(function(cmd, options) {
        Console.out('Commands:');
        Console.out(Commands.all, 1);
    })
    ;

program.parse(process.argv);

if (!program.args.length) { program.help(); }
