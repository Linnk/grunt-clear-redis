# grunt-clear-redis

> A Grunt plugin to delete keys from your redis database, automatically. Useful when using redis as a cache engine.

## Getting Started
This plugin requires Grunt `~1.0.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-clear-redis --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-clear-redis');
```

## The "clear_redis" task

In your project's Gruntfile, add a section named `clear_redis` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({

	clear_redis: {
		development: {
			keys: [
				'cakephp_cake_core_*',
				'cakephp_cake_model_*',
				'cakephp_cache_*',
			],
		}
		production: {
			keys: [
				'cakephp_cake_core_*',
				'cakephp_cake_model_*',
				'cakephp_cache_*',
			],
			database: 1,
			options: {
				port: 6379,
				host: '127.0.0.1',
			},
		}
	},

});
```

### Task's parameters.
* `keys:` An array object with the key patterns you want to delete.
* `database`: *(optional)* Select the database in which you want to perform the task. *Default: 0*
* `options`: *(optional)* Arguments for the actual [redis.createClient()](https://www.npmjs.com/package/redis). *Default: {port: 6370, host: '127.0.0.1'}*

And that's all.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
v0.2.0 Added support for multiple databases.
v0.1.0 First useful but limited prototype.
