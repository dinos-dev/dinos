export const errorMessages: Record<string, Record<number, string>> = {
  '/auth/social-login': {
    400: '로그인 정보가 올바르지 않습니다',
    500: '서버에서 로그인 요청을 처리할 수 없습니다.',
  },
  '/auth/logout': {
    204: '로그아웃 되었습니다',
    500: '서버에서 로그아웃 요청을 처리할 수 없습니다.',
  },
  '/user': {
    204: '회원탈퇴 되었습니다',
    500: '서버에서 사용자 정보 요청을 처리할 수 없습니다.',
  },
}
