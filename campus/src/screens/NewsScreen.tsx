// src/screens/NewsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button, RefreshControl } from 'react-native';
import { getAnnouncements } from '../api/announcements';
import { Announcement } from '../types/announcement';
import { AnnouncementCard } from '../components/AnnouncementCard';

export default function NewsScreen({ navigation }: any) {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setError(null);
      const data = await getAnnouncements();
      setItems(data);
    } catch (e: any) {
      setError('Деректерді жүктеу мүмкін болмады');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  return (
    <View style={styles.container}>
      {/* Шапка всегда на месте */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campus Hub</Text>
        <Text style={styles.headerSubtitle}>Жаңалықтар</Text>
      </View>

      {/* Проверка состояний внутри контента — навигация снизу не пропадет! */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1E62DC" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Қайталау" onPress={loadData} color="#1E62DC" />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AnnouncementCard 
              item={item} 
              onPress={() => navigation.navigate('NewsDetails', { announcementId: item.id })} 
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1E62DC']} />
          }
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 20 },
  header: { backgroundColor: '#1E62DC', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 25, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 16 },
  headerTitle: { color: '#E0E7FF', fontSize: 13, fontWeight: '500' },
  headerSubtitle: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginTop: 2 },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  errorText: { color: '#EF4444', marginBottom: 12, fontSize: 14, fontWeight: '500', textAlign: 'center' }
});
