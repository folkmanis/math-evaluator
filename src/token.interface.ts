export interface Token {
    type: 'number' | 'operator' | 'variable';
    value: string;
}
