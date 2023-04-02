import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Card from "./components/Card";

import { emojis } from "./data";
import { shuffle } from "./utils";

const App = () => {
  const [board, setBoard] = useState(() => shuffle([...emojis, ...emojis]));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);

  const handleTapCard = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
    setSelectedCards([...selectedCards, index]);
    setScore(score + 1);
  };

  const handleReset = () => {
    setBoard(() => shuffle([...emojis, ...emojis]));
    setSelectedCards([]);
    setMatchedCards([]);
    setScore(0);
  };

  const didPlayerWin = () => matchedCards.length === board.length;

  useEffect(() => {
    if (selectedCards.length < 2) return;
    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 250);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards]);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#0f172a]">
      <Text className="text-white text-3xl font-black">
        {didPlayerWin() ? "Congratulations 🎉" : "Memory!"}
      </Text>
      <Text className="text-white text-3xl font-black">Score: {score}</Text>

      <View className="flex flex-row flex-wrap justify-center">
        {board &&
          board.map((item, index) => {
            const isTurnedOver =
              selectedCards.includes(index) || matchedCards.includes(index);
            return (
              <Card
                key={`emojis-${index}`}
                isTurnedOver={isTurnedOver}
                onPress={() => handleTapCard(index)}
              >
                {item}
              </Card>
            );
          })}
      </View>

      {didPlayerWin() && (
        <TouchableOpacity
          onPress={handleReset}
          className="border-2 border-[#fff] rounded-lg p-3 mt-3 bg-lime-600"
        >
          <Text className="text-white text-xl">RESET</Text>
        </TouchableOpacity>
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default App;
