import { Text, View, TouchableOpacity, Animated, StyleSheet, Easing } from "react-native";
import { useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FoodItem } from "../app/data/foodData";

interface FoodItemProps {
  item: FoodItem;
  toggleFavorite: (id: string) => void;
}

const FoodItemComponent = ({ item, toggleFavorite }: FoodItemProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideUpAnim = useRef(new Animated.Value(0)).current;
  const previousFavoriteState = useRef(item.favorite);

  useEffect(() => {
    if (item.favorite && !previousFavoriteState.current) {
      slideUpAnim.setValue(0);
      Animated.sequence([
        Animated.timing(slideUpAnim, {
          toValue: -15,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideUpAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        })
      ]).start();
    }
    previousFavoriteState.current = item.favorite;
  }, [item.favorite]);

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

  const handleFavoritePress = () => {
    toggleFavorite(item.id);
  };

  return (
    <Animated.View 
      style={[
        styles.foodItemContainer, 
        { 
          transform: [
            { scale: scaleAnim },
            { translateY: slideUpAnim }
          ] 
        }
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
          onPress={handleFavoritePress}
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
