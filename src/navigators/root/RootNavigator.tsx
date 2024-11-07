import MembersNavigator from '../members/MembersNavigator';
import CommonNavigator from '../common/CommonNavigator';
import { useState } from 'react';

function RootNavigator() {
    const [isLoggedIn] = useState(false); //로그인상태 확인(전역상태)

    return <>{isLoggedIn ? <MembersNavigator /> : <CommonNavigator />}</>;
}

export default RootNavigator;
