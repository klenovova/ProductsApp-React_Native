import React, {useState} from 'react';
import {ActivityIndicator, Alert, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {StackScreenProps} from '@react-navigation/stack';

import {CustomIcon} from '../../components/ui/CustomIcon';
import {RootStackParams} from '../../router/StackNavigator';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuthStore();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const {height} = useWindowDimensions();

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }
    setIsLoading(true);
    const wasSuccessful = await login(form.email, form.password);
    setIsLoading(false);

    if (wasSuccessful) {
      return;
    }
    Alert.alert('Error', 'Incorrect credentials. Please, try again');
  };

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Log In</Text>
          <Text category="p2">
            Please, introduce your information to continue
          </Text>
        </Layout>

        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={email => setForm({...form, email})}
            accessoryLeft={<CustomIcon name="email-outline" />}
            style={{marginBottom: 10}}
          />

          <Input
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={form.password}
            onChangeText={password => setForm({...form, password})}
            accessoryLeft={<CustomIcon name="lock-outline" />}
            style={{marginBottom: 10}}
          />
        </Layout>

        <Layout style={{height: 20}} />

        <Layout>
          <Button
            accessoryRight={
              !isLoading ? (
                <CustomIcon name="arrow-forward-outline" isWhite />
              ) : undefined
            }
            disabled={isLoading}
            onPress={onLogin}>
            {isLoading ? <ActivityIndicator /> : 'Log In'}
          </Button>
        </Layout>

        <Layout style={{marginTop: 20}}>
          <Text category="p2">Don't have an account?</Text>
          <Text
            status="primary"
            category="s1"
            style={{color: 'blue'}}
            onPress={() => navigation.navigate('RegisterScreen')}>
            Register now
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
