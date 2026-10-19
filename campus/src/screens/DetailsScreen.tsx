import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props) {
  const { serviceId, title } = route.params; //

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>ID: {serviceId}</Text>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Артқа</Text>
      </Pressable>
    </View>
  ); //
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  backButton: { marginTop: 20, padding: 10, backgroundColor: 'gray', borderRadius: 5 },
  backText: { color: 'white' }
});
