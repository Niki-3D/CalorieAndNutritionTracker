import { Text, View, TouchableOpacity, Animated, StyleSheet, Easing } from "react-native";
import { useRef, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FoodItem } from "../app/data/foodData";

interface FoodItemProps {
  item: FoodItem;
  toggleFavorite: (id: string) => void;
  addMealToToday: (foodItem: FoodItem, servingMultiplier: number) => Promise<void>;
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
    addMealToToday(item, servingMultiplier);
    setExpanded(false);
  };

  const incrementServing = () => {
    setServingMultiplier(prev => Math.min(prev + 0.5, 10));
  };

  const decrementServing = () => {
    setServingMultiplier(prev => Math.max(prev - 0.5, 0.5));
  };

  // Calculate nutrition based on serving multiplier
  const calculatedCalories = Math.round(item.calories * servingMultiplier);
  
  // Calculate macros based on the item's actual values
  const calculatedCarbs = Math.round(item.macros.carbs * servingMultiplier);
  const calculatedProtein = Math.round(item.macros.protein * servingMultiplier);
  const calculatedFat = Math.round(item.macros.fat * servingMultiplier);

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
            <Text style={[styles.nutritionValue, styles.carbsText]}>{calculatedCarbs}g</Text>
            <Text style={styles.nutritionLabel}>Carbs</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={[styles.nutritionValue, styles.proteinText]}>{calculatedProtein}g</Text>
            <Text style={styles.nutritionLabel}>Protein</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={[styles.nutritionValue, styles.fatText]}>{calculatedFat}g</Text>
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
    padding: 8,
  },
  expandedContent: {
    overflow: "hidden",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 15,
  },
  nutritionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  nutritionItem: {
    alignItems: "center",
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  nutritionLabel: {
    fontSize: 12,
    color: "#666",
  },
  calorieText: {
    color: "#4CAF50",
  },
  carbsText: {
    color: "#3DD598",
  },
  proteinText: {
    color: "#FFB572",
  },
  fatText: {
    color: "#9059FF",
  },
  servingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  servingLabel: {
    fontSize: 14,
    color: "#666",
  },
  servingControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  servingButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  servingValue: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 12,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  categoryTag: {
    position: "absolute",
    top: 15,
    right: 50,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: "#666",
  },
});

export default FoodItemComponent;