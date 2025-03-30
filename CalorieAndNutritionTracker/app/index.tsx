import { Text, View, StyleSheet, FlatList } from "react-native";
import FoodItem from "./components/FoodItem";

const foodItems = [
  {
    name: "Banana",
    calories: 105,
    servingSize: "1 medium (7-8 inches long)",
    brand: "Chiquita",
  },
  {
    name: "Apple",
    calories: 95,
    servingSize: "1 medium (3 inches in diameter)",
    brand: "Gala",
  },
  {
    name: "Orange",
    calories: 62,
    servingSize: "1 medium (2-5/8 inches in diameter)",
    brand: "Navel",
  },
];


export default function Index() {
  return (
    <View style={styles.container}>
      <FlatList
        data={foodItems}
        renderItem={({ item }) => (
          <FoodItem
            name={item.name}
            calories={item.calories}
            servingSize={item.servingSize}
            brand={item.brand}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 5,
  },
});
