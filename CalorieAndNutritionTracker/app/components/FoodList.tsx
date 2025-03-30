import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FoodItemComponent from "./FoodItem";
import { FoodItem } from "../data/foodData";

interface FoodListProps {
  filteredItems: FoodItem[];
  toggleFavorite: (id: string) => void;
}

const FoodList = ({ filteredItems, toggleFavorite }: FoodListProps) => {
  // We need to ensure the component is correctly rendering the food items
  return (
    <>
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={({ item }) => (
            <FoodItemComponent item={item} toggleFavorite={toggleFavorite} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="nutrition-outline" size={50} color="#ddd" />
          <Text style={styles.emptyStateText}>No food items found</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 80, 
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    marginTop: 10,
    fontSize: 16,
    color: "#999",
  },
});

export default FoodList;