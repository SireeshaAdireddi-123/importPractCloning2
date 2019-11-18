const EmptyCoalescingResultProcessor = require('./../../../../data/processors/EmptyCoalescingResultProcessor');

describe('When a EmptyCoalescingResultProcessor is created, specifying a replacement value', () => {
	'use strict';

	let processor;
	let configuration;

	beforeEach(() => {
		processor = new EmptyCoalescingResultProcessor(configuration = { propertyName: 'testProperty', replaceValue: 'testValue' });
	});

	describe('and a target object with a null property is processed', () => {
		let target;

		beforeEach(function(done) {
			processor.process(target = { testProperty: null })
				.then(function(r) {
					done();
				});
		});

		it('should assign the coalesced value to the target property', () => {
			expect(target.testProperty).toEqual('testValue');
		});
	});

	describe('and a target object with an undefined property is processed', () => {
		let target;

		beforeEach(function(done) {
			processor.process(target = { testProperty: undefined })
				.then(function(r) {
					done();
				});
		});

		it('should assign the coalesced value to the target property', () => {
			expect(target.testProperty).toEqual('testValue');
		});
	});

	describe('and a target object with an zero-length string property is processed', () => {
		let target;

		beforeEach(function(done) {
			processor.process(target = { testProperty: '' })
				.then(function(r) {
					done();
				});
		});

		it('should assign the coalesced value to the target property', () => {
			expect(target.testProperty).toEqual('testValue');
		});
	});

	describe('and a target object with a non-null property is processed', () => {
		let target;

		beforeEach(function(done) {
			processor.process(target = { testProperty: 'bob' })
				.then(function(r) {
					done();
				});
		});

		it('should assign the coalesced value to the target property', () => {
			expect(target.testProperty).toEqual('bob');
		});
	});

	describe('and a target object without the property is processed', () => {
		let target;

		beforeEach(function(done) {
			processor.process(target = { })
				.then(function(r) {
					done();
				});
		});

		it('should assign the coalesced value to the target property', () => {
			expect(target.testProperty).toEqual('testValue');
		});
	});
});

describe('When a EmptyCoalescingResultProcessor is created, specifying a replacement reference', () => {
	'use strict';

	let processor;
	let configuration;

	beforeEach(() => {
		processor = new EmptyCoalescingResultProcessor(configuration = { propertyName: 'testProperty', replaceValueRef: 'otherProperty' });
	});

	describe('and a target object with a null property is processed', () => {
		let target;

		beforeEach(function(done) {
			processor.process(target = { testProperty: null, otherProperty: 'otherValue' })
				.then(function(r) {
					done();
				});
		});

		it('should assign the coalesced value to the target property', () => {
			expect(target.testProperty).toEqual('otherValue');
		});
	});

	describe('and a target object with an undefined property is processed', () => {
		let target;

		beforeEach(function(done) {
			processor.process(target = { testProperty: undefined, otherProperty: 'otherValue' })
				.then(function(r) {
					done();
				});
		});

		it('should assign the coalesced value to the target property', () => {
			expect(target.testProperty).toEqual('otherValue');
		});
	});

	describe('and a target object with an zero-length string property is processed', () => {
		let target;

		beforeEach(function(done) {
			processor.process(target = { testProperty: '', otherProperty: 'otherValue' })
				.then(function(r) {
					done();
				});
		});

		it('should assign the coalesced value to the target property', () => {
			expect(target.testProperty).toEqual('otherValue');
		});
	});

	describe('and a target object with a non-null property is processed', () => {
		let target;

		beforeEach(function(done) {
			processor.process(target = { testProperty: 'bob', otherProperty: 'otherValue' })
				.then(function(r) {
					done();
				});
		});

		it('should assign the coalesced value to the target property', () => {
			expect(target.testProperty).toEqual('bob');
		});
	});

	describe('and a target object without the property is processed', () => {
		let target;

		beforeEach(function(done) {
			processor.process(target = { otherProperty: 'otherValue' })
				.then(function(r) {
					done();
				});
		});

		it('should assign the coalesced value to the target property', () => {
			expect(target.testProperty).toEqual('otherValue');
		});
	});
});