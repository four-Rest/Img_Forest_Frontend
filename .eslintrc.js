module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
    ],
    overrides: [
      {
        env: {
          node: true,
        },
        files: ['.eslintrc.{js,cjs}'],
        parserOptions: {
          sourceType: 'script',
        },
      },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'javascript.validate.enable': 'off',
      "react/no-unknown-property": ["error", { "ignore": ["css"] }],
      "@typescript-eslint/no-explicit-any": "off", // any되어 있는 것들 체크
      "@typescript-eslint/no-unused-vars": "off", // 사용하지 않는 변수 체크
    },
    settings: {
      react: {
        version: 'detect', // 사용자가 설치한 버전을 자동으로 선택
      },
    },
  };
  