const typescriptParser = require('@typescript-eslint/parser');

const stylisticPlugin = require('@stylistic/eslint-plugin');
const stylisticTsPlugin = require('@stylistic/eslint-plugin-ts');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const stylisticJsxPlugin = require('@stylistic/eslint-plugin-jsx');
const reactPlugin = require('eslint-plugin-react');

const importPlugin = require('eslint-plugin-import');

const reactHooksPlugin = require('eslint-plugin-react-hooks');

const eslint = require('@eslint/js');

module.exports = [
  eslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    plugins: {
      '@stylistic': stylisticPlugin,
      '@stylistic/ts': stylisticTsPlugin,
      '@stylistic/jsx': stylisticJsxPlugin,
      '@typescript-eslint': typescriptPlugin,
      'react-hooks': reactHooksPlugin,
      'import': importPlugin,
    },
    settings: {
      'react': {
        'version': 'detect',
      },
    },

    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.tsx',
    ],
    languageOptions: {
      parser: typescriptParser,
    },
    rules: {
      'key-spacing': [
        'error',
        {
          'beforeColon': false,
        },
      ],
      'func-style': [
        'error',
        'expression',
      ],
      'arrow-body-style': [
        'error',
        'as-needed',
      ],
      'no-use-before-define': 'error',
      'no-undef': 'off',
      'no-return-assign': 'error',
      'no-duplicate-imports': 'error',
      'no-else-return': [
        'error',
        {
          'allowElseIf': true,
        },
      ],
      'sort-imports': [
        'error',
        {
          'ignoreCase': true,
          'ignoreDeclarationSort': true,
        },
      ],
      'object-shorthand': 'error',
      'eqeqeq': [
        'error',
        'always',
      ],

      // Typescript
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_$',
        },
      ],

      // Stylistic TS
      '@stylistic/ts/type-annotation-spacing': 'error',
      '@stylistic/ts/indent': [
        'error',
        2,
      ],

      // Stylistic
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      '@stylistic/keyword-spacing': [
        'error',
        {
          before: true,
          after: true,
        },
      ],
      '@stylistic/multiline-comment-style': [
        'error',
        'bare-block',
      ],
      '@stylistic/quotes': [
        'error',
        'single',
      ],
      '@stylistic/semi': [
        'error',
        'always',
      ],
      '@stylistic/no-extra-parens': [
        'error',
        'all',
        {
          ignoreJSX: 'multi-line',
          nestedBinaryExpressions: false,
        },
      ],
      '@stylistic/linebreak-style': [
        'error',
        'unix',
      ],
      '@stylistic/no-underscore-dangle': 'off',
      '@stylistic/no-nested-ternary': 'off',
      '@stylistic/multiline-ternary': [
        'error',
        'never',
      ],
      '@stylistic/operator-linebreak': [
        'error',
        'before',
      ],
      '@stylistic/no-param-reassign': 'off',
      '@stylistic/no-shadow': 'off',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-useless-escape': 'off',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 0,
        },
      ],
      '@stylistic/no-console': 'off',
      '@stylistic/no-confusing-arrow': 'off',
      '@stylistic/padded-blocks': [
        'error',
        'never',
      ],
      '@stylistic/eol-last': 'error',
      '@stylistic/camelcase': 'off',
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/block-spacing': 'error',
      '@stylistic/comma-spacing': 'error',
      '@stylistic/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
        },
      ],
      '@stylistic/array-bracket-spacing': [
        'error',
        'never',
      ],
      '@stylistic/object-curly-spacing': [
        'error',
        'always',
      ],
      '@stylistic/jsx-curly-newline': [
        'error',
        {
          multiline: 'consistent',
          singleline: 'consistent',
        },
      ],

      // React
      'react/no-unknown-property': [
        'error',
        {
          ignore: ['f-client-nav'],
        },
      ],
      'react/jsx-closing-tag-location': 'error',
      'react/no-unused-prop-types': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/button-has-type': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-props-no-multi-spaces': 'error',
      'react/jsx-closing-bracket-location': 'error',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-curly-brace-presence': [
        'error',
        'never',
      ],
      'react/jsx-indent-props': [
        'error',
        2,
      ],
      'react/jsx-wrap-multilines': [
        'error',
        {
          'declaration': 'parens-new-line',
          'assignment': 'parens-new-line',
          'return': 'parens-new-line',
          'arrow': 'parens-new-line',
          'condition': 'parens-new-line',
          'logical': 'parens-new-line',
          'prop': 'parens-new-line',
        },
      ],
      'react/jsx-indent': [
        'error',
        2,
        {
          'indentLogicalExpressions': false,
        },
      ],
      'react/function-component-definition': [
        'error',
        {
          'namedComponents': 'arrow-function',
          'unnamedComponents': 'arrow-function',
        },
      ],
      'react/display-name': 'off',
      'react/prop-types': [
        'error',
        {
          'ignore': ['children'],
        },
      ],
      'react/jsx-curly-spacing': [
        'error',
        {
          'when': 'never',
          'children': true,
        },
      ],

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import/order': 'error',
      'import/named': 'off',
    },
  },
];
