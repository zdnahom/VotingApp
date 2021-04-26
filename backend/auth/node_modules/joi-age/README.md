# joi-age

[![Greenkeeper badge](https://badges.greenkeeper.io/alfianwahid/joi-age.svg)](https://greenkeeper.io/)

Joi extension for age validation.

This Joi extension is extended from `Joi.date()` base. So, the schema can be constructed using `Joi.date().minAge(18).maxAge(90)`.

### Why not using `.max(), .min(), .less(), .greater()` for age validation?

For example

```js
// 18 year ago from "now"
const date18YearsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18);
// try to validate the age larger than or equal to 18 years old
const ageSchema = Joi.date().max(date18YearsAgo);

ageSchema.validate("2002-02-22");
// with same input "2002-02-22" as birthdate with different time to validate.
// if "now" is 2019-12-29, it got ValidationError because the age is under 18
// if "now" is 2020-03-29, it still got ValidationError even if the age now is 18 years old
```

Running this on server side to validate min 18 years old, it doesn't move dynamically as time passes.

**Note**: This Joi extension disable some default function date, `.max(), .min(), .less(), .greater()` for avoid ambiguity validation error message.

## Compatibility

- This requires Joi v17 or newer.

If you are not familiar with Joi, you should read [Joi Documentation and API](https://hapi.dev/family/joi/)

## Installation

```bash
$ npm install joi-age --save
```

## Usage

```js
const Joi = require("@hapi/joi");
const customJoi = Joi.extend(require("joi-age"));

const schema = customJoi.date().minAge(18);
```

For more usage, check it out [test file](./test/index.js).
