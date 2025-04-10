import { Text, View, TouchableOpacity, Animated, StyleSheet, Easing } from "react-native";
import { useRef, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FoodItem } from "../app/data/foodData";

interface FoodItemProps {
  item: FoodItem;
  toggleFavorite: (id: string) => void;
  addMealToToday?: (id: string, servingMultiplier: number) => void;
}

const FoodItemComponent = ({ item, toggleFavorite, addMealToToday }: FoodItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideUpAnim = useRef(new Animated.Value(0)).current;
  const expandAnim = useRef(new Animated.Value(0)).current;
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

  useEffect(() => {
    Animated.timing(expandAnim, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

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
    
    setExpanded(!expanded);
  };

  const handleFavoritePress = () => {
    toggleFavorite(item.id);
  };

  const handleAddToToday = () => {
    if (addMealToToday) {
      addMealToToday(item.id, servingMultiplier);
      setExpanded(false);
    }
  };

  const incrementServing = () => {
    setServingMultiplier(prev => Math.min(prev + 0.5, 10));
  };

  const decrementServing = () => {
    setServingMultiplier(prev => Math.max(prev - 0.5, 0.5));
  };

  // Calculate nutrition based on serving multiplier
  const calculatedCalories = Math.round(item.calories * servingMultiplier);
  
  // Estimated macros based on food category (in a real app, these would come from your database)
  let estimatedCarbs = 0;
  let estimatedProtein = 0;
  let estimatedFat = 0;
  
  switch(item.category) {
    case 'fruits':
      estimatedCarbs = Math.round(item.calories * 0.25 * servingMultiplier);
      estimatedProtein = Math.round(item.calories * 0.02 * servingMultiplier);
      estimatedFat = Math.round(item.calories * 0.01 * servingMultiplier);
      break;
    case 'vegetables':
      estimatedCarbs = Math.round(item.calories * 0.2 * servingMultiplier);
      estimatedProtein = Math.round(item.calories * 0.05 * servingMultiplier);
      estimatedFat = Math.round(item.calories * 0.01 * servingMultiplier);
      break;
    case 'meat':
      estimatedCarbs = Math.round(item.calories * 0.05 * servingMultiplier);
      estimatedProtein = Math.round(item.calories * 0.3 * servingMultiplier);
      estimatedFat = Math.round(item.calories * 0.15 * servingMultiplier);
      break;
    case 'full dish':
      estimatedCarbs = Math.round(item.calories * 0.15 * servingMultiplier);
      estimatedProtein = Math.round(item.calories * 0.1 * servingMultiplier);
      estimatedFat = Math.round(item.calories * 0.08 * servingMultiplier);
      break;
    default:
      estimatedCarbs = Math.round(item.calories * 0.15 * servingMultiplier);
      estimatedProtein = Math.round(item.calories * 0.1 * servingMultiplier);
      estimatedFat = Math.round(item.calories * 0.05 * servingMultiplier);
  }

  const expandHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 190]
  });

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
            <Text style={styles.calorieText}>{item.calories} cal</Text> | {item.servingSize}
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
      
      <Animated.View style={[styles.expandedContent, { height: expandHeight }]}>
        <View style={styles.divider} />
        
        <View style={styles.nutritionContainer}>
          <View style={styles.nutritionItem}>
            <Text style={[styles.nutritionValue, styles.calorieText]}>{calculatedCalories}</Text>
            <Text style={styles.nutritionLabel}>Calories</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={[styles.nutritionValue, styles.carbsText]}>{estimatedCarbs}g</Text>
            <Text style={styles.nutritionLabel}>Carbs</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={[styles.nutritionValue, styles.proteinText]}>{estimatedProtein}g</Text>
            <Text style={styles.nutritionLabel}>Protein</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={[styles.nutritionValue, styles.fatText]}>{estimatedFat}g</Text>
            <Text style={styles.nutritionLabel}>Fat</Text>
          </View>
        </View>
        
        <View style={styles.servingContainer}>
          <Text style={styles.servingLabel}>Serving size:</Text>
          <View style={styles.servingControls}>
            <TouchableOpacity 
              style={styles.servingButton} 
              onPress={decrementServing}
            >
              <Ionicons name="remove" size={18} color="#4CAF50" />
            </TouchableOpacity>
            <Text style={styles.servingValue}>{servingMultiplier}x</Text>
            <TouchableOpacity 
              style={styles.servingButton} 
              onPress={incrementServing}
            >
              <Ionicons name="add" size={18} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddToToday}
        >
          <Ionicons name="add-circle" size={18} color="white" />
          <Text style={styles.addButtonText}>Add to Today's Meals</Text>
        </TouchableOpacity>
      </Animated.View>
      
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
    elevation: 2,
    overflow: "hidden",
    borderColor: "green",
    borderWidth: 0.5,
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
  expandedContent: {
    overflow: "hidden",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 15,
  },
  nutritionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  nutritionItem: {
    alignItems: "center",
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  // Updated color styles to match home page
  calorieText: {
    color: "#4CAF50", // Green for calories
    fontWeight: "700",
  },
  carbsText: {
    color: "#3DD598", // Green for carbs
    fontWeight: "700",
  },
  proteinText: {
    color: "#FFB572", // Orange for protein
    fontWeight: "700",
  },
  fatText: {
    color: "#9059FF", // Purple for fat
    fontWeight: "700",
  },
  nutritionLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  servingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  servingLabel: {
    fontSize: 14,
    color: "#555",
  },
  servingControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  servingButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  servingValue: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 10,
    minWidth: 30,
    textAlign: "center",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 5,
  },
});

export default FoodItemComponent;