// components/NutrientsMissing.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { NutritionItem } from "../app/data/dailyData";

interface NutrientsMissingProps {
  nutrients: NutritionItem[];
}

const NutrientsMissing = ({ nutrients }: NutrientsMissingProps) => {
  // Sort nutrients by how far they are from their goals
  const sortedNutrients = [...nutrients].sort((a, b) => {
    const percentA = a.current / a.goal;
    const percentB = b.current / b.goal;
    return percentA - percentB;
  });
  
  // Take the top 3 most needed nutrients
  const topNeededNutrients = sortedNutrients.slice(0, 3);
  
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {topNeededNutrients.map((nutrient) => {
        const percentage = (nutrient.current / nutrient.goal) * 100;
        
        return (
          <View 
            key={nutrient.name} 
            style={styles.nutrientCard}
          >
            <View style={styles.nutrientHeader}>
              <View 
                style={[
                  styles.colorIndicator, 
                  { backgroundColor: nutrient.color }
                ]} 
              />
              <Text style={styles.nutrientName}>{nutrient.name}</Text>
            </View>
            
            <View style={styles.progressCircleContainer}>
              <View style={styles.progressCircle}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${percentage}%`, 
                      backgroundColor: nutrient.color 
                    }
                  ]} 
                />
              </View>
              <Text style={styles.percentageText}>
                {Math.round(percentage)}%
              </Text>
            </View>
            
            <View style={styles.valueContainer}>
              <Text style={styles.currentValue}>
                <Text style={{ fontWeight: "700", color: nutrient.color }}>
                  {nutrient.current}
                </Text>
                /{nutrient.goal}{nutrient.unit}
              </Text>
              <Text style={styles.remainingText}>
                {Math.round(nutrient.goal - nutrient.current)}{nutrient.unit} left
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 8,
    paddingTop: 2,
  },
  nutrientCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginRight: 12,
    width: 160,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  nutrientHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  nutrientName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  progressCircleContainer: {
    marginVertical: 10,
  },
  progressCircle: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 12,
    color: "#777",
    textAlign: "right",
  },
  valueContainer: {
    marginTop: 4,
  },
  currentValue: {
    fontSize: 14,
    marginBottom: 2,
  },
  remainingText: {
    fontSize: 12,
    color: "#777",
  },
});

export default NutrientsMissing;