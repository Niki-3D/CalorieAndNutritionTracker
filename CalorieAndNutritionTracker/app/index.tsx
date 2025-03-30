import { View, StyleSheet, TouchableOpacity, Animated, Keyboard } from "react-native";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import FoodList from "./components/FoodList";
import SearchBar from "./components/SearchBar";
import FilterSection from "./components/FilterSection";
import Header from "./components/Header";
import BottomNavBar from "./components/BottomNavBar";

// Food items data
import { foodItems } from "./data/foodData";

export default function Index() {
  const [searchText, setSearchText] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [foodData, setFoodData] = useState(foodItems);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activePage, setActivePage] = useState("meal");
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

  const handlePageChange = (page: string) => {
    setActivePage(page);
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
        />
      </Animated.View>

      <BottomNavBar 
        activePage={activePage}
        onPageChange={handlePageChange}
      />
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