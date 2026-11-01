import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const ServicesScreen = () => {
  const { colors, fontScale, isDarkMode } = useTheme();

  // Коллекция цветных иконок из Icons8
  const services = [
    {
      id: '1',
      title: 'Оқу кестесі',
      iconUri: 'https://img.icons8.com/fluency/96/calendar-11.png',
      desc: 'Сабақ және емтихан кестелері',
    },
    {
      id: '2',
      title: 'Транскрипт',
      iconUri: 'https://img.icons8.com/fluency/96/diploma.png',
      desc: 'Бағалар мен GPA көрсеткіші',
    },
    {
      id: '3',
      title: 'Кітапхана',
      iconUri: 'https://img.icons8.com/fluency/96/books.png',
      desc: 'Электронды оқулықтар мен кітаптар',
    },
    {
      id: '4',
      title: 'Студенттер үйі',
      iconUri: 'https://img.icons8.com/fluency/96/dormitory.png',
      desc: 'Жатақханаға өтінім беру',
    },
    {
      id: '5',
      title: 'Анықтама алу',
      iconUri: 'https://img.icons8.com/fluency/96/certificate.png',
      desc: 'Оқу орнынан ресми анықтама',
    },
    {
      id: '6',
      title: 'Төлемдер',
      iconUri: 'https://img.icons8.com/fluency/96/bank-card-back-side.png',
      desc: 'Оқу ақысын онлайн төлеу',
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
                  borderColor: colors.border,
                },
              ]}
              onPress={() => Alert.alert(item.title, `${item.title} қызметі жақында іске қосылады.`)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: isDarkMode ? '#334155' : '#eff6ff' }]}>
                <Image source={{ uri: item.iconUri }} style={styles.serviceIcon} />
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
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
    cursor: 'pointer',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIcon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
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