import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AnnouncementCard, AnnouncementItem } from '../components/AnnouncementCard';
import { useTheme } from '../context/ThemeContext';

const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: '1',
    title_kk: 'Көктемгі Семестр Басталады',
    content_kk: 'Оқу кестесі және маңызды ақпаратпен танысыңыз. Барлық студенттердің сабаққа қатысуы міндетті.',
    date: '2026 ж. 19 қазан',
  },
  {
    id: '2',
    title_kk: 'Стипендиялық Бағдарламалар Ашылды',
    content_kk: 'Өтінім қабылдау басталды. Мүмкіндікті жіберіп алмаңыз және құжаттарды уақытылы тапсырыңыз.',
    date: '2026 ж. 19 қазан',
  },
  {
    id: '3',
    title_kk: 'Студенттік Форум – 2025',
    content_kk: 'Идеялар, тәжірибе және жаңа таныстықтар. Форум бас ғимараттың мәжіліс залында өтеді.',
    date: '2026 ж. 19 қазан',
  },
  {
    id: '4',
    title_kk: 'Кампус Инфрақұрылымы Жаңарады',
    content_kk: 'Жаңа оқу кеңістіктері мен демалыс аймақтары ашылады. Студенттер үйінде жөндеу жұмыстары аяқталды.',
    date: '2026 ж. 19 қазан',
  },
  {
    id: '5',
    title_kk: 'Халықаралық Тағылымдама',
    content_kk: 'Сыртқы академиялық ұтқырлық бағдарламасы бойынша конкурстық іріктеу басталғанын хабарлаймыз.',
    date: '2026 ж. 19 қазан',
  },
  {
    id: '6',
    title_kk: 'Ғылыми Жобалар Байқауы',
    content_kk: 'Университет ішілік жас ғалымдар мен студенттердің үздік инновациялық идеяларына гранттар беріледі.',
    date: '2026 ж. 19 қазан',
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [announcements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  const { colors, fontScale } = useTheme();

  const handleCardPress = (item: AnnouncementItem) => {
    try {
      navigation.navigate('NewsDetailsScreen', { item });
    } catch {
      navigation.navigate('DetailsScreen', { item });
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.headerBackground }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
          <Text style={[styles.headerSubtitle, { fontSize: 13 * fontScale }]}>Campus Hub</Text>
          <Text style={[styles.headerTitle, { fontSize: 24 * fontScale }]}>Жаңалықтар</Text>
        </View>

        <FlatList
          data={announcements}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <AnnouncementCard
              item={item}
              onPress={() => handleCardPress(item)}
            />
          )}
        />
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
  listContent: {
    paddingVertical: 12,
  },
});