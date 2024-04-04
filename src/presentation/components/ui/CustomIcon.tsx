import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, useTheme} from '@ui-kitten/components';

interface Props {
  name: string;
  color?: string;
  isWhite?: boolean;
}

export const CustomIcon = ({name, color, isWhite = false}: Props) => {
  const theme = useTheme();

  if (isWhite) {
    color = theme['color-info-100'];
  } else if (!color) {
    color = theme['text-basic-color'];
  } else {
    color = theme[color] ?? theme['text-basic-color'];
  }

  return (
    <View>
      <Icon style={styles.icon} fill={color} name={name} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
