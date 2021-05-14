import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 30,
    marginVertical: 16,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
});

export default Input;
