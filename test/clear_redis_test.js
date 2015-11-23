'use strict';

var grunt = require('grunt');
var redis = require('redis');
var async = require('async');

exports.clear_redis = {
	setUp: function(done) {
		done();
	},
	development: function(test) {
		var client = redis.createClient();

		test.expect(4);
		async.parallel(
			[
				function(callback){
					client.get('cakephp_core_grunt_test', function (err, value){
						if (err) {
							throw err;
						}
						test.equal(value, null, 'the value should be null');
						callback();
					});
				},
				function(callback){
					client.get('cakephp_model_grunt_test', function (err, value){
						if (err) {
							throw err;
						}
						test.equal(value, null, 'the value should be null');
						callback();
					});
				},
				function(callback){
					client.get('cache_grunt_test', function (err, value){
						if (err) {
							throw err;
						}
						test.equal(value, null, 'the value should be null');
						callback();
					});
				},
				function(callback){
					client.select(1, function(){
						client.get('session_grunt_test', function (err, value){
							if (err) {
								throw err;
							}
							test.equal(value, null, 'the value should be null');
							callback();
						});
					});
				}
			],
			function(err, results) {
				test.done();
				client.quit();
			}
		);
	}
};
