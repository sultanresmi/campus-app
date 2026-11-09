import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme, FontSizeOption } from '../context/ThemeContext';
import { ProfilePhoto } from '../components/ProfilePhoto';

export const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { colors, isDarkMode, toggleDarkMode, fontSize, setFontSize, fontScale } = useTheme();

  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isPersonalInfoModalVisible, setIsPersonalInfoModalVisible] = useState(false);
  const [isNotificationsModalVisible, setIsNotificationsModalVisible] = useState(false);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Жүйеден шығу',
      'Шынымен шыққыңыз келе ме?',
      [
        { text: 'Болдырмау', style: 'cancel' },
        {
          text: 'Шығу',
          style: 'destructive',
          onPress: () => navigation.navigate('Login'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.headerBackground }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Шапка профиля */}
        <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
          <Text style={[styles.headerSubtitle, { fontSize: 13 * fontScale }]}>Campus Hub</Text>
          
          <View style={styles.avatarContainer}>
            <ProfilePhoto />
            <Text style={[styles.userName, { fontSize: 20 * fontScale }]}>Амина С.</Text>
            <Text style={[styles.userGroup, { fontSize: 14 * fontScale }]}>CS-2024 тобы</Text>
          </View>
        </View>

        {/* Меню пунктов */}
        <ScrollView contentContainerStyle={styles.menuContainer}>
          {/* Жеке ақпарат */}
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
            activeOpacity={0.7}
            onPress={() => setIsPersonalInfoModalVisible(true)}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#334155' : '#eff6ff' }]}>
                <Ionicons name="person-circle-outline" size={22} color="#3b82f6" />
              </View>
              <Text style={[styles.menuItemText, { color: colors.textPrimary, fontSize: 15 * fontScale }]}>
                Жеке ақпарат
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
          </TouchableOpacity>

          {/* Хабарламалар */}
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
            activeOpacity={0.7}
            onPress={() => setIsNotificationsModalVisible(true)}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#334155' : '#fef3c7' }]}>
                <Ionicons name="notifications-outline" size={20} color="#f59e0b" />
              </View>
              <Text style={[styles.menuItemText, { color: colors.textPrimary, fontSize: 15 * fontScale }]}>
                Хабарламалар
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
          </TouchableOpacity>

          {/* Қосымша параметрлері */}
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
            activeOpacity={0.7}
            onPress={() => setIsSettingsModalVisible(true)}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#334155' : '#e0e7ff' }]}>
                <Ionicons name="settings-outline" size={20} color="#6366f1" />
              </View>
              <Text style={[styles.menuItemText, { color: colors.textPrimary, fontSize: 15 * fontScale }]}>
                Қосымша параметрлері
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
          </TouchableOpacity>

          {/* Көмек және қолдау */}
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
            activeOpacity={0.7}
            onPress={() => setIsHelpModalVisible(true)}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#334155' : '#ecfdf5' }]}>
                <Ionicons name="help-circle-outline" size={21} color="#10b981" />
              </View>
              <Text style={[styles.menuItemText, { color: colors.textPrimary, fontSize: 15 * fontScale }]}>
                Көмек және қолдау
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
          </TouchableOpacity>

          {/* Жүйеден шығу */}
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
            activeOpacity={0.7}
            onPress={handleLogout}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#fee2e2' }]}>
                <Ionicons name="log-out-outline" size={20} color="#ef4444" />
              </View>
              <Text style={[styles.menuItemText, { color: '#ef4444', fontSize: 15 * fontScale, fontWeight: '600' }]}>
                Жүйеден шығу
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#ef4444" />
          </TouchableOpacity>
        </ScrollView>

        {/* МОДАЛЬДІ ТЕРЕЗЕ: ҚОСЫМША ПАРАМЕТРЛЕРІ */}
        <Modal
          visible={isSettingsModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsSettingsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.textPrimary, fontSize: 18 * fontScale }]}>
                  Қосымша параметрлері
                </Text>
                <TouchableOpacity onPress={() => setIsSettingsModalVisible(false)}>
                  <Text style={[styles.modalCloseText, { color: colors.primary }]}>Жабу</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.settingRow, { borderColor: colors.border }]}>
                <View>
                  <Text style={[styles.settingLabel, { color: colors.textPrimary, fontSize: 16 * fontScale }]}>
                    Қараңғы тақырып
                  </Text>
                  <Text style={[styles.settingDescription, { color: colors.textSecondary, fontSize: 12 * fontScale }]}>
                    {isDarkMode ? 'Қосулы' : 'Өшірулі'}
                  </Text>
                </View>
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{ false: '#cbd5e1', true: '#38bdf8' }}
                  thumbColor={isDarkMode ? '#0284c7' : '#ffffff'}
                />
              </View>

              <View style={styles.settingRowNoBorder}>
                <Text style={[styles.settingLabel, { color: colors.textPrimary, fontSize: 16 * fontScale, marginBottom: 8 }]}>
                  Қаріп өлшемі
                </Text>
                <View style={styles.fontSizeSelector}>
                  {(['small', 'medium', 'large'] as FontSizeOption[]).map((size) => {
                    const label = size === 'small' ? 'Кіші' : size === 'medium' ? 'Орташа' : 'Үлкен';
                    const isSelected = fontSize === size;
                    return (
                      <TouchableOpacity
                        key={size}
                        style={[
                          styles.fontSizeButton,
                          {
                            borderColor: isSelected ? colors.primary : colors.border,
                            backgroundColor: isSelected ? colors.primary : 'transparent',
                          },
                        ]}
                        onPress={() => setFontSize(size)}
                      >
                        <Text
                          style={[
                            styles.fontSizeButtonText,
                            {
                              color: isSelected ? '#ffffff' : colors.textPrimary,
                              fontSize: 14 * fontScale,
                            },
                          ]}
                        >
                          {label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* МОДАЛЬДІ ТЕРЕЗЕ: ЖЕКЕ АҚПАРАТ */}
        <Modal
          visible={isPersonalInfoModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsPersonalInfoModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary, fontSize: 18 * fontScale }]}>
                Жеке ақпарат
              </Text>
              <Text style={[styles.modalInfoText, { color: colors.textSecondary, fontSize: 14 * fontScale }]}>
                Аты-жөні: Амина Серікқызы{'\n'}
                Тобы: CS-2024{'\n'}
                Мамандығы: Ақпараттық жүйелер{'\n'}
                ID: 20240982
              </Text>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.primary }]}
                onPress={() => setIsPersonalInfoModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Түсінікті</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* МОДАЛЬДІ ТЕРЕЗЕ: ХАБАРЛАМАЛАР */}
        <Modal
          visible={isNotificationsModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsNotificationsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary, fontSize: 18 * fontScale }]}>
                Хабарламалар
              </Text>
              <Text style={[styles.modalInfoText, { color: colors.textSecondary, fontSize: 14 * fontScale }]}>
                Жаңа хабарламалар жоқ.
              </Text>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.primary }]}
                onPress={() => setIsNotificationsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Жабу</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* МОДАЛЬДІ ТЕРЕЗЕ: КӨМЕК ЖӘНЕ ҚОЛДАУ */}
        <Modal
          visible={isHelpModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsHelpModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary, fontSize: 18 * fontScale }]}>
                Көмек және қолдау
              </Text>
              <Text style={[styles.modalInfoText, { color: colors.textSecondary, fontSize: 14 * fontScale }]}>
                Қолдау қызметі: support@campus.kz{'\n'}
                Байланыс телефоны: +7 (727) 000-00-00{'\n'}
                Жұмыс уақыты: Дүйсенбі - Жұма, 09:00 - 18:00
              </Text>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.primary }]}
                onPress={() => setIsHelpModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Жабу</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerSubtitle: {
    color: '#bfdbfe',
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  avatarContainer: {
    alignItems: 'center',
    width: '100%',
  },
  userName: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 2,
  },
  userGroup: {
    color: '#bfdbfe',
  },
  menuContainer: {
    padding: 16,
    gap: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
    cursor: 'pointer',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontWeight: '700',
  },
  modalCloseText: {
    fontWeight: '600',
    fontSize: 15,
    cursor: 'pointer',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  settingRowNoBorder: {
    paddingBottom: 8,
  },
  settingLabel: {
    fontWeight: '600',
  },
  settingDescription: {
    marginTop: 2,
  },
  fontSizeSelector: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  fontSizeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  fontSizeButtonText: {
    fontWeight: '600',
  },
  modalInfoText: {
    lineHeight: 22,
    marginVertical: 16,
  },
  modalButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    cursor: 'pointer',
  },
  modalButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
});