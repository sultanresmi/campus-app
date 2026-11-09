import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  onSaveOffline?: () => void;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  item,
  title,
  description,
  date,
  onPress,
  onSaveOffline,
}) => {
  const { colors, fontScale } = useTheme();

  const cardTitle = title || item?.title_kk || item?.title || 'Хабарландыру';
  const cardDesc = description || item?.content_kk || item?.body_kk || item?.description || '';
  const cardDate = date || item?.date || item?.created_at || '2026 ж. 19 қазан';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.cardTopRow}
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
            <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
            <Text style={[styles.date, { color: colors.textSecondary, fontSize: 12 * fontScale }]}>
              {cardDate}
            </Text>
          </View>
        </View>
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
        </View>
      </TouchableOpacity>

      {Boolean(onSaveOffline) && (
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <TouchableOpacity
            style={styles.saveOfflineBtn}
            onPress={onSaveOffline}
            activeOpacity={0.8}
          >
            <View style={styles.btnInner}>
              <Ionicons name="bookmark-outline" size={15} color="#1d61d2" />
              <Text style={[styles.saveOfflineBtnText, { fontSize: 13 * fontScale }]}>
                Офлайн сақтау (SQLite)
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  cardTopRow: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  date: {},
  arrowContainer: {
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.015)',
    alignItems: 'flex-end',
  },
  saveOfflineBtn: {
    backgroundColor: '#eff6ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    cursor: 'pointer',
  },
  btnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  saveOfflineBtnText: {
    color: '#1d61d2',
    fontWeight: '600',
  },
});