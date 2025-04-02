// components/MacroSummary.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NutritionItem } from "../app/data/dailyData";

interface MacroSummaryProps {
  macros: {
    carbs: NutritionItem;
    protein: NutritionItem;
    fat: NutritionItem;
  };
}

const MacroSummary = ({ macros }: MacroSummaryProps) => {
  return (
    <View style={styles.container}>
      {Object.values(macros).map((macro, index) => {
        const percentage = Math.min((macro.current / macro.goal) * 100, 100);
        
        return (
          <View key={macro.name} style={styles.macroItem}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroName}>{macro.name}</Text>
              <Text style={styles.macroValues}>
                <Text style={{ color: macro.color, fontWeight: "700" }}>
                  {macro.current}
                </Text>
                <Text style={styles.goalText}>/{macro.goal}{macro.unit}</Text>
              </Text>
            </View>
            
            <View style={styles.progressBackground}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${percentage}%`, backgroundColor: macro.color }
                ]}
              />
            </View>
            
            <Text style={styles.remaining}>
              {macro.goal - macro.current}{macro.unit} left
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  macroItem: {
    marginBottom: 15,
  },
  macroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  macroName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  macroValues: {
    fontSize: 14,
  },
  goalText: {
    color: "#777",
  },
  progressBackground: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    marginBottom: 6,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  remaining: {
    fontSize: 12,
    color: "#777",
    textAlign: "right",
  },
});

export default MacroSummary;