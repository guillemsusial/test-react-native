import React from 'react';
import { View, Text } from 'react-native';

function Shop(props) {
  return (
    <View>
      <Text>Hello, {props.name}!</Text>
    </View>
  );
}

export default Shop;