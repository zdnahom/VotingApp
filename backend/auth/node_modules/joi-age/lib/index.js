'use strict';

const Moment = require('moment');

const internal = {};

module.exports = (joi) => ({
    type: 'date',
    base: joi.date(),
    overrides: {
        min: undefined,
        max: undefined,
        less: undefined,
        greater: undefined
    },
    rules: {
        compareAge: {
            method: false,

            validate(value, helpers, { age }, { name, operator }) {

                const ageFromInput = Moment().diff(Moment(value), 'year');

                if (ageFromInput < 0) {
                    return helpers.error('date.negativeAge');
                }

                if (internal.compare(ageFromInput, operator, age)) {
                    return value;
                }

                return helpers.error('date.' + name, { age });
            },
            args: [
                {
                    name: 'age',
                    ref: false,
                    assert: joi.number().positive()
                }
            ]
        },
        minAge: {
            method(age) {

                return this.$_addRule({ name: 'minAge', method: 'compareAge', args: { age }, operator: '>=' });
            }
        },
        maxAge: {
            method(age) {

                return this.$_addRule({ name: 'maxAge', method: 'compareAge', args: { age }, operator: '<=' });
            }
        },
        lessAge: {
            method(age) {

                return this.$_addRule({ name: 'lessAge', method: 'compareAge', args: { age }, operator: '<' });
            }
        },
        greaterAge: {
            method(age) {

                return this.$_addRule({ name: 'greaterAge', method: 'compareAge', args: { age }, operator: '>' });
            }
        }
    },
    messages: {
        'date.negativeAge': '{{#label}} must be in the past',
        'date.minAge': '{{#label}} age must be larger than or equal to {{#age}} years old',
        'date.maxAge': '{{#label}} age must be less than or equal to {{#age}} years old',
        'date.lessAge': '{{#label}} age must be less than {{#age}} years old',
        'date.greaterAge': '{{#label}} age must be greater than {{#age}} years old'
    }
});

internal.compare = function (a, operator, b) {

    switch (operator) {
        case '>': return a > b;
        case '<': return a < b;
        case '>=': return a >= b;
        case '<=': return a <= b;
    }
};
