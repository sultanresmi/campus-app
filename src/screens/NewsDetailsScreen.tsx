import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const CALENDAR_ICON = 'https://img.icons8.com/color/48/calendar--v1.png';

export const NewsDetailsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { colors, fontScale } = useTheme();
  const { item } = route.params || {};

  const title = item?.title_kk || item?.title || 'Хабарландыру мәліметі';
  const description = item?.content_kk || item?.body_kk || item?.description || 'Толық мәтін берілмеген.';
  const date = item?.date || item?.created_at || '2026 ж. 19 қазан';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.headerBackground }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Артқа</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { fontSize: 17 * fontScale }]}>Толық ақпарат</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <View style={styles.dateBadge}>
              <Image source={{ uri: CALENDAR_ICON }} style={styles.dateIcon} />
              <Text style={[styles.dateText, { fontSize: 12 * fontScale }]}>{date}</Text>
            </View>
            <Text style={[styles.title, { color: colors.textPrimary, fontSize: 20 * fontScale }]}>{title}</Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.description, { color: colors.textSecondary, fontSize: 15 * fontScale }]}>
              {description}
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
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
    fontWeight: '700',
  },
  headerPlaceholder: {
    width: 60,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
    gap: 6,
  },
  dateIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  dateText: {
    color: '#64748b',
    fontWeight: '500',
  },
  title: {
    fontWeight: '700',
    lineHeight: 28,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  description: {
    lineHeight: 24,
  },
});