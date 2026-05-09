import React from 'react';
import { Text, View } from 'react-native';

import styles from '../styles/styles';

export default function Head() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Questionário</Text>
    </View>
  );
}
