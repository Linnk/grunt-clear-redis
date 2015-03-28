/*
 * grunt-clear-redis
 * https://github.com/linnk/grunt-clear-redis
 *
 * Copyright (c) 2015 Juan I. Benavides
 * Licensed under the MIT license.
 */

var redis = require('redis');
var client = redis.createClient();

'use strict';

module.exports = function(grunt) {

	grunt.registerMultiTask('clear_redis', 'Grunt plugin to delete keys in Redis automatically.', function() {

		var done = this.async();

		var options = this.options({
			verbose: false,
		});

		if (!this.data.keys)
			this.data.keys = [];

		grunt.log.writeln(this.data);
		console.log(this.data);

		client.on('error', function(err) {
			console.log('Redis.on error: ' + err);
		});

		var callbacks_left = 3;
		var delete_keys = function(err, keys)
		{
			for (var n = 0; n < keys.length; n++)
			{
				client.del(keys[n]);
			}

			grunt.log.writeln('Deleted ' + keys.length + ' keys.');

			if ((--callbacks_left) === 0)
			{
				client.quit();
				done();
			}
		}

		grunt.log.writeln('Deleting ' + config.prefix + '* keys.');

		client.keys(config.prefix + 'cake_core_*', delete_keys);
		client.keys(config.prefix + 'cake_model_*', delete_keys);
		client.keys(config.prefix + 'cache_*', delete_keys);
	});

};
