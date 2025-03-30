import { Text, View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FoodItem } from "../data/foodData";

interface FoodItemProps {
  item: FoodItem;
  toggleFavorite: (id: string) => void;
}

const FoodItemComponent = ({ item, toggleFavorite }: FoodItemProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View 
      style={[
        styles.foodItemContainer, 
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <TouchableOpacity 
        style={styles.foodItem} 
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodDetails}>
            {item.calories} cal | {item.servingSize}
          </Text>
          <Text style={styles.foodBrand}>{item.brand}</Text>
        </View>
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons 
            name={item.favorite ? "heart" : "heart-outline"} 
            size={24} 
            color={item.favorite ? "#FF6B6B" : "#777"} 
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.categoryTag}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  foodItemContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  foodItem: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  foodDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  foodBrand: {
    fontSize: 13,
    color: "#888",
  },
  favoriteButton: {
    padding: 5,
  },
  categoryTag: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: "#EEFFF0",
    borderWidth: 1,
    borderColor: "#E0F2E0",
  },
  categoryText: {
    fontSize: 10,
    color: "#3A9D42",
    textTransform: "capitalize",
  },
});

export default FoodItemComponent;