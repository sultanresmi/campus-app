// src/components/AnnouncementCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Announcement } from '../types/announcement';

type Props = {
  item: Announcement;
  onPress: () => void;
};

export function AnnouncementCard({ item, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={14} color="#1E62DC" />
            <Text style={styles.dateText}>2026 ж. 19 қазан</Text> 
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#94A3B8" style={styles.arrow} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  cardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  textContainer: { flex: 1, paddingRight: 8 },
  title: { fontSize: 15, fontWeight: '700', color: '#1E293B', textTransform: 'capitalize', marginBottom: 4 },
  body: { fontSize: 12, color: '#64748B', lineHeight: 16 },
  dateContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  dateText: { fontSize: 11, color: '#94A3B8', marginLeft: 6 },
  arrow: { marginLeft: 8 }
});
