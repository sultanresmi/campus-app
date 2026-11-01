import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export const DetailsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { item } = route.params || {};

  const title = item?.title_kk || item?.title || 'Мәлімет';
  const description = item?.content_kk || item?.body_kk || item?.description || 'Мәтін жоқ.';
  const date = item?.date || item?.created_at || '2026 ж. 19 қазан';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Артқа</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Мәлімет</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.date}>📅 {date}</Text>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.divider} />
            <Text style={styles.description}>{description}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1d61d2',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#1d61d2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    cursor: 'pointer',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  headerPlaceholder: {
    width: 60,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  date: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginBottom: 14,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#334155',
  },
});