// app/meal.tsx (Updated with meal tracking functionality)
import { View, StyleSheet, TouchableOpacity, Animated, Keyboard, Alert } from "react-native";
import { useState, useRef, useEffect } from "react";
import FoodList from "../components/FoodList";
import SearchBar from "../components/SearchBar";
import FilterSection from "../components/FilterSection";
import Header from "../components/Header";
import { foodItems, FoodItem } from "./data/foodData";
import { dailyData, MealEntry } from "./data/dailyData";


export default function MealScreen() {
  const [searchText, setSearchText] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [foodData, setFoodData] = useState(foodItems);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  // Add state for today's meals
  const [todaysMeals, setTodaysMeals] = useState(dailyData.meals);
  // Add state for tracking calories
  const [caloriesConsumed, setCaloriesConsumed] = useState(dailyData.caloriesConsumed);
  
  const inputRef = useRef<any>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;
  
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
    
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      slideAnim.setValue(0);
    });
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
  const addMealToToday = (id: string, servingMultiplier: number) => {
    // Find the selected food item
    const foodItem = foodItems.find(item => item.id === id);
    
    if (foodItem) {
      // Calculate estimated macros based on food category
      let estimatedCarbs = 0;
      let estimatedProtein = 0;
      let estimatedFat = 0;
      
      switch(foodItem.category) {
        case 'fruits':
          estimatedCarbs = Math.round(foodItem.calories * 0.25 * servingMultiplier);
          estimatedProtein = Math.round(foodItem.calories * 0.02 * servingMultiplier);
          estimatedFat = Math.round(foodItem.calories * 0.01 * servingMultiplier);
          break;
        case 'vegetables':
          estimatedCarbs = Math.round(foodItem.calories * 0.2 * servingMultiplier);
          estimatedProtein = Math.round(foodItem.calories * 0.05 * servingMultiplier);
          estimatedFat = Math.round(foodItem.calories * 0.01 * servingMultiplier);
          break;
        case 'meat':
          estimatedCarbs = Math.round(foodItem.calories * 0.05 * servingMultiplier);
          estimatedProtein = Math.round(foodItem.calories * 0.3 * servingMultiplier);
          estimatedFat = Math.round(foodItem.calories * 0.15 * servingMultiplier);
          break;
        case 'full dish':
          estimatedCarbs = Math.round(foodItem.calories * 0.15 * servingMultiplier);
          estimatedProtein = Math.round(foodItem.calories * 0.1 * servingMultiplier);
          estimatedFat = Math.round(foodItem.calories * 0.08 * servingMultiplier);
          break;
        default:
          estimatedCarbs = Math.round(foodItem.calories * 0.15 * servingMultiplier);
          estimatedProtein = Math.round(foodItem.calories * 0.1 * servingMultiplier);
          estimatedFat = Math.round(foodItem.calories * 0.05 * servingMultiplier);
      }

      // Create a new meal entry
      const calculatedCalories = Math.round(foodItem.calories * servingMultiplier);
      const newMeal: MealEntry = {
        id: `meal-${Date.now()}`,
        name: foodItem.name,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        calories: calculatedCalories,
        carbs: estimatedCarbs,
        protein: estimatedProtein,
        fat: estimatedFat,
        foodItems: [foodItem.id]
      };
      
      // Update today's meals
      const updatedMeals = [...todaysMeals, newMeal];
      setTodaysMeals(updatedMeals);
      
      // Update total calories consumed
      const newCaloriesConsumed = caloriesConsumed + calculatedCalories;
      setCaloriesConsumed(newCaloriesConsumed);
      
      // Show confirmation to the user
      Alert.alert(
        "Meal Added",
        `Added ${foodItem.name} (${servingMultiplier}x serving) to today's log.\nTotal calories: ${calculatedCalories}`,
        [{ text: "OK" }]
      );
      
      // In a real app, you would persist this data to your backend or local storage
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={1} 
      onPress={handleContainerPress}
    >
      <Header title="Food Tracker" />
      
      <SearchBar 
        inputRef={inputRef}
        searchText={searchText}
        handleSearchChange={handleSearchChange}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        suggestions={suggestions}
        handleSuggestionPress={handleSuggestionPress}
      />
      
      <FilterSection 
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      
      <Animated.View 
        style={[
          styles.listContainer,
          { transform: [{ translateX: slideAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 10, 0]
          }) }] }
        ]}
      >
        <FoodList 
          filteredItems={filteredItems} 
          toggleFavorite={toggleFavorite}
          addMealToToday={addMealToToday}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});