# grunt-clear-redis

> A Grunt plugin to delete keys from your redis database, automatically. Useful when using redis as a cache engine.

## Getting Started
This plugin requires Grunt `~0.4.5`

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
			database: 1,
			keys: [
				'cakephp_cake_core_*',
				'cakephp_cake_model_*',
				'cakephp_cache_*',
			],
		}
	},

});
```

And that's all.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
v0.2.0 Added support for multiple databases.
v0.1.0 First useful but limited prototype.
