import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RefObject } from "react";

interface SearchBarProps {
  inputRef: RefObject<TextInput>;
  searchText: string;
  handleSearchChange: (text: string) => void;
  isSearchActive: boolean;
  setIsSearchActive: (active: boolean) => void;
  suggestions: string[];
  handleSuggestionPress: (suggestion: string) => void;
}

const SearchBar = ({ 
  inputRef, 
  searchText, 
  handleSearchChange, 
  isSearchActive, 
  setIsSearchActive, 
  suggestions, 
  handleSuggestionPress 
}: SearchBarProps) => {
  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default SearchBar;