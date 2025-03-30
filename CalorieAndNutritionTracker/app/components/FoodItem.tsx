import React from "react";
import { Text, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

interface FoodItemProps {
  name: string;
  calories: number;
  servingSize: string;
  brand: string;
}

const FoodItem: React.FC<FoodItemProps> = ({ name, calories, servingSize, brand }) => {
  return (
    <View
      style={{
        backgroundColor: "gainsboro",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", flexShrink: 1 }}>{name}</Text>
        <Text style={{ color: "dimgray", flexShrink: 1 }}>
          {calories} cal, {servingSize}, {brand}
        </Text>
      </View>
      <EvilIcons name="plus" size={28} color="#378709" style={{ marginLeft: 10 }} />
    </View>
  );
};

export default FoodItem;
