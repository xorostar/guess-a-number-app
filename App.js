import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoading(false)}
        onError={(err) => {
          console.log(err);
        }}
      />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  const configureNewGame = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  let content = <StartGameScreen startGameHandler={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen gameOverHandler={gameOverHandler} userChoice={userNumber} />
    );
  } else if (guessRounds > 0) {
    return (
      <GameOverScreen
        configureNewGame={configureNewGame}
        guessRounds={guessRounds}
        userChoice={userNumber}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title='Guess a Number' />
      {content}
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
