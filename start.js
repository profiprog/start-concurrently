#!/usr/bin/env node
'use strict';

const concurrently = require('concurrently');
const path = require('path');

const scripts = require(path.join(process.env.PWD, 'package.json')).scripts;
const colors = [ 'green', 'yellow', 'blue', 'magenta', 'cyan', 'red', 'white', 'gray' ];
const escapeRegExp = s => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
const scriptPrefix = process.env.npm_lifecycle_event;
const namePattern = new RegExp(`^${escapeRegExp(scriptPrefix)}-(.*)$`);

let commands = Object.getOwnPropertyNames(scripts).reduce((result, key) => {
	let m = key.match(namePattern);
	if (m) result.push({
		command: 'npm:' + key,
		name: m[1],
		prefixColor: colors[result.length % colors.length]
	});
	return result;
}, []);

concurrently(commands, {
	prefix: 'name',
	killOthers: ['failure', 'success'],
}).then(() => { process.exit(0); }, e => { console.log(e) });
