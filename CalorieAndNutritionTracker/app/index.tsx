import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { useState, useRef } from "react";
import FoodItem from "./components/FoodItem";
import { Ionicons } from "@expo/vector-icons";

const foodItems = [
  {
    name: "Banana",
    calories: 105,
    servingSize: "1 medium (7-8 inches long)",
    brand: "Chiquita",
  },
  {
    name: "Apple",
    calories: 95,
    servingSize: "1 medium (3 inches in diameter)",
    brand: "Gala",
  },
  {
    name: "Orange",
    calories: 62,
    servingSize: "1 medium (2-5/8 inches in diameter)",
    brand: "Navel",
  },
];

export default function Index() {
  const [searchText, setSearchText] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const inputRef = useRef<TextInput>(null);
  
  const handleSearchPress = () => {
    setIsSearchActive(true);
    inputRef.current?.focus();
  };

  const filteredItems = foodItems.filter(item => 
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={[
        styles.searchContainer, 
        isSearchActive && styles.searchContainerActive
      ]}>
        <TextInput
          ref={inputRef}
          placeholder="Search food items"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => setIsSearchActive(false)}
        />
        <TouchableOpacity 
          style={styles.searchIcon} 
          onPress={handleSearchPress}
        >
          <Ionicons name="search" size={20} color="#777" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <FoodItem
            name={item.name}
            calories={item.calories}
            servingSize={item.servingSize}
            brand={item.brand}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 45,
  },
  searchContainerActive: {
    borderColor: "#4CAF50", 
    shadowColor: "#4CAF50",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
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
});