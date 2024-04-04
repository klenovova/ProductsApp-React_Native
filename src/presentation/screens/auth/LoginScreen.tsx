import React from 'react';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {StackScreenProps} from '@react-navigation/stack';

import {CustomIcon} from '../../components/ui/CustomIcon';
import {RootStackParams} from '../../router/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

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
            accessoryLeft={<CustomIcon name="email-outline" />}
            style={{marginBottom: 10}}
          />

          <Input
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            accessoryLeft={<CustomIcon name="lock-outline" />}
            style={{marginBottom: 10}}
          />
        </Layout>

        <Layout style={{height: 20}} />

        <Layout>
          <Button
            accessoryRight={<CustomIcon name="arrow-forward-outline" isWhite />}
            onPress={() => {}}>
            Log In
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
