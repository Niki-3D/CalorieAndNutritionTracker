import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity, Animated, Keyboard } from "react-native";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

// Additional food items and favorite feature
const foodItems = [
  { id: "1", name: "Banana", calories: 105, servingSize: "1 medium (7-8 inches long)", brand: "Chiquita", category: "fruits", favorite: false },
  { id: "2", name: "Apple", calories: 95, servingSize: "1 medium (3 inches in diameter)", brand: "Gala", category: "fruits", favorite: true },
  { id: "3", name: "Orange", calories: 62, servingSize: "1 medium (2-5/8 inches in diameter)", brand: "Navel", category: "fruits", favorite: false },
  { id: "4", name: "Spinach", calories: 23, servingSize: "100g", brand: "Organic Farms", category: "vegetables", favorite: true },
  { id: "5", name: "Carrot", calories: 41, servingSize: "1 medium", brand: "Farmer's Market", category: "vegetables", favorite: false },
  { id: "6", name: "Broccoli", calories: 55, servingSize: "1 cup chopped", brand: "Green Valley", category: "vegetables", favorite: false },
  { id: "7", name: "Chicken Breast", calories: 165, servingSize: "100g", brand: "Tyson", category: "meat", favorite: true },
  { id: "8", name: "Ground Beef", calories: 250, servingSize: "100g", brand: "Angus", category: "meat", favorite: false },
  { id: "9", name: "Salmon", calories: 208, servingSize: "100g", brand: "Wild Catch", category: "meat", favorite: true },
  { id: "10", name: "Spaghetti Bolognese", calories: 670, servingSize: "1 plate", brand: "Homemade", category: "full dish", favorite: false },
  { id: "11", name: "Caesar Salad", calories: 480, servingSize: "1 bowl", brand: "Fresh & Green", category: "full dish", favorite: true },
  { id: "12", name: "Beef Stir Fry", calories: 550, servingSize: "1 plate", brand: "Homemade", category: "full dish", favorite: false },
];

const FoodItem = ({ item, toggleFavorite }) => {
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

const FilterButton = ({ title, active, onPress }) => (
  <TouchableOpacity
    style={[styles.filterButton, active && styles.activeFilterButton]}
    onPress={onPress}
  >
    <Text style={[styles.filterButtonText, active && styles.activeFilterText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function Index() {
  const [searchText, setSearchText] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [foodData, setFoodData] = useState(foodItems);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  const handleSearchChange = (text) => {
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
  
  const toggleFavorite = (id) => {
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
  
  const handleSuggestionPress = (suggestion) => {
    setSearchText(suggestion);
    setSuggestions([]);
    Keyboard.dismiss();
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={1} 
      onPress={handleContainerPress}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Food Tracker</Text>
      </View>
      
      <View style={[
        styles.searchContainer, 
        isSearchActive && styles.searchContainerActive
      ]}>
        <TextInput
          ref={inputRef}
          placeholder="Search food items"
          value={searchText}
          onChangeText={handleSearchChange}
          style={styles.searchInput}
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => setIsSearchActive(false)}
        />
        <TouchableOpacity 
          style={styles.searchIcon} 
          onPress={() => inputRef.current?.focus()}
        >
          <Ionicons name="search" size={20} color="#777" />
        </TouchableOpacity>
      </View>
      
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.suggestionItem}
              onPress={() => handleSuggestionPress(suggestion)}
            >
              <Ionicons name="search-outline" size={16} color="#777" />
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      <View style={styles.filterContainer}>
        <FilterButton 
          title="All" 
          active={selectedFilter === "all"} 
          onPress={() => setSelectedFilter("all")}
        />
        <FilterButton 
          title="Favorites" 
          active={selectedFilter === "favorites"} 
          onPress={() => setSelectedFilter("favorites")}
        />
        <FilterButton 
          title="Vegetables" 
          active={selectedFilter === "vegetables"} 
          onPress={() => setSelectedFilter("vegetables")}
        />
        <FilterButton 
          title="Fruits" 
          active={selectedFilter === "fruits"} 
          onPress={() => setSelectedFilter("fruits")}
        />
        <FilterButton 
          title="Meat" 
          active={selectedFilter === "meat"} 
          onPress={() => setSelectedFilter("meat")}
        />
        <FilterButton 
          title="Full Dish" 
          active={selectedFilter === "full dish"} 
          onPress={() => setSelectedFilter("full dish")}
        />
      </View>
      
      <Animated.View 
        style={[
          styles.listContainer,
          { transform: [{ translateX: slideAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 10, 0]
          }) }] }
        ]}
      >
        {filteredItems.length > 0 ? (
          <FlatList
            data={filteredItems}
            renderItem={({ item }) => (
              <FoodItem item={item} toggleFavorite={toggleFavorite} />
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
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#4CAF50",
    marginBottom: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 5,
    height: 50,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  searchContainerActive: {
    borderColor: "#4CAF50", 
    shadowColor: "#4CAF50",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    outlineStyle: "none",
  },
  searchIcon: {
    padding: 5,
  },
  suggestionsContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 5,
    zIndex: 100,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  suggestionText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#333",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilterButton: {
    backgroundColor: "#4CAF50",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#555",
  },
  activeFilterText: {
    color: "white",
    fontWeight: "500",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
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