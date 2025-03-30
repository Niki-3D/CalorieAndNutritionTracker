import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

// Expanded food items list with categories
const foodItems = [
  { id: "1", name: "Banana", calories: 105, servingSize: "1 medium (7-8 inches long)", brand: "Chiquita", category: "fruits" },
  { id: "2", name: "Apple", calories: 95, servingSize: "1 medium (3 inches in diameter)", brand: "Gala", category: "fruits" },
  { id: "3", name: "Orange", calories: 62, servingSize: "1 medium (2-5/8 inches in diameter)", brand: "Navel", category: "fruits" },
  { id: "4", name: "Spinach", calories: 23, servingSize: "100g", brand: "Organic Farms", category: "vegetables" },
  { id: "5", name: "Carrot", calories: 41, servingSize: "1 medium", brand: "Farmer's Market", category: "vegetables" },
  { id: "6", name: "Broccoli", calories: 55, servingSize: "1 cup chopped", brand: "Green Valley", category: "vegetables" },
  { id: "7", name: "Chicken Breast", calories: 165, servingSize: "100g", brand: "Tyson", category: "meat" },
  { id: "8", name: "Ground Beef", calories: 250, servingSize: "100g", brand: "Angus", category: "meat" },
];

// Food item component
const FoodItem = ({ item }) => {
  return (
    <View style={styles.foodItemContainer}>
      <View style={styles.foodItem}>
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodDetails}>
            {item.calories} cal | {item.servingSize}
          </Text>
          <Text style={styles.foodBrand}>{item.brand}</Text>
        </View>
      </View>
      <View style={styles.categoryTag}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
    </View>
  );
};

// Filter button component
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
  const inputRef = useRef(null);
  
  // Filter items based on search text and selected category
  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter = selectedFilter === "all" || item.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });
  
  const handleSearchPress = () => {
    setIsSearchActive(true);
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
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
      
      <View style={styles.filterContainer}>
        <FilterButton 
          title="All" 
          active={selectedFilter === "all"} 
          onPress={() => setSelectedFilter("all")}
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
      </View>
      
      <View style={styles.listContainer}>
        {filteredItems.length > 0 ? (
          <FlatList
            data={filteredItems}
            renderItem={({ item }) => <FoodItem item={item} />}
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
      </View>
    </View>
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
    padding: 15,
  },
  foodItem: {
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