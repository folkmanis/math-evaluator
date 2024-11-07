// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.ts'],
    ignores: ['dist/', 'node_modules/'],
});
