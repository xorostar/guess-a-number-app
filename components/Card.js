import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
  return (
    <View
      style={{
        ...styles.card,
        ...props.style,
      }}
    >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    padding: 16,
    elevation: 5,
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

export default Card;
