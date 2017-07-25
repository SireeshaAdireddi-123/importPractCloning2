const assert = require('common/lang/assert'),
	attributes = require('common/lang/attributes');

const PropertyTransformation = require('./PropertyTransformation');

module.exports = (() => {
	'use strict';

	class PropertyMapTransformation extends PropertyTransformation {
		constructor(property, map) {
			super(property);

			assert.argumentIsRequired(map, 'map', Map, 'Map');

			this._map = map;
		}

		_canTransformValue(value) {
			return this._map.has(value);
		}

		_transformValue(value) {
			return this._map.get(value);
		}

		toString() {
			return '[PropertyMapTransformation]';
		}
	}

	return PropertyMapTransformation;
})();
