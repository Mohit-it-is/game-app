import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import Title from "../components/Title";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import InstructionsText from "../components/InstructionsText";
import { Ionicons } from "@expo/vector-icons"; // for icons provided by expo

function generateRandomBetween(min, max, exclude) {
  const rndNUm = Math.floor(Math.random() * (max - min)) + min;
  if (rndNUm === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNUm;
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ chosenNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, chosenNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessedRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === chosenNumber) {
      onGameOver();
    }
  }, [currentGuess, chosenNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    // direction => 'lower', 'greater'
    if (
      (direction === "lower" && currentGuess < chosenNumber) ||
      (direction === "greater" && currentGuess > chosenNumber)
    ) {
      Alert.alert("Don't Lie", "This is wrong", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessedRounds((prev) => [newRndNumber, ...prev]);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionsText style={styles.instructionText}>
          Higher or lower ?
        </InstructionsText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View>
        {guessRounds.map((item) => {
          return <Text key={item}>{item}</Text>;
        })}
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
});
