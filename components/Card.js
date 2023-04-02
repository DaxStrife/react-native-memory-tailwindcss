import { Pressable, Text } from "react-native";

const Card = ({ onPress, isTurnedOver, children }) => {
  return (
    <Pressable
      onPress={onPress}
      className="w-24 h-24 m-2 items-center justify-center rounded-2xl bg-[#1e293b] border-8 border-[#334155]"
    >
      {isTurnedOver ? (
        <Text className="text-4xl text-[#334155]">{children}</Text>
      ) : (
        <Text className="text-4xl text-[#334155]">?</Text>
      )}
    </Pressable>
  );
};

export default Card;
