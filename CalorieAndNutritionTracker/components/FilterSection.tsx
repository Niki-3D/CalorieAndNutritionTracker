import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FilterSectionProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: 'all', label: 'All', icon: 'grid-outline' },
  { id: 'favorites', label: 'Favorites', icon: 'heart-outline' },
  { id: 'vegetables', label: 'Vegetables', icon: 'leaf-outline' },
  { id: 'fruits', label: 'Fruits', icon: 'nutrition-outline' },
  { id: 'meat', label: 'Meat', icon: 'restaurant-outline' },
  { id: 'dairy', label: 'Dairy', icon: 'water-outline' },
  { id: 'grains', label: 'Grains', icon: 'basket-outline' },
  { id: 'snacks', label: 'Snacks', icon: 'cafe-outline' },
];

const FilterSection: React.FC<FilterSectionProps> = ({ selectedFilter, onFilterChange }) => {
  const { width } = Dimensions.get('window');
  const padding = Math.min(15, width * 0.04);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedFilter === filter.id && styles.selectedFilter,
              { marginRight: padding }
            ]}
            onPress={() => onFilterChange(filter.id)}
          >
            <Ionicons
              name={filter.icon as any}
              size={18}
              color={selectedFilter === filter.id ? '#FFFFFF' : '#666666'}
              style={styles.filterIcon}
            />
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.id && styles.selectedFilterText
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedFilter: {
    backgroundColor: '#4CAF50',
  },
  filterIcon: {
    marginRight: 4,
  },
  filterText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
});

export default FilterSection;