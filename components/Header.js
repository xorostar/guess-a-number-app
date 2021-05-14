import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import colors from '../constants/colors';

const Header = ({ title }) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    color: colors.primary,
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 18,
    color: Platform.OS === 'android' ? 'white' : colors.primary,
    fontFamily: 'open-sans-bold',
  },
});

export default Header;
