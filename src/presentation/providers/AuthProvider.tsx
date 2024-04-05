import React, {PropsWithChildren, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {RootStackParams} from '../router/StackNavigator';
import {useAuthStore} from '../store/auth/useAuthStore';

export const AuthProvider = ({children}: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const {checkStatus, status, user} = useAuthStore();

  useEffect(() => {
    if (user !== undefined && status === 'checking') {
      checkStatus();
    }
  }, [checkStatus, user, status]);

  useEffect(() => {
    if (status !== 'checking' && status === 'authenticated') {
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    }
  }, [status, navigation]);

  return <>{children}</>;
};
