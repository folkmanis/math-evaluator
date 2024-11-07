import { evaluateExpressions } from './evaluator';
import { parse } from './parser';
import { Result } from './result.class';
import { tokenize } from './tokenizer';

export function evaluate(expression: string): Result {
    const tokens = tokenize(expression);

    const expressions = parse(tokens);

    return evaluateExpressions(expressions);
}
