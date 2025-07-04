import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, ChevronLeft, MessageCircle, Tag, Gift, Star, Clock } from 'lucide-react-native';
import { router } from 'expo-router';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

export default function NotificationSettingsScreen() {
  const theme = useTheme();

  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: true,
    chat: true,
    rewards: true,
    reviews: false,
    reminders: true,
  });

  const notificationTypes = [
    {
      id: 'orderUpdates',
      title: 'Order Updates',
      description: 'Status changes and delivery notifications',
      icon: Bell,
      color: '#4CAF50',
    },
    {
      id: 'chat',
      title: 'Chat Messages',
      description: 'Messages from restaurants and delivery partners',
      icon: MessageCircle,
      color: '#2196F3',
    },
    {
      id: 'promotions',
      title: 'Promotions & Offers',
      description: 'Deals, discounts and special offers',
      icon: Tag,
      color: '#FF9800',
    },
    {
      id: 'rewards',
      title: 'Rewards & Benefits',
      description: 'Loyalty program updates and rewards',
      icon: Gift,
      color: '#E91E63',
    },
    {
      id: 'reviews',
      title: 'Reviews & Ratings',
      description: 'Reminders to rate your experience',
      icon: Star,
      color: '#9C27B0',
    },
    {
      id: 'reminders',
      title: 'Order Reminders',
      description: 'Reminders about your favorite meals',
      icon: Clock,
      color: '#795548',
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
    notificationCard: {
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
    notificationContent: {
      flex: 1,
      marginRight: spacing.md,
    },
    notificationTitle: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    notificationDescription: {
      ...typography.bodyMedium,
      color: theme.colors.onSurfaceVariant,
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
        <Text style={styles.headerTitle}>Notification Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          {notificationTypes.map((type) => (
            <View key={type.id} style={styles.notificationCard}>
              <View
                style={[styles.iconContainer, { backgroundColor: type.color + '20' }]}
              >
                <type.icon size={20} color={type.color} />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{type.title}</Text>
                <Text style={styles.notificationDescription}>
                  {type.description}
                </Text>
              </View>
              <Switch
                value={settings[type.id as keyof typeof settings]}
                onValueChange={() => toggleSwitch(type.id)}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={settings[type.id as keyof typeof settings] ? theme.colors.primaryContainer : '#f4f3f4'}
              />
            </View>
          ))}
        </View>

        <Text style={styles.note}>
          You can change these preferences at any time. Email notifications for
          important updates cannot be disabled.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}