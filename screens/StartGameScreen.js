import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';
import defaultStyles from '../constants/default-styles';

const StartGameScreen = (props) => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [number, setNumber] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const inputHandler = (value) => {
    setNumber(value.replace(/[^0-9]/g, ''));
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(number);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [
          {
            text: 'Okay',
            style: 'destructive',
            onPress: resetInputHandler,
          },
        ]
      );
      return;
    }
    setConfirmed(true);
    setNumber('');
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  const resetInputHandler = () => {
    setNumber('');
    setConfirmed(false);
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text style={defaultStyles.bodyText}>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.startGameHandler(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behaviour='position' keyboardVerticalOffset='30'>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={defaultStyles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
              <Text style={defaultStyles.bodyText}>Select a Number</Text>
              <Input
                autoCorrect={false}
                keyboardType='number-pad'
                maxLength={2}
                autoCapitalize='none'
                style={styles.input}
                onChangeText={inputHandler}
                value={number}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    title='Reset'
                    onPress={resetInputHandler}
                    color={colors.accent}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    title='Confirm'
                    onPress={confirmInputHandler}
                    color={colors.primary}
                  />
                </View>
              </View>
            </Card>
            <View style={styles.confirmedOutput}>{confirmedOutput}</View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center',
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 300,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    maxWidth: 100,
    marginHorizontal: 8,
  },
  summaryContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});

export default StartGameScreen;
