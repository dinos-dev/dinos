import { PERMISSIONS } from 'react-native-permissions'

export const androidPermissions = {
  location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  coarseLocation: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  // photo: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
}
export const iosPermissions = {
  location: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, //always?
  // photo: PERMISSIONS.IOS.PHOTO_LIBRARY,
}
export const permissionRequestMessage = {
  location: '현재 위치 표시를 위해\n위치 권한을 허용해주세요.',
  // photo: '사진 업로드를 위해\n앨범 접근 권한을 허용해주세요.',
}
export const failedMessages = {
  PERMISSION_UNAVAILABLE: 'This feature is not available (on this device / in this context)',
  PERMISSION_BLOCKED: 'The permission is denied and not requestable',
  PERMISSION_DENIED: 'The permission has not been requested / is denied but requestable',
  PERMISSION_LIMITED: 'The permission has not been requested / is denied but requestable',
}
