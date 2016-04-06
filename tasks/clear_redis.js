/*
 * grunt-clear-redis
 * https://github.com/linnk/grunt-clear-redis
 *
 * Copyright (c) 2015 Juan I. Benavides
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt)
{
	var redis = require('redis');

	grunt.registerMultiTask('clear_redis', 'Grunt plugin to delete keys in Redis automatically.', function(){
		var done = this.async();

		if (isNaN(this.data.database))
		{
			this.data.database = 0;
		}

		if (this.data.keys.constructor !== Array)
		{
			this.data.keys = [];
		}

		if (this.data.keys.length === 0)
		{
			grunt.log.writeln('No keys provided for clear-redis.');

			return done();
		}

		var db_prefix = this.data.database === 0 ? '' : 'DB[' + this.data.database + '] ';
		var total_keys = this.data.keys.length;

		var options = this.data.options instanceof Object ? this.data.options : {};
		var client = redis.createClient(options);

		grunt.verbose.writeln('Selecting database: ' + this.data.database);

		var delete_keys = function delete_keys(key_pattern)
		{
			client.keys(key_pattern, function(err, keys){
				for (var n = 0; n < keys.length; n++)
				{
					grunt.verbose.writeln('Deleting: ' + keys[n]);
					client.del(keys[n]);
				}

				grunt.log.ok(db_prefix + 'Deleted ' + keys.length + ' keys on pattern: ' + key_pattern);

				if ((--total_keys) === 0)
				{
					client.quit();
					done();
				}
			});
		};

		client.select(this.data.database, function() {
			grunt.log.writeln('Deleting keys...');

			for (var i = 0; i < this.data.keys.length; i++)
			{
				delete_keys(this.data.keys[i]);
			}
		}.bind(this));

		client.on('error', function(err) {
			grunt.warn('Redis client, error: ' + err);
			throw err;
		});
	});
};
