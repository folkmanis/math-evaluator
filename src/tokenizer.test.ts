import { expect, test } from 'vitest';
import { tokenize } from './tokenizer';
import { Token } from './token.interface';

test('tokenizes expression', () => {
    const expression = ' 3.14 *  (x + 5)/2. = y*sin(pi/ 4)';
    const tokens: Token[] = [
        { type: 'number', value: '3.14' },
        { type: 'operator', value: '*' },
        { type: 'operator', value: '(' },
        { type: 'variable', value: 'x' },
        { type: 'operator', value: '+' },
        { type: 'number', value: '5' },
        { type: 'operator', value: ')' },
        { type: 'operator', value: '/' },
        { type: 'number', value: '2' },
        { type: 'operator', value: '=' },
        { type: 'variable', value: 'y' },
        { type: 'operator', value: '*' },
        { type: 'variable', value: 'sin' },
        { type: 'operator', value: '(' },
        { type: 'variable', value: 'pi' },
        { type: 'operator', value: '/' },
        { type: 'number', value: '4' },
        { type: 'operator', value: ')' },
    ];
    expect(tokenize(expression)).toEqual(tokens);
});
