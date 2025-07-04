import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gift, Trophy, ChevronLeft, Star, Zap, ShoppingBag, Clock, Percent } from 'lucide-react-native';
import { router } from 'expo-router';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

export default function LoyaltyBenefitsScreen() {
  const theme = useTheme();

  const benefits = [
    {
      id: 1,
      title: '3rd Order Reward',
      description: 'Get ₹100 off on your next order',
      icon: Gift,
      color: '#FF6B6B',
    },
    {
      id: 2,
      title: '7th Order Champion',
      description: '₹250 off + Free Delivery',
      icon: Trophy,
      color: '#FFD700',
    },
    {
      id: 3,
      title: 'Priority Support',
      description: '24/7 dedicated customer service',
      icon: Star,
      color: '#FF7043',
    },
    {
      id: 4,
      title: 'Flash Deals',
      description: 'Early access to promotions',
      icon: Zap,
      color: '#F4511E',
    },
    {
      id: 5,
      title: 'Free Delivery',
      description: 'On orders above ₹500',
      icon: ShoppingBag,
      color: '#E64A19',
    },
    {
      id: 6,
      title: 'Extended Returns',
      description: '30-day return window',
      icon: Clock,
      color: '#D84315',
    },
    {
      id: 7,
      title: 'Birthday Rewards',
      description: 'Special gifts on your birthday',
      icon: Gift,
      color: '#BF360C',
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
    introCard: {
      backgroundColor: theme.colors.primary,
      borderRadius: borderRadius.xl,
      padding: spacing.xl,
      marginBottom: spacing.xl,
    },
    introTitle: {
      ...typography.headlineSmall,
      color: theme.colors.onPrimary,
      fontWeight: 'bold',
      marginBottom: spacing.sm,
    },
    introDescription: {
      ...typography.bodyLarge,
      color: theme.colors.onPrimary,
      opacity: 0.9,
    },
    benefitsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginHorizontal: -spacing.xs,
    },
    benefitCard: {
      width: '48%',
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      elevation: elevation.sm,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    benefitIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md,
    },
    benefitTitle: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
    },
    benefitDescription: {
      ...typography.bodySmall,
      color: theme.colors.onSurfaceVariant,
    },
    footer: {
      padding: spacing.lg,
      alignItems: 'center',
    },
    footerText: {
      ...typography.bodyMedium,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
      fontStyle: 'italic',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ChevronLeft
          size={24}
          color={theme.colors.onSurface}
          style={styles.backButton}
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Loyalty Benefits</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Unlock Premium Benefits</Text>
          <Text style={styles.introDescription}>
            Complete orders to earn rewards! Every 7 orders completes a cycle,
            with special rewards at order 3 and 7.
          </Text>
        </View>

        <View style={styles.benefitsGrid}>
          {benefits.map((benefit) => (
            <View key={benefit.id} style={styles.benefitCard}>
              <View
                style={[styles.benefitIcon, { backgroundColor: benefit.color + '20' }]}
              >
                <benefit.icon size={24} color={benefit.color} />
              </View>
              <Text style={styles.benefitTitle}>{benefit.title}</Text>
              <Text style={styles.benefitDescription}>{benefit.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            * Rewards are automatically applied to your next eligible order
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}