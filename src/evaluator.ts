import { Expression, ExpressionExpression } from './expression.interface';
import { Result } from './result.class';

const CONSTANTS = {
    pi: Math.PI,
    phi: 1.618033988749894,
};
Object.seal(CONSTANTS);

const FUNCTIONS = {
    abs: Math.abs,
    acos: Math.acos,
    asin: Math.asin,
    atan: Math.atan,
    ceil: Math.ceil,
    cos: Math.cos,
    exp: Math.exp,
    floor: Math.floor,
    ln: Math.log,
    random: Math.random,
    sin: Math.sin,
    sqrt: Math.sqrt,
    tan: Math.tan,
    pow: Math.pow,
};
Object.seal(FUNCTIONS);

let variables: Record<string, number> = {};

function exec(node: Expression): number {
    if (node.type === 'expression') {
        return exec(node.value);
    }

    if (node.type === 'numerical') {
        return node.value;
    }

    if (node.type === 'binary') {
        const { left, right, operator } = node;

        const leftResult = exec(left);
        const rightResult = exec(right);
        switch (operator) {
            case '+':
                return leftResult + rightResult;
            case '-':
                return leftResult - rightResult;
            case '*':
                return leftResult * rightResult;
            case '/':
                return leftResult / rightResult;
            case '^':
                return Math.pow(leftResult, rightResult);
            default:
                throw new SyntaxError(`Unknown operator ${operator}`);
        }
    }

    if (node.type === 'unary') {
        const { expression, operator } = node;

        const expr = exec(expression);
        switch (operator) {
            case '+':
                return expr;
            case '-':
                return -expr;
            default:
                throw new SyntaxError(`Unknown operator ${operator}`);
        }
    }

    if (node.type === 'identifier') {
        const { value: identifier } = node;
        if (typeof CONSTANTS[identifier] === 'number') {
            return CONSTANTS[identifier];
        }
        if (Object.hasOwn(variables, identifier)) {
            return variables[identifier];
        }
        throw new SyntaxError('Unknown identifier');
    }

    if (node.type === 'assignment') {
        const { value, name } = node;
        const right = exec(value);
        variables[name.value] = right;
        return right;
    }

    if (node.type === 'functionCall') {
        const { name, args } = node;

        if (typeof FUNCTIONS[name] === 'function') {
            return FUNCTIONS[name].apply(
                null,
                args.map(arg => exec(arg))
            );
        }
        throw new SyntaxError(`Unknown function ${name}`);
    }

    throw new SyntaxError('Unknown syntax node');
}

export function evaluateExpressions(expr: ExpressionExpression) {
    variables = {};
    const value = exec(expr);
    return new Result(value, variables);
}
