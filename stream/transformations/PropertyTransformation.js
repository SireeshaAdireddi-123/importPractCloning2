const assert = require('common/lang/assert'),
	attributes = require('common/lang/attributes');

const Transformation = require('./Transformation');

module.exports = (() => {
	'use strict';

	/**
	 * An abstract subclass of {@link Transformation} that expects the input
	 * to be an object, then reads a single property and then writes a value
	 * to the same (or another) property.
	 *
	 * @public
	 * @abstract
	 */
	class PropertyTransformation extends Transformation {
		/**
		 * @param {String} inputPropertyName - The name of the property to read from.
		 * @param {String=} outputPropertyName - The name of the property to write to.
		 * @param {String=} description - Describes the transformation, intended for logging purposes.
		 */
		constructor(inputPropertyName, outputPropertyName, descripription) {
			super(descripription);

			assert.argumentIsRequired(inputPropertyName, 'inputPropertyName', String);
			assert.argumentIsOptional(outputPropertyName, 'inputPropertyName', String);
			assert.argumentIsOptional(descripription, 'descripription', String);

			this._inputPropertyName = inputPropertyName;
			this._outputPropertyName = outputPropertyName || inputPropertyName;
		}

		_canTransform(input) {
			return attributes.has(input, this._inputPropertyName) && this._canTransformValue(attributes.read(input, this._inputPropertyName));
		}

		_canTransformValue(value) {
			return true;
		}

		_transform(input) {
			attributes.write(input, this._outputPropertyName, this._transformValue(attributes.read(input, this._inputPropertyName)));

			return input;
		}

		_transformValue(value) {
			return value;
		}

		toString() {
			return '[PropertyTransformation]';
		}
	}

	return PropertyTransformation;
})();