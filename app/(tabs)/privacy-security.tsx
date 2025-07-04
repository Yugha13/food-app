import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, ChevronLeft, Lock, Eye, Smartphone, Bell, History, Download } from 'lucide-react-native';
import { router } from 'expo-router';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

export default function PrivacySecurityScreen() {
  const theme = useTheme();

  const [settings, setSettings] = useState({
    twoFactor: true,
    biometric: false,
    locationTracking: true,
    dataCollection: true,
    showOrderHistory: true,
  });

  const securitySettings = [
    {
      id: 'twoFactor',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      icon: Lock,
      color: '#4CAF50',
    },
    {
      id: 'biometric',
      title: 'Biometric Login',
      description: 'Use fingerprint or face recognition to log in',
      icon: Eye,
      color: '#2196F3',
    },
  ];

  const privacySettings = [
    {
      id: 'locationTracking',
      title: 'Location Services',
      description: 'Allow app to access your location for delivery',
      icon: Smartphone,
      color: '#FF9800',
    },
    {
      id: 'dataCollection',
      title: 'Data Collection',
      description: 'Help improve our services with usage data',
      icon: Bell,
      color: '#E91E63',
    },
    {
      id: 'showOrderHistory',
      title: 'Public Order History',
      description: 'Show your order history to restaurants',
      icon: History,
      color: '#9C27B0',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      marginRight: spacing.md,
    },
    headerTitle: {
      ...typography.titleLarge,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    content: {
      padding: spacing.lg,
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: spacing.md,
    },
    settingCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
      elevation: elevation.sm,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
    },
    settingContent: {
      flex: 1,
      marginRight: spacing.md,
    },
    settingTitle: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    settingDescription: {
      ...typography.bodyMedium,
      color: theme.colors.onSurfaceVariant,
    },
    dataSection: {
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.lg,
    },
    dataButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
    },
    dataButtonText: {
      ...typography.titleMedium,
      color: theme.colors.primary,
      marginLeft: spacing.md,
    },
    note: {
      ...typography.bodySmall,
      color: theme.colors.onSurfaceVariant,
      fontStyle: 'italic',
      marginTop: spacing.md,
      textAlign: 'center',
    },
  });

  const toggleSwitch = (id: string) => {
    setSettings(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ChevronLeft
          size={24}
          color={theme.colors.onSurface}
          style={styles.backButton}
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Privacy & Security</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Settings</Text>
          {securitySettings.map((setting) => (
            <View key={setting.id} style={styles.settingCard}>
              <View
                style={[styles.iconContainer, { backgroundColor: setting.color + '20' }]}
              >
                <setting.icon size={20} color={setting.color} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{setting.title}</Text>
                <Text style={styles.settingDescription}>
                  {setting.description}
                </Text>
              </View>
              <Switch
                value={settings[setting.id as keyof typeof settings]}
                onValueChange={() => toggleSwitch(setting.id)}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={settings[setting.id as keyof typeof settings] ? theme.colors.primaryContainer : '#f4f3f4'}
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Preferences</Text>
          {privacySettings.map((setting) => (
            <View key={setting.id} style={styles.settingCard}>
              <View
                style={[styles.iconContainer, { backgroundColor: setting.color + '20' }]}
              >
                <setting.icon size={20} color={setting.color} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{setting.title}</Text>
                <Text style={styles.settingDescription}>
                  {setting.description}
                </Text>
              </View>
              <Switch
                value={settings[setting.id as keyof typeof settings]}
                onValueChange={() => toggleSwitch(setting.id)}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={settings[setting.id as keyof typeof settings] ? theme.colors.primaryContainer : '#f4f3f4'}
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Data</Text>
          <View style={styles.dataSection}>
            <TouchableOpacity style={styles.dataButton}>
              <Download size={20} color={theme.colors.primary} />
              <Text style={styles.dataButtonText}>Download My Data</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.note}>
          We take your privacy seriously. Your data is encrypted and stored securely.
          Read our Privacy Policy for more information.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}