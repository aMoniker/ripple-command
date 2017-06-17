'use strict';

var _ = require('lodash');

class Console {
    constructor() {
        this.spacer = '  ';
        this.spacers = 2;
    }

    out(/* anything */) {
        let args = Array.prototype.slice.call(arguments);

        // default number of times to print the spacer before each line
        var spacers = this.spacers;

        // pass an integer as the last argument to add spacers to the default
        if (args.length > 1 && _.isInteger(args[args.length - 1])) {
            spacers += args.pop();
        }

        // output based on arg type
        for (let arg of args) {
            if (_.isString(arg)) {
                this.out_string(arg, spacers);
            } else if (_.isArray(arg)) {
                _.each(arg, (a) => {
                    this.out_string(a, spacers);
                });
            } else if (_.isPlainObject(arg)) {
                _.each(arg, (k, v) => {
                    this.out_string(`${k}: ${v}`, spacers);
                })
            } else if (_.isFunction(arg)) {
                this.out(arg());
            } else {
                console.log(arg);
            }
        }
    }

    out_string(string, spacers = null) {
        spacers = spacers || this.spacers;
        console.log(this.spacer.repeat(spacers) + string);
    }
}

module.exports = {
    Console: new Console,
};
