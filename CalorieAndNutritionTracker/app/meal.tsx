// app/meal.tsx (Updated with meal tracking functionality)
import { View, StyleSheet, TouchableOpacity, Animated, Keyboard, Alert, Dimensions } from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { router } from "expo-router";
import FoodList from "../components/FoodList";
import SearchBar from "../components/SearchBar";
import FilterSection from "../components/FilterSection";
import Header from "../components/Header";
import { foodItems, FoodItem } from "./data/foodData";
import { dailyData, DailyDataManager } from "./data/dailyData";
import { useFocusEffect } from '@react-navigation/native';

export default function MealScreen() {
  const [searchText, setSearchText] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [foodData, setFoodData] = useState(foodItems);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRef = useRef<any>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  
  // Load current daily data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      DailyDataManager.load(); // Just ensure data is initialized
      // Reset animations
      slideAnim.setValue(0);
      scaleAnim.setValue(1);
      opacityAnim.setValue(1);
    }, [])
  );

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    
    if (text.length > 0) {
      const searchSuggestions = [...new Set(
        foodItems
          .filter(item => item.name.toLowerCase().includes(text.toLowerCase()))
          .map(item => item.name)
      )].slice(0, 5);
      
      setSuggestions(searchSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  
  useEffect(() => {
    let filtered = [...foodItems];
    
    if (selectedFilter === "favorites") {
      filtered = filtered.filter(item => item.favorite);
    } else if (selectedFilter !== "all") {
      filtered = filtered.filter(item => item.category === selectedFilter);
    }
    
    filtered.sort((a, b) => {
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return 0;
    });
    
    setFoodData(filtered);
    
    // Animate filter change
    slideAnim.setValue(-20);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  }, [selectedFilter, foodItems]);
  
  const filteredItems = foodData.filter(
    item => item.name.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const toggleFavorite = (id: string) => {
    const newData = foodItems.map(item => 
      item.id === id ? { ...item, favorite: !item.favorite } : item
    );
    
    foodItems.forEach((item, index) => {
      if (item.id === id) {
        foodItems[index].favorite = !item.favorite;
      }
    });
    
    let filtered = [...newData];
    if (selectedFilter === "favorites") {
      filtered = filtered.filter(item => item.favorite);
    } else if (selectedFilter !== "all") {
      filtered = filtered.filter(item => item.category === selectedFilter);
    }
    
    filtered.sort((a, b) => {
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return 0;
    });
    
    setFoodData(filtered);
  };
  
  const handleContainerPress = () => {
    Keyboard.dismiss();
    setSuggestions([]);
  };
  
  const handleSuggestionPress = (suggestion: string) => {
    setSearchText(suggestion);
    setSuggestions([]);
    Keyboard.dismiss();
  };

  // Function to add a meal to today's log
  const addMealToToday = async (foodItem: FoodItem, servingMultiplier: number) => {
    try {
      setIsLoading(true);
      
      // Calculate total nutrients for the meal
      const mealNutrients = {
        calories: Math.round(foodItem.calories * servingMultiplier),
        carbs: Math.round(foodItem.macros.carbs * servingMultiplier),
        protein: Math.round(foodItem.macros.protein * servingMultiplier),
        fat: Math.round(foodItem.macros.fat * servingMultiplier),
        fiber: Math.round(foodItem.macros.fiber * servingMultiplier),
        sugar: Math.round(foodItem.macros.sugar * servingMultiplier),
        nutrients: {
          sodium: Math.round(foodItem.nutrients.sodium * servingMultiplier),
          calcium: Math.round(foodItem.nutrients.calcium * servingMultiplier),
          iron: Math.round(foodItem.nutrients.iron * servingMultiplier * 10) / 10,
          vitaminC: Math.round(foodItem.nutrients.vitaminC * servingMultiplier * 10) / 10,
          vitaminD: Math.round(foodItem.nutrients.vitaminD * servingMultiplier * 10) / 10
        }
      };

      // Create new meal entry with adjusted serving size
      const newMeal = {
        id: `meal-${Date.now()}`,
        name: foodItem.name,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now(),
        calories: mealNutrients.calories,
        carbs: mealNutrients.carbs,
        protein: mealNutrients.protein,
        fat: mealNutrients.fat,
        fiber: mealNutrients.fiber,
        sugar: mealNutrients.sugar,
        nutrients: mealNutrients.nutrients,
        foodItems: [{
          ...foodItem,
          servingSize: `${servingMultiplier} × ${foodItem.servingSize}`,
          calories: mealNutrients.calories
        }]
      };

      // Add meal using the data manager
      await DailyDataManager.addMeal(newMeal);

      // Animate out and navigate
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start(() => {
        router.replace("/");
      });

    } catch (error) {
      console.error('Error adding meal:', error);
      Alert.alert(
        "Error",
        "Failed to add meal to today's log",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [
            { scale: scaleAnim }
          ]
        }
      ]}
    >
      <Header title="Add Meal" />
      <View style={styles.searchContainer}>
        <SearchBar
          ref={inputRef}
          value={searchText}
          onChangeText={handleSearchChange}
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => setIsSearchActive(false)}
          suggestions={suggestions}
          onSuggestionPress={handleSuggestionPress}
        />
      </View>
      <Animated.View style={{
        transform: [{ translateX: slideAnim }]
      }}>
        <FilterSection
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
      </Animated.View>
      <FoodList
        data={filteredItems}
        onFavoritePress={toggleFavorite}
        onAddPress={addMealToToday}
        isLoading={isLoading}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  }
});