import MembersNavigator from '../members/MembersNavigator'
import CommonNavigator from '../common/CommonNavigator'
import useAuthStore from '../../store/authStore'

function RootNavigator() {
  const { isAuthenticated } = useAuthStore()

  return <>{!isAuthenticated ? <MembersNavigator /> : <CommonNavigator />}</>
}

export default RootNavigator
