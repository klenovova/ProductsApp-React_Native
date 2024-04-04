import React from 'react';
import {useWindowDimensions} from 'react-native';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';

import {CustomIcon} from '../../components/ui/CustomIcon';
import {RootStackParams} from '../../router/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();
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
            style={{marginBottom: 10}}
          />

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
