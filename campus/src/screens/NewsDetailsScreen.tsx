// src/screens/NewsDetailsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, ScrollView } from 'react-native';
import { getAnnouncement } from '../api/announcements';
import { Announcement } from '../types/announcement';

export default function NewsDetailsScreen({ route, navigation }: any) {
  // Получаем ID выбранной новости из параметров навигации
  const { announcementId } = route.params;

  // Состояния для хранения данных, загрузки и ошибок
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Вызов API встроен внутрь useEffect для предотвращения ошибок зависимостей ESLint
  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAnnouncement(announcementId);
        setAnnouncement(data);
      } catch (e) {
        setError('Деректерді жүктеу қатесі');
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [announcementId]);

  // Экран загрузки (Индикатор)
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1E62DC" />
      </View>
    );
  }

  // Экран ошибки, если запрос не удался
  if (error || !announcement) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error || 'Хабарландыру табылмады'}</Text>
        <Button title="Қайта жүктеу" onPress={() => navigation.goBack()} color="#1E62DC" />
      </View>
    );
  }

  // Основной контент страницы после успешной загрузки
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{announcement.title}</Text>
      <Text style={styles.body}>{announcement.body}</Text>
      
      <View style={styles.footerButton}>
        <Button 
          title="Артқа қайту" 
          onPress={() => navigation.goBack()} 
          color="#64748B" 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC' 
  },
  content: { 
    padding: 20, 
    paddingTop: 40 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F8FAFC' 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1E293B', 
    marginBottom: 16, 
    textTransform: 'capitalize', 
    lineHeight: 26 
  },
  body: { 
    fontSize: 14, 
    color: '#475569', 
    lineHeight: 22 
  },
  errorText: { 
    color: '#EF4444', 
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '500'
  },
  footerButton: { 
    marginTop: 40 
  }
});
