import prettierConfig from 'eslint-config-prettier';

import angularESLintPlugin from '@angular-eslint/eslint-plugin';
import angularTemplateESLintPlugin from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import typescriptESLintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptESLintParser from '@typescript-eslint/parser';

export default [
    {
        files: ['src/**/*.ts'],
        plugins: {
            '@angular-eslint': angularESLintPlugin,
            '@typescript-eslint': typescriptESLintPlugin,
        },
        languageOptions: {
            parser: typescriptESLintParser,
            parserOptions: {
                project: [
                    './tsconfig.json',
                    './tsconfig.app.json',
                    './tsconfig.spec.json',
                ],
                createDefaultProgram: true,
            },
        },
        rules: {
            ...angularESLintPlugin.configs.recommended.rules,
            ...typescriptESLintPlugin.configs.recommended.rules,
            ...prettierConfig.rules,

            '@angular-eslint/component-selector': [
                'error',
                { type: 'element', prefix: 'cv', style: 'kebab-case' },
            ],
            '@angular-eslint/directive-selector': [
                'error',
                { type: 'attribute', prefix: 'cv', style: 'camelCase' },
            ],
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    {
        files: ['src/**/*.html'],
        plugins: {
            '@angular-eslint/template': angularTemplateESLintPlugin,
        },
        languageOptions: {
            parser: angularTemplateParser,
        },
        rules: {
            ...angularTemplateESLintPlugin.configs.recommended.rules,
            ...prettierConfig.rules,
        },
    },
    {
        ignores: [
            'projects/**/*',
            'dist/**/*',
            'node_modules/**/*',
            '*.js',
            '*.d.ts',
        ],
    },
];
