# simple-math-evaluator

I was in need for simple arithmetic expression evaluator.

So I wrote one by myself. It uses regex lexer and syntax tree evaluator. Written in Typescript and contains zero dependencies.

Inspired by [Math Evaluator in JavaScript](https://ariya.io/2011/08/math-evaluator-in-javascript-part1)

## functionality

Just call function `evaluate` with expression string as argument.

## result

Function returns `Result` object with result as `value` property and `variables` object containing all varibles with assigned values

### value

Returned object can be used directly as Number, it's `valueOf()` function return `value` property.

### variables

If expression contains assignement to variables resulting `variables` property will contain object with variable name as property name and variable value as property value, i.e. `x = 5+2` => `{x: 7}`.

## Operators

Built in Javascript operators and Math functions are used for calculations.

### unary

Unary minus `-` can be used to negate value.

### binary

Binary `+` `-` `*` `/` and power `^` can be used.

## Functions

Some functions from JS Math also can be used.
Separate multiple arguments with comma `,`.
