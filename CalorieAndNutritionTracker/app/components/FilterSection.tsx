import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface FilterButtonProps {
  title: string;
  active: boolean;
  onPress: () => void;
}

const FilterButton = ({ title, active, onPress }: FilterButtonProps) => (
  <TouchableOpacity
    style={[styles.filterButton, active && styles.activeFilterButton]}
    onPress={onPress}
  >
    <Text style={[styles.filterButtonText, active && styles.activeFilterText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

interface FilterSectionProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

const FilterSection = ({ selectedFilter, setSelectedFilter }: FilterSectionProps) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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
});

export default FilterSection;