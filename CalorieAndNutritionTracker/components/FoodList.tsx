import { View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FoodItemComponent from "./FoodItem";
import { FoodItem } from "../app/data/foodData";

interface FoodListProps {
  data: FoodItem[];
  onFavoritePress: (id: string) => void;
  onAddPress: (foodItem: FoodItem, servingMultiplier: number) => Promise<void>;
  isLoading: boolean;
}

const FoodList = ({ data, onFavoritePress, onAddPress, isLoading }: FoodListProps) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Adding meal...</Text>
      </View>
    );
  }

  return (
    <>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <FoodItemComponent 
              item={item} 
              toggleFavorite={onFavoritePress}
              addMealToToday={onAddPress} 
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="nutrition-outline" size={50} color="#ddd" />
          <Text style={styles.emptyStateText}>No food items found</Text>
          <Text style={styles.emptyStateSubtext}>Try adjusting your search</Text>
        </View>
      )}
    </>
  );
};

const { width } = Dimensions.get('window');
const cardPadding = Math.min(15, width * 0.04);

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: cardPadding,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: cardPadding * 1.5,
    marginTop: cardPadding,
    minHeight: 200,
  },
  loadingText: {
    marginTop: cardPadding,
    fontSize: Math.min(16, width * 0.04),
    color: "#666",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: cardPadding * 1.5,
    marginTop: cardPadding,
    minHeight: 200,
  },
  emptyStateText: {
    fontSize: Math.min(18, width * 0.045),
    color: "#666",
    marginTop: cardPadding,
  },
  emptyStateSubtext: {
    fontSize: Math.min(14, width * 0.035),
    color: "#999",
    marginTop: cardPadding / 2,
  },
});

export default FoodList;