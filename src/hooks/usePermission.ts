import { useState } from 'react'
import { Alert, Platform } from 'react-native'
import { check, RESULTS, request, PermissionStatus, openSettings } from 'react-native-permissions'
import { androidPermissions, failedMessages, iosPermissions, permissionRequestMessage } from '../constants/permissions'

type PossiblePermission = 'location' // | 'photo'
interface IGetPermission {
  permissionType: PossiblePermission
  onSuccess?: () => void
  onFailed?: () => void
  isEssential?: false // 임시 , boolean
}

export const usePermission = () => {
  const [permissionOpen, setPermissionOpen] = useState<boolean>(false)
  const [permissionDescription, setPermissionDescription] = useState<string>('')

  const permissionsPerOS = Platform.OS === 'ios' ? iosPermissions : androidPermissions

  const getPermission = async ({
    permissionType,
    onSuccess,
    onFailed,
    isEssential,
  }: IGetPermission): Promise<boolean> => {
    const permission = permissionsPerOS[permissionType]
    setPermissionDescription(permissionRequestMessage[permissionType])
    setPermissionOpen(true)

    const closeBackground = () => {
      setPermissionOpen(false)
      setPermissionDescription('')
    }

    const handlePermissionSuccess = () => {
      if (onSuccess) onSuccess()
      closeBackground()
      return true
    }

    const openDeviceSettings = (message: string) => {
      // 'alarams', 'notifications' 설정 가능
      openSettings('application').catch(() => Alert.alert('앱 설정 화면을 열 수 없습니다.'))
    }

    const handlePermissionError = (message?: string, isEssential = false) => {
      if (isEssential) openDeviceSettings(message || '해당 기능 사용을 위해 접근 권한이 필요합니다.')
      if (onFailed) onFailed()
      closeBackground()
      return false
    }

    const status = await check(permission)
    console.log(status)
    let requested: PermissionStatus
    switch (status) {
      case RESULTS.UNAVAILABLE:
        return handlePermissionError(failedMessages.PERMISSION_UNAVAILABLE, isEssential)
      case RESULTS.GRANTED:
        return handlePermissionSuccess()
      case RESULTS.DENIED:
        requested = await request(permission)
        if (requested === RESULTS.GRANTED) {
          return handlePermissionSuccess()
        } else return handlePermissionError(failedMessages.PERMISSION_BLOCKED, isEssential)
      // case RESULTS.LIMITED:
      // case RESULTS.BLOCKED:
      default:
        return handlePermissionError(failedMessages.PERMISSION_BLOCKED, isEssential)
    }
  }

  return { getPermission, permissionOpen, permissionDescription, check }
}
