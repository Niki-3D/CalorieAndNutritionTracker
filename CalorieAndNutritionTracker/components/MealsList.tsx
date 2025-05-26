// components/MealsList.tsx
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MealEntry } from '../app/data/dailyData';

interface MealsListProps {
  meals: MealEntry[];
}

const MealsList = ({ meals }: MealsListProps) => {
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleMealExpansion = (mealId: string) => {
    if (expandedMealId === mealId) {
      // Collapse
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 300,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setExpandedMealId(null);
      });
    } else {
      // Expand
      setExpandedMealId(mealId);
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 1,
          duration: 300,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const sortedMeals = [...meals].sort((a, b) => b.timestamp - a.timestamp);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  if (meals.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="restaurant-outline" size={50} color="#ddd" />
        <Text style={styles.emptyStateText}>No meals logged today</Text>
        <Text style={styles.emptyStateSubtext}>Add meals from the Meals tab</Text>
      </View>
    );
  }

  const renderMacroIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'carbs':
        return 'leaf-outline';
      case 'protein':
        return 'fitness-outline';
      case 'fat':
        return 'water-outline';
      case 'fiber':
        return 'nutrition-outline';
      case 'sugar':
        return 'cafe-outline';
      default:
        return 'ellipse-outline';
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.mealsContainer}>
        {sortedMeals.map((meal) => (
          <Animated.View key={meal.id} style={[
            styles.mealCard,
            expandedMealId === meal.id && styles.expandedCard
          ]}>
            <TouchableOpacity
              style={styles.mealHeader}
              onPress={() => toggleMealExpansion(meal.id)}
              activeOpacity={0.7}
            >
              <View style={styles.mealHeaderLeft}>
                <View style={styles.timeContainer}>
                  <Ionicons name="time-outline" size={Math.min(14, width * 0.035)} color="#666" style={styles.timeIcon} />
                  <Text style={styles.mealTime}>{meal.time}</Text>
                </View>
                <Text style={styles.mealName}>{meal.name}</Text>
              </View>
              <View style={styles.mealHeaderRight}>
                <View style={styles.calorieContainer}>
                  <Ionicons name="flame-outline" size={Math.min(14, width * 0.035)} color="#4CAF50" style={styles.calorieIcon} />
                  <Text style={styles.calories}>{meal.calories}</Text>
                </View>
                <Animated.View style={{ transform: [{ rotate }] }}>
                  <Ionicons name="chevron-down" size={24} color="#666" />
                </Animated.View>
              </View>
            </TouchableOpacity>

            {expandedMealId === meal.id && (
              <Animated.View 
                style={[
                  styles.expandedContent,
                  {
                    opacity: animatedHeight,
                    transform: [{
                      translateY: animatedHeight.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    }],
                  },
                ]}
              >
                <View style={styles.macrosContainer}>
                  <Text style={styles.sectionTitle}>Macronutrients</Text>
                  <View style={styles.macrosGrid}>
                    <View style={styles.macroItem}>
                      <View style={[styles.macroIconContainer, { backgroundColor: '#3DD59820' }]}>
                        <Ionicons name={renderMacroIcon('carbs')} size={20} color="#3DD598" />
                      </View>
                      <Text style={[styles.macroValue, { color: "#3DD598" }]}>{meal.carbs}g</Text>
                      <Text style={styles.macroLabel}>Carbs</Text>
                    </View>
                    <View style={styles.macroItem}>
                      <View style={[styles.macroIconContainer, { backgroundColor: '#FFB57220' }]}>
                        <Ionicons name={renderMacroIcon('protein')} size={20} color="#FFB572" />
                      </View>
                      <Text style={[styles.macroValue, { color: "#FFB572" }]}>{meal.protein}g</Text>
                      <Text style={styles.macroLabel}>Protein</Text>
                    </View>
                    <View style={styles.macroItem}>
                      <View style={[styles.macroIconContainer, { backgroundColor: '#9059FF20' }]}>
                        <Ionicons name={renderMacroIcon('fat')} size={20} color="#9059FF" />
                      </View>
                      <Text style={[styles.macroValue, { color: "#9059FF" }]}>{meal.fat}g</Text>
                      <Text style={styles.macroLabel}>Fat</Text>
                    </View>
                  </View>
                  <View style={styles.macrosGrid}>
                    <View style={styles.macroItem}>
                      <View style={[styles.macroIconContainer, { backgroundColor: '#4CD96420' }]}>
                        <Ionicons name={renderMacroIcon('fiber')} size={20} color="#4CD964" />
                      </View>
                      <Text style={[styles.macroValue, { color: "#4CD964" }]}>{meal.fiber}g</Text>
                      <Text style={styles.macroLabel}>Fiber</Text>
                    </View>
                    <View style={styles.macroItem}>
                      <View style={[styles.macroIconContainer, { backgroundColor: '#FF2D5520' }]}>
                        <Ionicons name={renderMacroIcon('sugar')} size={20} color="#FF2D55" />
                      </View>
                      <Text style={[styles.macroValue, { color: "#FF2D55" }]}>{meal.sugar}g</Text>
                      <Text style={styles.macroLabel}>Sugar</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.nutrientsContainer}>
                  <Text style={styles.sectionTitle}>Nutrients</Text>
                  <View style={styles.nutrientsGrid}>
                    {[
                      { label: 'Sodium', value: `${meal.nutrients.sodium}mg`, color: '#5AC8FA' },
                      { label: 'Calcium', value: `${meal.nutrients.calcium}mg`, color: '#007AFF' },
                      { label: 'Iron', value: `${meal.nutrients.iron}mg`, color: '#FF9500' },
                    ].map((nutrient, index) => (
                      <View key={index} style={styles.nutrientItem}>
                        <View style={[styles.nutrientBadge, { backgroundColor: `${nutrient.color}20` }]}>
                          <Text style={[styles.nutrientValue, { color: nutrient.color }]}>{nutrient.value}</Text>
                        </View>
                        <Text style={styles.nutrientLabel}>{nutrient.label}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.nutrientsGrid}>
                    {[
                      { label: 'Vitamin C', value: `${meal.nutrients.vitaminC}mg`, color: '#00C7BE' },
                      { label: 'Vitamin D', value: `${meal.nutrients.vitaminD}mcg`, color: '#AF52DE' },
                    ].map((nutrient, index) => (
                      <View key={index} style={styles.nutrientItem}>
                        <View style={[styles.nutrientBadge, { backgroundColor: `${nutrient.color}20` }]}>
                          <Text style={[styles.nutrientValue, { color: nutrient.color }]}>{nutrient.value}</Text>
                        </View>
                        <Text style={styles.nutrientLabel}>{nutrient.label}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.foodItemsContainer}>
                  <Text style={styles.sectionTitle}>Foods</Text>
                  {meal.foodItems.map((food, index) => (
                    <View key={index} style={styles.foodItem}>
                      <View style={styles.foodItemLeft}>
                        <Text style={styles.foodName}>{food.name}</Text>
                        <Text style={styles.foodDetails}>{food.servingSize}</Text>
                      </View>
                      <Text style={styles.foodCalories}>{food.calories} cal</Text>
                    </View>
                  ))}
                </View>
              </Animated.View>
            )}
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');
const cardPadding = Math.min(10, width * 0.025);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    maxWidth: '95%',
    alignSelf: 'center',
  },
  scrollContent: {
    paddingVertical: cardPadding,
  },
  mealsContainer: {
    width: '100%',
    maxWidth: '100%',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: cardPadding * 1.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: cardPadding,
    minHeight: 180,
  },
  emptyStateText: {
    fontSize: Math.min(16, width * 0.04),
    color: '#666',
    marginTop: cardPadding,
  },
  emptyStateSubtext: {
    fontSize: Math.min(13, width * 0.033),
    color: '#999',
    marginTop: cardPadding / 2,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: cardPadding / 2,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: '100%',
    maxWidth: '100%',
  },
  expandedCard: {
    elevation: 3,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: cardPadding,
    width: '100%',
    flexWrap: 'wrap',
  },
  mealHeaderLeft: {
    flex: 1,
    marginRight: cardPadding,
    flexShrink: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  timeIcon: {
    marginRight: 3,
    fontSize: Math.min(14, width * 0.035),
  },
  mealHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  calorieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: cardPadding,
  },
  calorieIcon: {
    marginRight: 3,
    fontSize: Math.min(14, width * 0.035),
  },
  mealTime: {
    fontSize: Math.min(12, width * 0.03),
    color: '#666',
  },
  mealName: {
    fontSize: Math.min(14, width * 0.035),
    fontWeight: '600',
    color: '#333',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  calories: {
    fontSize: Math.min(14, width * 0.035),
    fontWeight: '600',
    color: '#4CAF50',
  },
  expandedContent: {
    padding: cardPadding,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    width: '100%',
    maxWidth: '100%',
  },
  macrosContainer: {
    width: '100%',
    marginBottom: cardPadding * 1.2,
  },
  nutrientsContainer: {
    width: '100%',
    marginBottom: cardPadding * 1.2,
  },
  sectionTitle: {
    fontSize: Math.min(14, width * 0.035),
    fontWeight: '600',
    color: '#333',
    marginBottom: cardPadding,
  },
  macrosGrid: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: cardPadding,
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  macroValue: {
    fontSize: Math.min(13, width * 0.033),
    fontWeight: '600',
    marginBottom: 2,
  },
  macroLabel: {
    fontSize: Math.min(10, width * 0.025),
    color: '#666',
  },
  nutrientsGrid: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: cardPadding,
  },
  nutrientItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutrientBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 4,
  },
  nutrientValue: {
    fontSize: Math.min(12, width * 0.03),
    fontWeight: '600',
  },
  nutrientLabel: {
    fontSize: Math.min(10, width * 0.025),
    color: '#666',
  },
  foodItemsContainer: {
    width: '100%',
    marginTop: cardPadding,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  foodItemLeft: {
    flex: 1,
    marginRight: cardPadding,
  },
  foodName: {
    fontSize: Math.min(12, width * 0.03),
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
    flexShrink: 1,
  },
  foodDetails: {
    fontSize: Math.min(10, width * 0.025),
    color: '#666',
  },
  foodCalories: {
    fontSize: Math.min(12, width * 0.03),
    fontWeight: '600',
    color: '#4CAF50',
  },
});

export default MealsList;