import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

// Типы из 3-го шага презентации
type EventType = 'Хакатон' | 'Семинар' | 'Шеберлік сабағы' | '';

type FormErrors = {
  fullName?: string;
  group?: string;
  eventType?: string;
  eventDate?: string;
  participants?: string;
  comment?: string;
  accepted?: string;
};

const eventTypes = ['Хакатон', 'Семинар', 'Шеберлік сабағы'] as const;

// Проверка реальной даты из 8-го шага
function isRealDate(value: string): boolean {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function EventRegistrationScreen() {
  const navigation = useNavigation<any>();
  const { colors, fontScale } = useTheme();

  // 7 состояний формы из 4-го шага
  const [fullName, setFullName] = useState('');
  const [group, setGroup] = useState('');
  const [eventType, setEventType] = useState<EventType>('');
  const [eventDate, setEventDate] = useState('');
  const [participants, setParticipants] = useState('1');
  const [comment, setComment] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Алгоритм валидации (шаги 5, 6, 7, 9, 10)
  function validate(): FormErrors {
    const next: FormErrors = {};

    // 1. Аты-жөні
    if (fullName.trim().length < 3) {
      next.fullName = 'Кемінде 3 таңба енгізіңіз';
    }

    // 2. Топ
    if (!group.trim()) {
      next.group = 'Топ атауын енгізіңіз';
    }

    // 3. Іс-шара түрі
    if (!eventType) {
      next.eventType = 'Іс-шара түрін таңдаңыз';
    }

    // 4. Күн форматы мен логикасы (ЖЖЖЖ-АА-КК)
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(eventDate)) {
      next.eventDate = 'Формат: ЖЖЖЖ-АА-КК (мысалы, 2026-11-15)';
    } else if (!isRealDate(eventDate)) {
      next.eventDate = 'Мұндай күн жоқ';
    } else {
      const selected = new Date(eventDate + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        next.eventDate = 'Өткен күнді таңдауға болмайды';
      }
    }

    // 5. Қатысушылар саны (1-5 аралығындағы бүтін сан)
    const count = Number(participants);
    if (!Number.isInteger(count) || count < 1 || count > 5) {
      next.participants = '1-ден 5-ке дейін бүтін сан енгізіңіз';
    }

    // 6. Түсіндірме (кемінде 10 таңба)
    const cleanComment = comment.trim();
    if (cleanComment.length < 10) {
      next.comment = 'Кемінде 10 таңба енгізіңіз';
    }

    // 7. Келісім
    if (!accepted) {
      next.accepted = 'Ережелермен келісу қажет';
    }

    return next;
  }

  // Обработчик отправки (шаг 11)
  function handleSubmit() {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    Alert.alert('Дайын', 'Іс-шараға тіркелу сәтті аяқталды', [
      {
        text: 'OK',
        onPress: () => {
          // Очистка формы после успешной отправки
          setFullName('');
          setGroup('');
          setEventType('');
          setEventDate('');
          setParticipants('1');
          setComment('');
          setAccepted(false);
          setErrors({});
          navigation.goBack();
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.headerBackground }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Артқа</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { fontSize: 17 * fontScale }]}>
            Іс-шараға тіркелу
          </Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView contentContainerStyle={styles.screen}>
          <Text style={[styles.title, { color: colors.textPrimary, fontSize: 24 * fontScale }]}>
            Тіркелу формасы
          </Text>

          {/* 1. Аты-жөні */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.textPrimary, fontSize: 15 * fontScale }]}>
              Аты-жөні
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.cardBackground, color: colors.textPrimary, borderColor: colors.border },
                errors.fullName && styles.inputError,
              ]}
              value={fullName}
              onChangeText={(value) => {
                setFullName(value);
                setErrors((cur) => ({ ...cur, fullName: undefined }));
              }}
              placeholder="Аты-жөніңізді енгізіңіз (мыс: Айша Серік)"
              placeholderTextColor="#94a3b8"
              maxLength={80}
            />
            {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}
          </View>

          {/* 2. Топ */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.textPrimary, fontSize: 15 * fontScale }]}>
              Топ
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.cardBackground, color: colors.textPrimary, borderColor: colors.border },
                errors.group && styles.inputError,
              ]}
              value={group}
              onChangeText={(value) => {
                setGroup(value);
                setErrors((cur) => ({ ...cur, group: undefined }));
              }}
              placeholder="Топ атауын енгізіңіз (мыс: ИС-25-11р)"
              placeholderTextColor="#94a3b8"
            />
            {errors.group && <Text style={styles.error}>{errors.group}</Text>}
          </View>

          {/* 3. Іс-шара түрі */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.textPrimary, fontSize: 15 * fontScale }]}>
              Іс-шара түрі
            </Text>
            <View style={styles.options}>
              {eventTypes.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => {
                    setEventType(item);
                    setErrors((cur) => ({ ...cur, eventType: undefined }));
                  }}
                  style={[
                    styles.option,
                    { backgroundColor: colors.cardBackground, borderColor: colors.border },
                    eventType === item && styles.optionActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: eventType === item ? '#064e3b' : colors.textPrimary, fontSize: 14 * fontScale },
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
            {errors.eventType && <Text style={styles.error}>{errors.eventType}</Text>}
          </View>

          {/* 4. Күні */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.textPrimary, fontSize: 15 * fontScale }]}>
              Іс-шара күні (ЖЖЖЖ-АА-КК)
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.cardBackground, color: colors.textPrimary, borderColor: colors.border },
                errors.eventDate && styles.inputError,
              ]}
              value={eventDate}
              onChangeText={(value) => {
                setEventDate(value);
                setErrors((cur) => ({ ...cur, eventDate: undefined }));
              }}
              placeholder="2026-11-15"
              placeholderTextColor="#94a3b8"
            />
            {errors.eventDate && <Text style={styles.error}>{errors.eventDate}</Text>}
          </View>

          {/* 5. Қатысушы саны */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.textPrimary, fontSize: 15 * fontScale }]}>
              Қатысушы саны (1-5)
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.cardBackground, color: colors.textPrimary, borderColor: colors.border },
                errors.participants && styles.inputError,
              ]}
              value={participants}
              keyboardType="numeric"
              onChangeText={(value) => {
                setParticipants(value);
                setErrors((cur) => ({ ...cur, participants: undefined }));
              }}
              placeholder="1"
              placeholderTextColor="#94a3b8"
            />
            {errors.participants && <Text style={styles.error}>{errors.participants}</Text>}
          </View>

          {/* 6. Түсіндірме */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.textPrimary, fontSize: 15 * fontScale }]}>
              Түсіндірме (кемінде 10 таңба)
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                { backgroundColor: colors.cardBackground, color: colors.textPrimary, borderColor: colors.border },
                errors.comment && styles.inputError,
              ]}
              value={comment}
              multiline
              numberOfLines={3}
              maxLength={200}
              onChangeText={(value) => {
                setComment(value);
                setErrors((cur) => ({ ...cur, comment: undefined }));
              }}
              placeholder="Іс-шарадан не күтесіз? Мақсатыңызды жазыңыз..."
              placeholderTextColor="#94a3b8"
            />
            {errors.comment && <Text style={styles.error}>{errors.comment}</Text>}
          </View>

          {/* 7. Ережелермен келісім */}
          <View style={styles.field}>
            <Pressable
              style={styles.checkboxContainer}
              onPress={() => {
                setAccepted(!accepted);
                setErrors((cur) => ({ ...cur, accepted: undefined }));
              }}
            >
              <View style={[styles.checkbox, accepted && styles.checkboxActive]}>
                {accepted && <Text style={styles.checkboxCheck}>✓</Text>}
              </View>
              <Text style={[styles.checkboxLabel, { color: colors.textPrimary, fontSize: 14 * fontScale }]}>
                Іс-шара ережелерімен келісемін
              </Text>
            </Pressable>
            {errors.accepted && <Text style={styles.error}>{errors.accepted}</Text>}
          </View>

          {/* Батырма: ТІРКЕЛУ */}
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={[styles.submitButtonText, { fontSize: 16 * fontScale }]}>ТІРКЕЛУ</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    cursor: 'pointer',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#ffffff',
    fontWeight: '700',
  },
  screen: {
    padding: 20,
    gap: 12,
  },
  title: {
    fontWeight: '800',
    marginBottom: 8,
  },
  field: {
    gap: 6,
  },
  label: {
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#C83349',
    borderWidth: 1.5,
  },
  error: {
    color: '#C83349',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  options: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    cursor: 'pointer',
  },
  optionActive: {
    backgroundColor: '#7EDFC0',
    borderColor: '#10b981',
  },
  optionText: {
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 4,
    cursor: 'pointer',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#94a3b8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkboxCheck: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  checkboxLabel: {
    fontWeight: '500',
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
    cursor: 'pointer',
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    letterSpacing: 1,
  },
});