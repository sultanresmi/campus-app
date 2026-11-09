import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export const ServicesScreen = () => {
  const navigation = useNavigation<any>();
  const { colors, fontScale, isDarkMode } = useTheme();

  const services = [
    {
      id: 'reg',
      title: 'Іс-шараға тіркелу',
      desc: 'Зертханалық №9 формасы',
      iconName: 'clipboard-outline' as const,
      iconColor: '#3b82f6',
      route: 'EventRegistrationScreen',
    },
    {
      id: '1',
      title: 'Оқу кестесі',
      desc: 'Сабақ және емтихан кестелері',
      iconName: 'calendar-outline' as const,
      iconColor: '#10b981',
    },
    {
      id: '2',
      title: 'Транскрипт',
      desc: 'Бағалар мен GPA көрсеткіші',
      iconName: 'school-outline' as const,
      iconColor: '#f59e0b',
    },
    {
      id: '3',
      title: 'Кітапхана',
      desc: 'Электронды оқулықтар мен кітаптар',
      iconName: 'book-outline' as const,
      iconColor: '#8b5cf6',
    },
    {
      id: '4',
      title: 'Студенттер үйі',
      desc: 'Жатақханаға өтінім беру',
      iconName: 'business-outline' as const,
      iconColor: '#ec4899',
    },
    {
      id: '5',
      title: 'Анықтама алу',
      desc: 'Оқу орнынан ресми анықтама',
      iconName: 'document-text-outline' as const,
      iconColor: '#06b6d4',
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.headerBackground }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
          <Text style={[styles.headerSubtitle, { fontSize: 13 * fontScale }]}>Campus Hub</Text>
          <Text style={[styles.headerTitle, { fontSize: 24 * fontScale }]}>Сервистер</Text>
        </View>

        <ScrollView contentContainerStyle={styles.grid}>
          {services.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.serviceCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: item.route ? colors.primary : colors.border,
                  borderWidth: item.route ? 1.5 : 1,
                },
              ]}
              onPress={() => {
                if (item.route) {
                  navigation.navigate(item.route);
                } else {
                  Alert.alert(item.title, `${item.title} қызметі жақында іске қосылады.`);
                }
              }}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9' },
                ]}
              >
                <Ionicons name={item.iconName} size={28} color={item.iconColor} />
              </View>
              <Text style={[styles.serviceTitle, { color: colors.textPrimary, fontSize: 15 * fontScale }]}>
                {item.title}
              </Text>
              <Text style={[styles.serviceDesc, { color: colors.textSecondary, fontSize: 12 * fontScale }]}>
                {item.desc}
              </Text>
            </TouchableOpacity>
          ))}
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
  grid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  serviceCard: {
    width: '48%',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
    cursor: 'pointer',
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  serviceDesc: {
    textAlign: 'center',
    lineHeight: 16,
  },
});