import axios, { AxiosInstance } from 'axios';

// 에러 응답 데이터의 타입 정의
// interface ErrorResponseData {
//     errorCode?: string;
//     [key: string]: any; // 다른 속성들을 포함할 수 있도록 설정
// }

// Axios 인스턴스 생성
export const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { 'Content-Type': 'application/json' },
    // timeout: 10000,  // 요청 타임아웃 시간을 10초로 설정합니다. 10초 후에 요청이 완료되지 않으면 에러를 반환합니다.
    withCredentials: true, // 쿠키를 포함한 요청을 허용하기 위해 Header 부분에 옵션 설정
});

// // 요청 인터셉터
// api.interceptors.request.use(
//     (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
//         const accessToken = Cookies.get('accessToken')
//         console.log('요청 인터셉터=> accessToken : ', accessToken)
//         return {
//             ...config,
//             headers: {
//                 ...config.headers,
//                 Authorization: `Bearer ${accessToken}`,
//             },
//             withCredentials: true,
//         } as InternalAxiosRequestConfig
//     },
//     (error: AxiosError) => {
//         return Promise.reject(error)
//     },
// )

// // 응답 인터셉터
// api.interceptors.response.use(
//     response => response, // 정상 응답 처리
//     async (error: AxiosError) => {
//         console.log('interceptor=> error.response : ', error.response)
//         // 에러 응답이 401이고 특정 조건을 만족하는 경우 토큰 재발급 요청
//         if (error.response?.status === 401) {
//             console.log('401 error detected. Attempting to refresh token.');

//             const errorData = error.response.data as ErrorResponseData;

//             // error가 EXPIRED_ACCESS_TOKEN(ACCESS_TOKEN 만료)인 경우에만 토큰 재발급 시도
//             if (errorData && errorData.error && errorData.error === errorCode.EXPIRED_ACCESS_TOKEN) {
//                 console.log('errorData.error :', errorData.error);
//                 console.log('------------accessToken 재발급 API 호출----------')

//                 try {
//                     // 토큰 재발급을 위한 API 호출
//                     const response = await axios({
//                         method: 'post',
//                         url: `${process.env.NEXT_PUBLIC_API_URL}auth/token/access`,
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         withCredentials: true,
//                     });

//                     const newAccessToken = Cookies.get('newAccessToken')
//                     console.log('newAccessToken(재발급 토큰) : ', newAccessToken)

//                     // 기존 요청을 새 토큰으로 재실행
//                     console.log('------------기존 API 호출----------')
//                     return api({
//                         ...error.config,
//                         headers: {
//                         ...error?.config?.headers,
//                         Authorization: `Bearer ${newAccessToken}`,
//                         },
//                     });

//                 } catch (refreshError) {
//                     console.error('Token refresh failed:', refreshError);
//                     if (typeof window !== 'undefined') {
//                         window.location.href = 'http://localhost:3000';
//                         // window.location.href = 'https://scoollink.com';
//                     }
//                     return Promise.reject(refreshError);
//                 }

//             }
//         }
//         if(error.response?.status === 403){
//             console.log('403 error detected. Attempting to refresh token.');
//             const errorData = error.response.data as ErrorResponseData;

//             // error가 FORBIDDEN_TOKEN(토큰의 시그니처 불일치)인 경우 로그인 페이지로 이동
//             if (errorData && errorData.error && errorData.error === errorCode.FORBIDDEN_TOKEN) {
//                 if (typeof window !== 'undefined') {
//                     window.location.href = 'http://localhost:3000';
//                     // window.location.href = 'https://scoollink.com';
//                 }
//             }
//         }

//       // 다른 모든 에러는 그대로 반환
//       return Promise.reject(error);
//     }
// );
