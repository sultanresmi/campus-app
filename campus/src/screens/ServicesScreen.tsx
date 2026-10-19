import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ServicesScreen() {
  const services = [
    { id: 1, title: 'Library', sub: 'Access books & digital resources', icon: 'book-outline', provider: 'Ionicons' },
    { id: 2, title: 'Schedule', sub: 'View your class timetables', icon: 'calendar', provider: 'Feather' },
    { id: 3, title: 'Transport', sub: 'Check campus bus schedules', icon: 'bus-marker', provider: 'MaterialCommunityIcons' },
    { id: 4, title: 'Student Support', sub: 'Get help and advisory services', icon: 'help-circle-outline', provider: 'Ionicons' }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campus Hub</Text>
        <Text style={styles.headerSubtitle}>Services</Text>
        <Text style={styles.headerDesc}>Everything you need in one place</Text>
      </View>

      <View style={styles.gridContainer}>
        {services.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <View style={styles.iconBox}>
              {item.provider === 'Ionicons' && <Ionicons name={item.icon as any} size={26} color="#1E62DC" />}
              {item.provider === 'Feather' && <Feather name={item.icon as any} size={26} color="#1E62DC" />}
              {item.provider === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={item.icon as any} size={28} color="#1E62DC" />}
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.sub}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#1E62DC', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 25, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { color: '#E0E7FF', fontSize: 13, fontWeight: '500' },
  headerSubtitle: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginVertical: 2 },
  headerDesc: { color: '#93C5FD', fontSize: 12 },
  gridContainer: { padding: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 2, minHeight: 140, justifyContent: 'space-between' },
  iconBox: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B', marginTop: 12 },
  cardSubtitle: { fontSize: 11, color: '#64748B', marginTop: 4, lineHeight: 15 }
});
