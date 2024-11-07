interface NumberExpression {
    type: 'numerical';
    value: number;
}
interface UnaryExpression {
    type: 'unary';
    operator: string;
    expression: Expression;
}
interface BinaryExpression {
    type: 'binary';
    operator: string;
    left: Expression;
    right: Expression;
}
interface FunctionExpression {
    type: 'functionCall';
    name: string;
    args: Expression[];
}
export interface ExpressionExpression {
    type: 'expression';
    value: Expression;
}
interface IdentifierExpression {
    type: 'identifier';
    value: string;
}
interface AssignmentExpression {
    type: 'assignment';
    name: IdentifierExpression;
    value: Expression;
}

export type Expression =
    | NumberExpression
    | UnaryExpression
    | BinaryExpression
    | FunctionExpression
    | ExpressionExpression
    | IdentifierExpression
    | AssignmentExpression;
