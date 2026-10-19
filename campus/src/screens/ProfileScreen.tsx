import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const menuItems = [
    { id: 1, title: 'Personal Information', icon: 'person-outline' },
    { id: 2, title: 'Notifications', icon: 'notifications-outline' },
    { id: 3, title: 'App Settings', icon: 'settings-outline' },
    { id: 4, title: 'Help & Support', icon: 'help-circle-outline' },
    { id: 5, title: 'Log Out', icon: 'log-out-outline', isDanger: true },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Верхняя синяя карточка профиля */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campus Hub</Text>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Feather name="user" size={44} color="#1E62DC" />
          </View>
        </View>
        <Text style={styles.profileName}>Amina S.</Text>
        <Text style={styles.profileId}>Group CS-2024</Text>
      </View>

      {/* Меню настроек */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconWrapper, item.isDanger && styles.dangerIconWrapper]}>
                <Ionicons 
                  name={item.icon as any} 
                  size={20} 
                  color={item.isDanger ? '#EF4444' : '#475569'} 
                />
              </View>
              <Text style={[styles.menuItemText, item.isDanger && styles.dangerText]}>
                {item.title}
              </Text>
            </View>
            <Feather 
              name="chevron-right" 
              size={18} 
              color={item.isDanger ? '#FCA5A5' : '#94A3B8'} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#1E62DC', paddingTop: 60, paddingBottom: 30, alignItems: 'center', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { color: '#E0E7FF', fontSize: 13, fontWeight: '500', alignSelf: 'flex-start', paddingHorizontal: 20, marginBottom: 10 },
  avatarContainer: { marginVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  avatarPlaceholder: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  profileName: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginTop: 8 },
  profileId: { color: '#93C5FD', fontSize: 12, marginTop: 2 },
  menuContainer: { paddingHorizontal: 20, paddingTop: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 14, borderRadius: 16, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 2, elevation: 1 },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  iconWrapper: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  dangerIconWrapper: { backgroundColor: '#FEE2E2' },
  menuItemText: { fontSize: 14, fontWeight: '500', color: '#1E293B' },
  dangerText: { color: '#EF4444' }
});
