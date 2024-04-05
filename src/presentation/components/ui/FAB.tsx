import {Button} from '@ui-kitten/components';
import React from 'react';
import {CustomIcon} from './CustomIcon';
import {StyleProp, ViewStyle} from 'react-native';

interface FABProps {
  iconName: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const FAB = ({iconName, style, onPress}: FABProps) => {
  return (
    <Button
      style={[
        style,
        {
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 3,
          borderRadius: 13,
        },
      ]}
      accessoryLeft={<CustomIcon name={iconName} isWhite />}
      onPress={onPress}
    />
  );
};
