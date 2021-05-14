import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import MainButton from '../components/MainButton';
import colors from '../constants/colors';
import defaultStyles from '../constants/default-styles';

const GameOverScreen = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.screen}>
        <Text style={defaultStyles.title}>Game Over!</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/success.png')}
            resizeMode='cover'
          />
        </View>
        <View style={styles.summaryContainer}>
          <Text style={{ ...defaultStyles.bodyText, ...styles.summaryText }}>
            Your phone needed{' '}
            <Text style={styles.highlightedText}>{props.guessRounds}</Text>{' '}
            rounds to guess the number{' '}
            <Text style={styles.highlightedText}>{props.userChoice}</Text>.
          </Text>
        </View>
        <View style={styles.button}>
          <MainButton onPress={props.configureNewGame}>New Game</MainButton>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  screen: {
    paddingVertical: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryContainer: {
    width: '80%',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryText: {
    textAlign: 'center',
    fontSize: 18,
  },
  imageContainer: {
    borderColor: 'black',
    borderWidth: 3,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    overflow: 'hidden',
    marginVertical: 8,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  highlightedText: {
    fontFamily: 'open-sans-bold',
    color: colors.primary,
  },
  button: {
    marginTop: 16,
  },
});

export default GameOverScreen;
