import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export function ProfilePhoto() {
  const { colors, fontScale, isDarkMode } = useTheme();

  const [uri, setUri] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [settings, setSettings] = useState(false);

  async function choosePhoto(source: 'camera' | 'gallery') {
    if (busy) return;
    setBusy(true);
    setMessage('');
    setSettings(false);

    try {
      // 1. Егер веб-браузерде ашылып тұрса (компьютерде)
      if (Platform.OS === 'web') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

        if (result.canceled) return;

        const asset = result.assets[0];
        if (asset) {
          if (asset.fileSize && asset.fileSize > 5 * 1024 * 1024) {
            setMessage('Файл көлемі 5 МБ-тан аспауы тиіс');
            return;
          }
          setUri(asset.uri);
        }
        return;
      }

      // 2. Нақты телефонда (Android/iOS) жұмыс істеуі:
      if (source === 'camera') {
        // Камераға рұқсат алу
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        
        if (!permission.granted) {
          setMessage('Камераға рұқсат берілмеді. Баптаулардан рұқсат беріңіз.');
          setSettings(!permission.canAskAgain);
          return;
        }

        // Камераны ашу
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

        if (result.canceled) return;

        const asset = result.assets[0];
        if (asset) {
          if (asset.fileSize && asset.fileSize > 5 * 1024 * 1024) {
            setMessage('Файл көлемі 5 МБ-тан аспауы тиіс');
            return;
          }
          setUri(asset.uri);
        }
      } else {
        // Галереядан таңдау
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

        if (result.canceled) return;

        const asset = result.assets[0];
        if (asset) {
          if (asset.fileSize && asset.fileSize > 5 * 1024 * 1024) {
            setMessage('Файл көлемі 5 МБ-тан аспауы тиіс');
            return;
          }
          setUri(asset.uri);
        }
      }
    } catch (error) {
      console.error('Фото операциясының қатесі:', error);
      setMessage('Камераны немесе фотоны ашу мүмкін болмады');
    } finally {
      setBusy(false);
    }
  }

  function handleRemovePhoto() {
    if (Platform.OS === 'web') {
      if (window.confirm('Профиль фотосын жоюды растайсыз ба?')) {
        setUri(null);
        setMessage('');
      }
    } else {
      Alert.alert('Фотоны жою', 'Профиль фотосын өшіргіңіз келе ме?', [
        { text: 'Бас тарту', style: 'cancel' },
        {
          text: 'Жою',
          style: 'destructive',
          onPress: () => {
            setUri(null);
            setMessage('');
          },
        },
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        {uri ? (
          <Image
            source={{ uri }}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.avatarPlaceholder,
              { backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' },
            ]}
          >
            <Ionicons name="person" size={54} color="#64748b" />
          </View>
        )}
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: colors.cardBackground, borderColor: colors.border },
            busy && styles.disabledButton,
          ]}
          disabled={busy}
          onPress={() => void choosePhoto('gallery')}
          activeOpacity={0.7}
        >
          <View style={styles.btnInner}>
            <Ionicons name="images-outline" size={15} color={colors.textPrimary} />
            <Text style={[styles.buttonText, { color: colors.textPrimary, fontSize: 13 * fontScale }]}>
              Фото таңдау
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: colors.cardBackground, borderColor: colors.border },
            busy && styles.disabledButton,
          ]}
          disabled={busy}
          onPress={() => void choosePhoto('camera')}
          activeOpacity={0.7}
        >
          <View style={styles.btnInner}>
            <Ionicons name="camera-outline" size={15} color={colors.textPrimary} />
            <Text style={[styles.buttonText, { color: colors.textPrimary, fontSize: 13 * fontScale }]}>
              Фото түсіру
            </Text>
          </View>
        </TouchableOpacity>

        {Boolean(uri) && (
          <TouchableOpacity
            style={[styles.actionButton, styles.removeButton, busy && styles.disabledButton]}
            disabled={busy}
            onPress={handleRemovePhoto}
            activeOpacity={0.7}
          >
            <View style={styles.btnInner}>
              <Ionicons name="trash-outline" size={15} color="#ef4444" />
              <Text style={[styles.removeButtonText, { fontSize: 13 * fontScale }]}>
                Жою
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {Boolean(message) && (
        <Text style={[styles.messageText, { fontSize: 12 * fontScale }]}>
          {message}
        </Text>
      )}

      {settings && (
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            void Linking.openSettings();
          }}
        >
          <Text style={[styles.settingsButtonText, { fontSize: 13 * fontScale }]}>
            Баптауларға өту
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarImage: {
    width: 96,
    height: 96,
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  actionButton: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    cursor: 'pointer',
  },
  btnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  buttonText: {
    fontWeight: '600',
  },
  removeButton: {
    backgroundColor: '#fee2e2',
    borderColor: '#fca5a5',
  },
  removeButtonText: {
    color: '#ef4444',
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  messageText: {
    color: '#ef4444',
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  settingsButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
  },
  settingsButtonText: {
    color: '#1d61d2',
    fontWeight: '600',
  },
});