import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';
import defaultStyles from '../constants/default-styles';

import { Ionicons } from '@expo/vector-icons';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <Text style={defaultStyles.bodyText}>#{listLength - itemData.index}</Text>
      <Text style={defaultStyles.bodyText}>{itemData.item}</Text>
    </View>
  );
};

const GameScreen = ({ userChoice, gameOverHandler }) => {
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

  useEffect(() => {
    if (currentGuess === userChoice) {
      gameOverHandler(pastGuesses.length);
    }
  }, [currentGuess, userChoice, gameOverHandler]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        {
          text: 'Sorry!',
          style: 'cancel',
        },
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);

    setPastGuesses((prevGuesses) => [nextNumber.toString(), ...prevGuesses]);
  };

  if (height < 500) {
    return (
      <View style={styles.screen}>
        <Text style={defaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton
            onPress={nextGuessHandler.bind(this, 'lower')}
            style={{ backgroundColor: colors.accent }}
          >
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton
            onPress={nextGuessHandler.bind(this, 'greater')}
            style={{ backgroundColor: colors.primary }}
          >
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
          {/* <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
          </ScrollView> */}
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <Text style={defaultStyles.title}>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <MainButton
            onPress={nextGuessHandler.bind(this, 'lower')}
            style={{ backgroundColor: colors.accent }}
          >
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <MainButton
            onPress={nextGuessHandler.bind(this, 'greater')}
            style={{ backgroundColor: colors.primary }}
          >
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </Card>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
          {/* <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
          </ScrollView> */}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  controls: {
    width: 300,
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: Dimensions.get('window').height > 600 ? 16 : 8,
    width: 300,
    maxWidth: '100%',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    maxWidth: 100,
    marginHorizontal: 8,
  },
  listContainer: {
    width: Dimensions.get('window').width > 400 ? '60%' : '80%',
    flex: 1,
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    width: '100%',
    marginVertical: 8,
    padding: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default GameScreen;
