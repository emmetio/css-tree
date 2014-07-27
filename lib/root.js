if (typeof module === 'object' && typeof define !== 'function') {
	var define = function (factory) {
		module.exports = factory(require, exports, module);
	};
}

define(function(require, exports, module) {
	var Section = require('./section');
	var utils = require('./utils');
	var range = require('./range');

	function Root(source) {
		if (!(this instanceof Root)) {
			return new Root(source);
		}

		Section.call(this, source, {}, 'root');
	}

	utils.inherit(Root, Section, {
		/**
		 * Override Section’s `range` method for some section-specific changes 
		 * @return {Range}
		 */
		range: function(name) {
			if (name === 'full' || name === 'self') {
				return range(0, this._source.length);
			}

			return Section.prototype.range.apply(this, arguments);
		},

		toJSON: function() {
			return {
				src: this._source.valueOf(),
				t: this.type,
				c: this.children.map(function(child) {
					return child.toJSON();
				})
			};
		}
	});

	return Root;
});