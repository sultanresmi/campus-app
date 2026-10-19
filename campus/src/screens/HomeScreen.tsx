import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Шапка профиля */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Good morning,</Text>
          <Text style={styles.nameText}>Amina S.</Text>
          <Text style={styles.subGreeting}>Welcome back! It's happening at Campus</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Feather name="bell" size={24} color="#fff" />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Секция Announcements */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>University Announcements</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See all</Text></TouchableOpacity>
        </View>

        {/* Карточка 1 */}
        <View style={styles.announcementCard}>
          <Image 
            source={{ uri: 'https://unsplash.com' }} 
            style={styles.cardImage} 
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cardCategory}>News / General</Text>
            <Text style={styles.cardTitle}>Spring Semester Registration Meet 2024</Text>
            <Text style={styles.cardDate}>Mar 15, 2024</Text>
          </View>
        </View>

        {/* Карточка 2 */}
        <View style={styles.announcementCard}>
          <Image 
            source={{ uri: 'https://unsplash.com' }} 
            style={styles.cardImage} 
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cardCategory}>Career Hub</Text>
            <Text style={styles.cardTitle}>Career Fair 2024: Top Companies</Text>
            <Text style={styles.cardDate}>Mar 18, 2024</Text>
          </View>
        </View>

        {/* Карточка 3 */}
        <View style={styles.announcementCard}>
          <Image 
            source={{ uri: 'https://unsplash.com' }} 
            style={styles.cardImage} 
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cardCategory}>Library Updates</Text>
            <Text style={styles.cardTitle}>Library Extended Hours</Text>
            <Text style={styles.cardDate}>Mar 19, 2024</Text>
          </View>
        </View>

        {/* Секция Quick Access */}
        <Text style={styles.sectionTitleQuick}>Quick Access</Text>
        <View style={styles.quickAccessRow}>
          <View style={styles.quickItem}>
            <View style={styles.quickIconContainer}>
              <MaterialCommunityIcons name="google-class" size={24} color="#1E62DC" />
            </View>
            <Text style={styles.quickText}>LMS</Text>
          </View>
          <View style={styles.quickItem}>
            <View style={styles.quickIconContainer}>
              <Feather name="calendar" size={24} color="#1E62DC" />
            </View>
            <Text style={styles.quickText}>Schedule</Text>
          </View>
          <View style={styles.quickItem}>
            <View style={styles.quickIconContainer}>
              <FontAwesome5 name="bus" size={22} color="#1E62DC" />
            </View>
            <Text style={styles.quickText}>Transport</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Пакет иконок FontAwesome5 для удобства
import { FontAwesome5 } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#1E62DC', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 25, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, flexDirection: 'row', justifyContent: 'between', alignItems: 'center' },
  greetingText: { color: '#E0E7FF', fontSize: 14 },
  nameText: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', marginVertical: 2 },
  subGreeting: { color: '#93C5FD', fontSize: 12 },
  notificationButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start', marginTop: 5 },
  badge: { position: 'absolute', top: 10, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' },
  content: { padding: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  seeAllText: { color: '#1E62DC', fontSize: 13, fontWeight: '600' },
  announcementCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  cardImage: { width: 75, height: 75, borderRadius: 12 },
  cardDetails: { flex: 1, marginLeft: 14, justifyContent: 'space-between' },
  cardCategory: { color: '#64748B', fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  cardTitle: { color: '#1E293B', fontSize: 13, fontWeight: '600', lineHeight: 18 },
  cardDate: { color: '#94A3B8', fontSize: 11 },
  sectionTitleQuick: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginTop: 15, marginBottom: 15 },
  quickAccessRow: { flexDirection: 'row', justifyContent: 'space-between' },
  quickItem: { alignItems: 'center', width: '30%' },
  quickIconContainer: { width: 54, height: 54, borderRadius: 16, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  quickText: { fontSize: 12, fontWeight: '500', color: '#475569' }
});
