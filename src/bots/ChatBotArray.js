const EchoBot = require('./EchoBot');
const IgnoreBot = require('./IgnoreBot');
const ReverseBot = require('./ReverseBot');
const SpamBot = require('./SpamBot');

let bots = [EchoBot, ReverseBot, SpamBot, IgnoreBot];

module.exports = bots;
