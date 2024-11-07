import { Token } from './token.interface';

export function tokenize(expression: string): Token[] {
    const pattern =
        /(?<number>\d+\.\d+|\d+)|(?<variable>[a-zA-Z]+)|(?<operator>[=+\-*/^()])/g;

    const matches = expression.matchAll(pattern);

    return [...matches].map(matchToken);
}

function matchToken(match: RegExpMatchArray): Token {
    const { groups } = match;
    const type = Object.keys(groups).find(
        key => typeof groups[key] === 'string'
    ) as Token['type'];
    const value = match[0];
    return { type, value };
}
