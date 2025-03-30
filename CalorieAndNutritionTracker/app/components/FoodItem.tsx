import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

interface FoodItemProps {
  name: string;
  calories: number;
  servingSize: string;
  brand: string;
}

const FoodItem: React.FC<FoodItemProps> = ({ name, calories, servingSize, brand }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.info}>
          {calories} cal, {servingSize}, {brand}
        </Text>
      </View>
      <EvilIcons name="plus" size={28} color="#378709" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    backgroundColor: "gainsboro",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
    nameText: {
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1,
  },
  info: {
    color: "dimgray",
    flexShrink: 1,
  },
  icon: {
    marginLeft: 10
},
})

export default FoodItem;
