var assert = require('common/lang/assert');

var Endpoint = require('./../../Endpoint');

module.exports = function() {
	'use strict';

	var SocketRequestEndpoint = Endpoint.extend({
		init: function(channel, command) {
			this._super(command);

			assert.argumentIsRequired(channel, 'channel', String);

			this._channel = channel;
		},

		getChannel: function() {
			return this._channel;
		},

		toString: function() {
			return '[SocketRequestEndpoint]';
		}
	});

	return SocketRequestEndpoint;
}();