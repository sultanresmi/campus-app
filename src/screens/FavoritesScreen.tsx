import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  getSavedPosts,
  toggleRead,
  removeSaved,
  SavedPost,
} from '../database/favorites';
import { useTheme } from '../context/ThemeContext';

export function FavoritesScreen() {
  const { colors, fontScale, isDarkMode } = useTheme();

  const [items, setItems] = useState<SavedPost[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const locked = useRef(false);

  // Экран ашылған сайын деректер қорын оқу
  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);
      setError('');

      getSavedPosts()
        .then((rows) => {
          if (active) setItems(rows);
        })
        .catch(() => {
          if (active) setError('Оқу қатесі');
        })
        .finally(() => {
          if (active) setLoading(false);
        });

      return () => {
        active = false;
      };
    }, [])
  );

  // Өзгерістен кейін тізімді жаңарту
  async function reloadAfterChange() {
    try {
      const data = await getSavedPosts();
      setItems(data);
    } catch {
      setError('Өзгеріс сақталды. Тізімді жаңарту үшін қайта кіріңіз.');
    }
  }

  // Әрекетті орындау (бұғаттау арқылы қатар басылудан қорғау)
  async function change(action: () => Promise<void>) {
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    setError('');

    try {
      await action();
    } catch (e) {
      console.error('Операция қатесі:', e);
      setError('Өзгерту қатесі');
      locked.current = false;
      setBusy(false);
      return;
    }

    await reloadAfterChange();
    locked.current = false;
    setBusy(false);
  }

  // ЖОЮДЫ РАСТАУ: Браузерде (Web) және Телефонда (iOS/Android) бірдей жұмыс істейді
  function confirmRemove(id: number) {
    const targetId = Number(id);

    if (Platform.OS === 'web') {
      // Браузер үшін стандартты confirm қолданылады
      const confirmed = window.confirm('Жазбаны өшіруді растайсыз ба? Офлайн көшірме жойылады.');
      if (confirmed) {
        void change(() => removeSaved(targetId));
      }
    } else {
      // Телефон (iOS/Android) үшін React Native Alert диалогы
      Alert.alert(
        'Жазбаны жою?',
        'Офлайн көшірме базадан өшіріледі.',
        [
          { text: 'Бас тарту', style: 'cancel' },
          {
            text: 'Жою',
            style: 'destructive',
            onPress: () => {
              void change(() => removeSaved(targetId));
            },
          },
        ]
      );
    }
  }

  // Карточка және батырмаларды бейнелеу
  function renderSaved({ item }: { item: SavedPost }) {
    const isButtonsDisabled = busy || loading || !!error;

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
        <View style={styles.cardHeader}>
          <Text
            style={[
              styles.cardTitle,
              { color: colors.textPrimary, fontSize: 16 * fontScale },
            ]}
          >
            {item.title}
          </Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: item.isRead
                  ? isDarkMode ? '#064e3b' : '#dcfce7'
                  : isDarkMode ? '#78350f' : '#fef3c7',
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: item.isRead ? '#10b981' : '#f59e0b',
                  fontSize: 11 * fontScale,
                },
              ]}
            >
              {item.isRead ? '✓ Оқылды' : '● Оқылмаған'}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.cardBody,
            { color: colors.textSecondary, fontSize: 14 * fontScale },
          ]}
        >
          {item.body}
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.toggleButton,
              isButtonsDisabled && styles.disabledButton,
            ]}
            disabled={isButtonsDisabled}
            onPress={() => {
              void change(() => toggleRead(Number(item.id)));
            }}
          >
            <Text style={[styles.actionButtonText, { fontSize: 13 * fontScale }]}>
              {item.isRead ? 'Оқылмаған ету' : 'Оқылды деп белгілеу'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.deleteButton,
              isButtonsDisabled && styles.disabledButton,
            ]}
            disabled={isButtonsDisabled}
            onPress={() => confirmRemove(Number(item.id))}
          >
            <Text style={[styles.deleteButtonText, { fontSize: 13 * fontScale }]}>
              Жою
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Тізім бос болған кезде көрсетілетін блок
  const renderEmptyComponent = () => {
    if (loading || error) {
      return undefined;
    }
    return (
      <View style={styles.centerBox}>
        <Text style={styles.emptyIcon}>⭐</Text>
        <Text
          style={[
            styles.infoText,
            { color: colors.textSecondary, fontSize: 15 * fontScale },
          ]}
        >
          Сақталған хабарландыру жоқ
        </Text>
        <Text
          style={[
            styles.emptyHint,
            { color: colors.textSecondary, fontSize: 12 * fontScale },
          ]}
        >
          Басты бетке өтіп, «Офлайн сақтау» батырмасын басыңыз
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.headerBackground }]}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View
          style={[styles.header, { backgroundColor: colors.headerBackground }]}
        >
          <Text style={[styles.headerSubtitle, { fontSize: 13 * fontScale }]}>
            SQLite Базасы
          </Text>
          <Text style={[styles.headerTitle, { fontSize: 24 * fontScale }]}>
            Таңдаулылар (Офлайн)
          </Text>
        </View>

        {loading && (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text
              style={[
                styles.infoText,
                { color: colors.textSecondary, fontSize: 14 * fontScale },
              ]}
            >
              Жүктелуде…
            </Text>
          </View>
        )}

        {!!error && (
          <View style={styles.errorBox}>
            <Text style={[styles.errorText, { fontSize: 14 * fontScale }]}>
              {error}
            </Text>
          </View>
        )}

        <FlatList
          contentContainerStyle={styles.listContent}
          data={items}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={renderEmptyComponent()}
          renderItem={renderSaved}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerSubtitle: {
    color: '#bfdbfe',
    fontWeight: '600',
    marginBottom: 4,
  },
  headerTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 10,
  },
  cardTitle: {
    flex: 1,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontWeight: '700',
  },
  cardBody: {
    lineHeight: 20,
    marginBottom: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    cursor: 'pointer',
  },
  toggleButton: {
    backgroundColor: '#eff6ff',
  },
  actionButtonText: {
    color: '#1d61d2',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
  },
  deleteButtonText: {
    color: '#ef4444',
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  centerBox: {
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  infoText: {
    fontWeight: '500',
    marginTop: 6,
  },
  emptyHint: {
    marginTop: 4,
  },
  errorBox: {
    padding: 12,
    margin: 16,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
  },
  errorText: {
    color: '#dc2626',
    fontWeight: '600',
    textAlign: 'center',
  },
});