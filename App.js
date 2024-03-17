import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { useFonts } from "expo-font"; // used for loading custom fonts
// import AppLoading from "expo-app-loading";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOver";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameOver, setGameOver] = useState(true);
  const [numberOfRounds, setNumberOfRounds] = useState(0);

  // loading fonts
  // const [fontsLoaded] = useFonts({
  //   "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  //   "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameOver(false);
  }
  function gameOverHanlder() {
    setGameOver(true);
  }
  function startNewGameHandler() {
    setUserNumber(null);
    setNumberOfRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen chosenNumber={userNumber} onGameOver={gameOverHanlder} />
    );
  }

  if (gameOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={numberOfRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      style={styles.rootScreen}
      colors={[Colors.primary700, Colors.accent500]}
    >
      <ImageBackground
        source={require("./assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
