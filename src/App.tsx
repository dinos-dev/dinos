import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RootNavigator from './navigators/root/RootNavigator';
import { SafeAreaView } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './libs/react-query';
import { initializeKakaoSDK } from '@react-native-kakao/core';

initializeKakaoSDK('512b3a4da55a1ae13fc547eb4c060ea7');

function App(): React.JSX.Element {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <RootNavigator />
                </NavigationContainer>
            </QueryClientProvider>
        </SafeAreaView>
    );
}

export default App;
