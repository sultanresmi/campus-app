import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!login.trim() || password.length < 6) {
      Alert.alert('Қате', 'Логинді және кемінде 6 таңбалы құпиясөзді енгізіңіз'); //
      return;
    }
    navigation.replace('Main'); //
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Логин" value={login} onChangeText={setLogin} style={styles.input} />
      <TextInput placeholder="Құпиясөз" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Кіру" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 }
});
