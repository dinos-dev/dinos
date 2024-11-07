import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import { NaviParams } from '../../constants/NaviParams';
import { SCREENS } from '../../constants/RoutePath';

const ProfileScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<NaviParams>>();

    return (
        <View>
            <Text style={{ fontSize: 20 }}>프로필</Text>
            <Button
                title="뒤로가기"
                onPress={() => navigation.navigate(SCREENS.MY_PAGE_SCREEN)}
            />
        </View>
    );
};

export default ProfileScreen;
