// app/profile.tsx (Profile screen)
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const ProfileScreen = () => {
  // Sample data - replace with real data later
  const weeklyCalories = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      data: [1800, 2100, 1950, 2200, 1850, 2300, 2000]
    }]
  };

  const topFoods = [
    { name: "Grilled Chicken", count: 15, calories: 165, protein: 31 },
    { name: "Greek Yogurt", count: 12, calories: 130, protein: 12 },
    { name: "Salmon", count: 8, calories: 208, protein: 22 },
  ];

  const achievements = [
    { icon: "trophy", title: "7 Day Streak", desc: "Logged meals for 7 days" },
    { icon: "nutrition", title: "Protein Pro", desc: "Hit protein goal 5 days in a row" },
    { icon: "bar-chart", title: "Data Master", desc: "Logged 100 meals" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Ionicons name="camera" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userStats}>Goal: 2000 cal | 120g protein</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statLabel}>Days Tracked</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>89%</Text>
          <Text style={styles.statLabel}>Goal Success</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12.5k</Text>
          <Text style={styles.statLabel}>Total Calories</Text>
        </View>
      </View>

      {/* Weekly Progress Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Weekly Calories</Text>
        <LineChart
          data={weeklyCalories}
          width={Dimensions.get('window').width - 40}
          height={180}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => '#4CAF50',
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Most Eaten Foods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Most Tracked Foods</Text>
        {topFoods.map((food, index) => (
          <View key={index} style={styles.foodItem}>
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{food.name}</Text>
              <Text style={styles.foodStats}>
                {food.calories} cal | {food.protein}g protein
              </Text>
            </View>
            <View style={styles.foodCount}>
              <Text style={styles.countText}>{food.count}x</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Achievements</Text>
        <View style={styles.achievementsContainer}>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Ionicons name={achievement.icon} size={24} color="#4CAF50" />
              </View>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDesc}>{achievement.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Settings Button */}
      <TouchableOpacity style={styles.settingsButton}>
        <Ionicons name="settings-outline" size={20} color="#666" />
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  userStats: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#f0f0f0',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  chartContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  foodStats: {
    fontSize: 13,
    color: '#666',
  },
  foodCount: {
    backgroundColor: '#4CAF5020',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  achievementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementItem: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF5010',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 12,
    color: '#666',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 15,
    marginHorizontal: 15,
    marginBottom: 30,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginLeft: 8,
  },
});

export default ProfileScreen;