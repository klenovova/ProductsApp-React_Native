import React, {useState} from 'react';
import {Alert, useWindowDimensions} from 'react-native';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';

import {CustomIcon} from '../../components/ui/CustomIcon';
import {RootStackParams} from '../../router/StackNavigator';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {register} = useAuthStore();

  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const {height} = useWindowDimensions();

  const onRegister = async () => {
    if (
      form.email.length === 0 ||
      form.password.length === 0 ||
      form.fullName.length === 0
    ) {
      return;
    }
    setIsLoading(true);
    const wasSuccessful = await register(
      form.email,
      form.password,
      form.fullName,
    );
    setIsLoading(false);

    if (wasSuccessful) {
      return;
    }
    Alert.alert(
      'Error',
      'There was an error creating your account. Please, try again',
    );
  };

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.3}}>
          <Text category="h1">Create an Account</Text>
          <Text category="p2">
            Please, create an account in order to continue
          </Text>
        </Layout>

        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Complete Name"
            accessoryLeft={<CustomIcon name="person-outline" />}
            value={form.fullName}
            onChangeText={fullName => setForm({...form, fullName})}
            style={{marginBottom: 10}}
          />

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
            onPress={onRegister}>
            Create Account
          </Button>
        </Layout>

        <Layout style={{marginTop: 20}}>
          <Text category="p2">Do you have an account already?</Text>
          <Text
            status="primary"
            category="s1"
            style={{color: 'blue'}}
            onPress={() => navigation.pop()}>
            Login
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
