import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export interface AnnouncementItem {
  id: string | number;
  title?: string;
  title_kk?: string;
  description?: string;
  content_kk?: string;
  body_kk?: string;
  date?: string;
  created_at?: string;
}

interface AnnouncementCardProps {
  item?: AnnouncementItem;
  title?: string;
  description?: string;
  date?: string;
  onPress?: () => void;
}

// Иконка календаря из Icons8
const CALENDAR_ICON = 'https://img.icons8.com/color/48/calendar--v1.png';

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  item,
  title,
  description,
  date,
  onPress,
}) => {
  const { colors, fontScale } = useTheme();

  const cardTitle = title || item?.title_kk || item?.title || 'Хабарландыру';
  const cardDesc = description || item?.content_kk || item?.body_kk || item?.description || '';
  const cardDate = date || item?.date || item?.created_at || '2026 ж. 19 қазан';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary, fontSize: 16 * fontScale }]}>
          {cardTitle}
        </Text>
        {Boolean(cardDesc) && (
          <Text
            style={[styles.description, { color: colors.textSecondary, fontSize: 13 * fontScale }]}
            numberOfLines={2}
          >
            {cardDesc}
          </Text>
        )}
        <View style={styles.dateRow}>
          <Image source={{ uri: CALENDAR_ICON }} style={styles.dateIcon} />
          <Text style={[styles.date, { color: colors.textSecondary, fontSize: 12 * fontScale }]}>
            {cardDate}
          </Text>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    cursor: 'pointer',
  },
  content: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    lineHeight: 18,
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  date: {},
  arrowContainer: {
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 22,
    color: '#94a3b8',
  },
});