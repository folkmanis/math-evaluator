import { describe, expect, it } from 'vitest';
import { evaluate } from './index';

describe('valid expressions', () => {
    it('should calculate addition', () => {
        expect(+evaluate('2+2')).toBe(4);
    });
});

describe('invalid expressions', () => {
    it('should throw error on incorrect expressions', () => {
        expect(() => evaluate('2+')).toThrow(SyntaxError);
    });
});
