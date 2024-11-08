import { describe, expect, it } from 'vitest';
import { evaluate } from './index';

describe('valid expressions', () => {
    it('should calculate addition', () => {
        expect(+evaluate('2+2')).toBe(4);
    });

    it('should calculate multiplication', () => {
        expect(+evaluate('2*3')).toBe(6);
    });

    it('should calculate power', () => {
        expect(+evaluate('2^3')).toBe(8);
    });

    it('should maintain precedence', () => {
        expect(+evaluate('2+(4-1)*2^2')).toBe(14);
    });
});

describe('functions', () => {
    it('should calculate sin', () => {
        expect(+evaluate('sin(pi)')).toBeCloseTo(0);
    });
});

describe('invalid expressions', () => {
    it('should throw error on incorrect expressions', () => {
        expect(() => evaluate('2+')).toThrow(SyntaxError);
    });
});
