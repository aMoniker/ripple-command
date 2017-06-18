'use strict';

var _ = require('lodash');

var CommandTypes = {
    PAYMENT: 'payment',
    ORDER: 'order',
    TRUSTLINE: 'trustline',
    SETTINGS: 'settings',
    ESCROW: 'escrow',
    CANCEL: 'cancel',
    ADDRESS: 'address',
};

var commands = {
    payment: {
        types: CommandTypes.PAYMENT,
        title: 'Send a new payment',
        ripple_api: 'preparePayment',
    },
    trustline: {
        type: CommandTypes.TRUSTLINE,
        title: 'Create or modify a trustline',
        ripple_api: 'prepareTrustline',
    },
    order: {
        type: CommandTypes.ORDER,
        title: 'Create a new order',
        ripple_api: 'prepareOrder',
    },
    orderCancel: {
        type: [CommandTypes.ORDER, CommandTypes.CANCEL],
        title: 'Cancel an existing order',
        ripple_api: 'prepareOrderCancellation',
    },
    settings: {
        type: CommandTypes.SETTINGS,
        title: 'Modify the settings of an account',
        ripple_api: 'prepareSettings',
    },
    escrow: {
        type: CommandTypes.ESCROW,
        title: 'Create a new escrow',
        ripple_api: 'prepareEscrowCreation',
    },
    escrowCancel: {
        type: [CommandTypes.ESCROW, CommandTypes.CANCEL],
        title: 'Cancel an existing and expired escrow',
        ripple_api: 'prepareEscrowCancellation',
    },
    escrowExecute: {
        type: CommandTypes.ESCROW,
        title: 'Execute an existing escrow',
        ripple_api: 'prepareEscrowExecution',
    },
    address: {
        type: CommandTypes.ADDRESS,
        title: 'Generate a new wallet address & secret',
        ripple_api: 'generateAddress',
    }
}

class Commands {
    constructor() {
        this.commands = commands;
    }

    get all() {
        return Object.keys(this.commands);
    }

    get types() {
        return Object.values(CommandTypes);
    }

    type(type) {
        return Object.keys(this.commands).filter(function(key) {
            return this.hasType(this.commands[key], type);
        });
    }

    hasType(command, type) {
        let types = _.isArray(command.type) ? command.type : [command.type];
        return (types.indexOf(type) !== -1);
    }
}

module.exports = {
    Commands: new Commands,
};
