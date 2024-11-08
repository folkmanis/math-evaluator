import { Token } from './token.interface';
import { Expression, ExpressionExpression } from './expression.interface';

let tokensCollection: Token[] = [];
let index = -1;

function next(): Token | undefined {
    return tokensCollection[++index];
}

function peek(): Token | undefined {
    return tokensCollection[index + 1];
}

export function parse(tokens: Token[]): ExpressionExpression {
    tokensCollection = tokens;
    index = -1;

    const expr = parseExpression();

    const token = next();
    if (typeof token !== 'undefined') {
        throw new SyntaxError('Unexpected token ' + token.value);
    }

    return { type: 'expression', value: expr };
}

// Expression ::= Assignment
function parseExpression(): Expression {
    return parseAssignment();
}

// Assignment ::= Identifier '=' Assignment |
//                Additive
function parseAssignment(): Expression {
    const expr = parseAdditive();

    if (expr.type === 'identifier') {
        const token = peek();
        if (matchOp(token, '=')) {
            next();
            return {
                type: 'assignment',
                name: expr,
                value: parseAssignment(),
            };
        }
        return expr;
    }

    return expr;
}

// ArgumentList := Expression |
//                 Expression ',' ArgumentList
function parseArgumentList() {
    const args: Expression[] = [];

    while (true) {
        const expr = parseExpression();
        if (typeof expr === 'undefined') {
            // TODO maybe throw exception?
            break;
        }
        args.push(expr);
        const token = peek();
        if (!matchOp(token, ',')) {
            break;
        }
        next();
    }

    return args;
}

// FunctionCall ::= Identifier '(' ')' ||
//                  Identifier '(' ArgumentList ')'
function parseFunctionCall(name: string): Expression {
    // var token,
    let args: Expression[] = [];

    const token = next();
    if (!matchOp(token, '(')) {
        throw new SyntaxError('Expecting ( in a function call "' + name + '"');
    }

    const nextToken = peek();
    if (!matchOp(nextToken, ')')) {
        args = parseArgumentList();
    }

    if (!matchOp(next(), ')')) {
        throw new SyntaxError(`Expecting ) in a function call "${name}"`);
    }

    return { type: 'functionCall', name: name, args: args };
}

// Primary ::= Identifier |
//             Number |
//             '(' Assignment ')' |
//             FunctionCall
function parsePrimary(): Expression {
    const token = next();

    if (typeof token === 'undefined') {
        throw new SyntaxError('Unexpected termination of expression');
    }

    if (token.type === 'variable') {
        if (matchOp(peek(), '(')) {
            return parseFunctionCall(token.value);
        } else {
            return { type: 'identifier', value: token.value };
        }
    }

    if (token.type === 'number') {
        return {
            type: 'numerical',
            value: parseFloat(token.value),
        };
    }

    if (matchOp(token, '(')) {
        const expr = parseAssignment();
        const nextToken = next();
        if (!matchOp(nextToken, ')')) {
            throw new SyntaxError('Expecting )');
        }
        return {
            type: 'expression',
            value: expr,
        };
    }

    throw new SyntaxError(`Parse error, can not process token ${token.value}`);
}

// Unary ::= Primary |
//           '-' Unary
function parseUnary(): Expression {
    const token = peek();
    if (matchOp(token, '-') || matchOp(token, '+')) {
        next();
        const expr = parseUnary();
        return {
            type: 'unary',
            operator: token!.value,
            expression: expr,
        };
    }

    return parsePrimary();
}

// Power ::= Unary |
//                    Power '^' Unary |
function parsePower() {
    let expr = parseUnary();
    let token = peek();
    while (matchOp(token, '^')) {
        token = next();
        expr = {
            type: 'binary',
            operator: token!.value,
            left: expr,
            right: parseUnary(),
        };
        token = peek();
    }
    return expr;
}

// Multiplicative ::= Unary |
//                    Multiplicative '*' Unary |
//                    Multiplicative '/' Unary
function parseMultiplicative() {
    let expr = parsePower();
    let token = peek();
    while (matchOp(token, '*') || matchOp(token, '/')) {
        token = next();
        expr = {
            type: 'binary',
            operator: token!.value,
            left: expr,
            right: parsePower(),
        };
        token = peek();
    }
    return expr;
}

// Additive ::= Multiplicative |
//              Additive '+' Multiplicative |
//              Additive '-' Multiplicative
function parseAdditive() {
    let expr = parseMultiplicative();
    let token = peek();
    while (matchOp(token, '+') || matchOp(token, '-')) {
        token = next();
        expr = {
            type: 'binary',
            operator: token!.value,
            left: expr,
            right: parseMultiplicative(),
        };
        token = peek();
    }
    return expr;
}

function matchOp(token: Token | undefined, op: string): boolean {
    return (
        typeof token !== 'undefined' &&
        token.type === 'operator' &&
        token.value === op
    );
}
