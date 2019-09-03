const Enum = require('@barchart/common-js/lang/Enum');

module.exports = (() => {
	'use strict';

	/**
	 * An enumeration for different Lambda event triggers.
	 *
	 * @public
	 * @extends {Enum}
	 * @param {String} code
	 * @param {Function} matchPredicate
	 * @param {Function} idExtractor
	 * @param {Function} contentExtractor
	 */
	class LambdaTriggerType extends Enum {
		constructor(code, multiple, matchPredicate, idExtractor, contentExtractor) {
			super(code, code);

			this._matchPredicate = matchPredicate;
			this._idExtractor = idExtractor;
			this._contentExtractor = contentExtractor;
		}

		/**
		 * Returns true if the message matches the trigger type; otherwise false.
		 *
		 * @public
		 * @param {Object}
		 * @returns {Boolean}
		 */
		getMatch(message) {
			return this._matchPredicate(message);
		}

		/**
		 * Extracts and returns the message's identifier.
		 *
		 * @public
		 * @param {Object}
		 * @returns {String|null}
		 */
		getId(message) {
			return this._idExtractor(message) || null;
		}

		/**
		 * Extracts and returns the message's content.
		 *
		 * @public
		 * @param {Object}
		 * @returns {String|null}
		 */
		getContent(message) {
			return this._contentExtractor(message) || null;
		}

		/**
		 * Given a message, returns the {@LambdaTriggerType} which matches the message.
		 *
		 * @public
		 * @static
		 * @param {Object} message
		 * @returns {LambdaTriggerType|null}
		 */
		static fromMessage(message) {
			return Enum.getItems(LambdaTriggerType).find(t => t.match(message)) || null;
		}

		/**
		 * A CloudWatch events trigger.
		 *
		 * @public
		 * @static
		 * @returns {LambdaTriggerType}
		 */
		static get CLOUDWATCH() {
			return cloudwatch;
		}

		/**
		 * A Dynamo stream.
		 *
		 * @public
		 * @static
		 * @returns {LambdaTriggerType}
		 */
		static get DYNAMO() {
			return dynamo;
		}

		/**
		 * An SNS message.
		 *
		 * @public
		 * @static
		 * @returns {LambdaTriggerType}
		 */
		static get SNS() {
			return sns;
		}

		/**
		 * An SQS message.
		 *
		 * @public
		 * @static
		 * @returns {LambdaTriggerType}
		 */
		static get SQS() {
			return sqs;
		}

		toString() {
			return `[LambdaTriggerType (code=${this.code})]`;
		}
	}

	const cloudwatch = new LambdaTriggerType('CRON', m => m.source === 'aws.events', m => m.id, m => m.detail);
	const dynamo = new LambdaTriggerType('DYNAMO', m => m.eventSource === 'aws:dynamodb', m => m.eventID, m => m.dynamodb);
	const sns = new LambdaTriggerType('SNS', m => m.EventSource === 'aws:sns', m => m.MessageId, m => m.Sns.Message);
	const sqs = new LambdaTriggerType('SQS', m => m.eventSource === 'aws:sqs', m => m.messageId, m => m.body);

	return LambdaTriggerType;
})();