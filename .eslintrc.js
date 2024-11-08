module.exports = {
  root: true, // Monorepo 환경에서 유용하지만 ESLint 설정 파일이 하나만 있는 코드 저장소에서도 혹여나 상위 폴더에 있는 설정 파일에 영향을 받는 일이 없도록 root 옵션을 true로 설정하는 경우가 많음.
  env: {
    browser: true, // 브라우저 환경을 사용한다.
    node: true, // Node.js 환경을 사용한다.
    es6: true, // ECMAScript 2015 (ES6) 환경을 사용한다.
  },
  parser: '@typescript-eslint/parser', // TypeScript 사용시, JavaScript 사용시 "@babel/eslint-parser" 사용
  parserOptions: {
    ecmaVersion: 'latest', // 가장 최근에 지원되는 버전을 사용
    sourceType: 'module', // module로 설정된 경우에는 import 구문을 사용하는 것이 유효
    ecmaFeatures: {
      jsx: true, // jsx 활성화 *jsx 구문 지원과 react 지원은 틀리므로 react를 사용하는 경우 eslint-plugin-react 사용
    },
  },
  plugins: ['import', '@typescript-eslint', 'prettier', 'unused-imports'],
  extends: [
    'eslint:recommended', //사용하지 않는 변수와 같은 코드 품질 검사는 ESLint 추천 규칙 사용
    'plugin:@typescript-eslint/recommended', // TypeScript 사용 시 적용
    'plugin:prettier/recommended', // eslint-config-prettier를 실제로 활성화시켜서 중복되는 룰을 끄도록 하는 설정.
  ],
  rules: {
    'no-var': 'error',
    'no-empty-static-block': 'error', // 빈 함수를 허용하지 않음.
    'require-await': 'error', // async 사용 시 await 사용 필수
    '@typescript-eslint/no-unused-vars': 'off', // 타입 스크립트 사용 시 인터페이스 충돌 방지
    'unused-imports/no-unused-imports': 'error', // 사용하지 않는 import 방지
  },
}
