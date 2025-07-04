import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Globe, 
  Clock, 
  Bell, 
  Shield, 
  Eye, 
  Smartphone, 
  Mail, 
  MessageSquare,
  Lock,
  Trash2,
  Download,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react-native';
import { router } from 'expo-router';
import { RootState } from '@/store/store';
import { updatePreferences } from '@/store/slices/userSlice';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<any>;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  color?: string;
  destructive?: boolean;
}

export default function SettingsScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { preferences } = useSelector((state: RootState) => state.user);
  
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const handleToggle = (key: keyof typeof preferences, value: boolean) => {
    const newPreferences = { ...localPreferences, [key]: value };
    setLocalPreferences(newPreferences);
    dispatch(updatePreferences(newPreferences));
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // Handle account deletion
            console.log('Account deletion requested');
          }
        },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'We will send a copy of your data to your registered email address within 24 hours.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => console.log('Data export requested') },
      ]
    );
  };

  const settingSections = [
    {
      title: 'Account Preferences',
      items: [
        {
          id: 'language',
          title: 'Language',
          subtitle: 'English',
          icon: Globe,
          type: 'navigation' as const,
          onPress: () => console.log('Language settings'),
        },
        {
          id: 'timezone',
          title: 'Timezone',
          subtitle: 'UTC-5 (Eastern Time)',
          icon: Clock,
          type: 'navigation' as const,
          onPress: () => console.log('Timezone settings'),
        },
        {
          id: 'darkMode',
          title: 'Dark Mode',
          subtitle: 'Switch between light and dark themes',
          icon: localPreferences.darkMode ? Moon : Sun,
          type: 'toggle' as const,
          value: localPreferences.darkMode,
          onToggle: (value) => handleToggle('darkMode', value),
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          subtitle: 'Receive order updates and promotions',
          icon: Bell,
          type: 'toggle' as const,
          value: localPreferences.notificationsEnabled,
          onToggle: (value) => handleToggle('notificationsEnabled', value),
        },
        {
          id: 'email',
          title: 'Email Notifications',
          subtitle: 'Receive updates via email',
          icon: Mail,
          type: 'toggle' as const,
          value: true,
          onToggle: (value) => console.log('Email notifications:', value),
        },
        {
          id: 'sms',
          title: 'SMS Notifications',
          subtitle: 'Receive order updates via SMS',
          icon: MessageSquare,
          type: 'toggle' as const,
          value: false,
          onToggle: (value) => console.log('SMS notifications:', value),
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          id: 'privacy',
          title: 'Privacy Controls',
          subtitle: 'Manage your privacy settings',
          icon: Shield,
          type: 'navigation' as const,
          onPress: () => console.log('Privacy settings'),
        },
        {
          id: 'visibility',
          title: 'Profile Visibility',
          subtitle: 'Control who can see your profile',
          icon: Eye,
          type: 'navigation' as const,
          onPress: () => console.log('Profile visibility'),
        },
        {
          id: 'password',
          title: 'Change Password',
          subtitle: 'Update your account password',
          icon: Lock,
          type: 'navigation' as const,
          onPress: () => console.log('Change password'),
        },
        {
          id: 'devices',
          title: 'Connected Devices',
          subtitle: 'Manage logged in devices',
          icon: Smartphone,
          type: 'navigation' as const,
          onPress: () => console.log('Connected devices'),
        },
      ],
    },
    {
      title: 'Data Management',
      items: [
        {
          id: 'export',
          title: 'Export Data',
          subtitle: 'Download a copy of your data',
          icon: Download,
          type: 'action' as const,
          onPress: handleExportData,
          color: theme.colors.primary,
        },
        {
          id: 'delete',
          title: 'Delete Account',
          subtitle: 'Permanently delete your account',
          icon: Trash2,
          type: 'action' as const,
          onPress: handleDeleteAccount,
          color: theme.colors.error,
          destructive: true,
        },
      ],
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: theme.colors.surface,
      elevation: elevation.xs,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.colors.surfaceVariant,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
    },
    headerTitle: {
      ...typography.headlineSmall,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.lg,
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: spacing.md,
      marginLeft: spacing.sm,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      marginVertical: spacing.xs,
      borderRadius: borderRadius.xl,
      elevation: elevation.sm,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
    },
    destructiveItem: {
      backgroundColor: theme.colors.errorContainer + '20',
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.lg,
    },
    settingContent: {
      flex: 1,
    },
    settingTitle: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
    },
    destructiveTitle: {
      color: theme.colors.error,
    },
    settingSubtitle: {
      ...typography.bodySmall,
      color: theme.colors.onSurfaceVariant,
    },
    rightContent: {
      alignItems: 'flex-end',
    },
    switch: {
      marginLeft: spacing.md,
    },
    chevron: {
      marginLeft: spacing.md,
    },
    versionInfo: {
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      marginVertical: spacing.lg,
      alignItems: 'center',
      elevation: elevation.sm,
    },
    versionText: {
      ...typography.bodyMedium,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
    },
    appName: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
    },
  });

  const SettingItem = ({ item }: { item: SettingItem }) => {
    const IconComponent = item.icon;
    const iconColor = item.destructive ? item.color : (item.color || theme.colors.primary);
    
    return (
      <TouchableOpacity 
        style={[styles.settingItem, item.destructive && styles.destructiveItem]}
        onPress={item.onPress}
        disabled={item.type === 'toggle'}
      >
        <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
          <IconComponent size={24} color={iconColor} />
        </View>
        
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, item.destructive && styles.destructiveTitle]}>
            {item.title}
          </Text>
          {item.subtitle && (
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          )}
        </View>
        
        <View style={styles.rightContent}>
          {item.type === 'toggle' && (
            <Switch
              style={styles.switch}
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: theme.colors.outline, true: theme.colors.primary }}
              thumbColor={item.value ? theme.colors.onPrimary : theme.colors.onSurfaceVariant}
            />
          )}
          
          {item.type === 'navigation' && (
            <ChevronRight 
              size={20} 
              color={theme.colors.onSurfaceVariant} 
              style={styles.chevron}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={theme.colors.onSurfaceVariant} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <SettingItem key={item.id} item={item} />
            ))}
          </View>
        ))}

        {/* App Version Info */}
        <View style={styles.versionInfo}>
          <Text style={styles.appName}>FoodApp</Text>
          <Text style={styles.versionText}>
            Version 2.1.0 (Build 2024.01.20){'\n'}
            © 2024 FoodApp Inc. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}