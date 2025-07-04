import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gift, ChevronLeft, Users, Copy, Share as ShareIcon, Percent, ShoppingBag } from 'lucide-react-native';
import { router } from 'expo-router';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

export default function ReferralScreen() {
  const theme = useTheme();

  const referralCode = 'FRIEND2024';

  // Example referral history - in real app, fetch from state/API
  const referralHistory = [
    {
      id: 1,
      name: 'John Doe',
      type: 'customer',
      status: 'completed',
      reward: '₹300 off',
      date: '2024-01-15',
    },
    {
      id: 2,
      name: 'Sarah\'s Kitchen',
      type: 'shop',
      status: 'active',
      reward: '0.5% commission',
      date: '2024-01-10',
    },
  ];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Use my referral code ${referralCode} to get 30% off on your first order!`,
      });
    } catch (error) {
      console.error(error);
    }
  };

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
    referralCard: {
      backgroundColor: theme.colors.primary,
      borderRadius: borderRadius.xl,
      padding: spacing.xl,
      marginBottom: spacing.xl,
    },
    referralTitle: {
      ...typography.headlineSmall,
      color: theme.colors.onPrimary,
      fontWeight: 'bold',
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    codeContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
    },
    referralCode: {
      ...typography.titleLarge,
      color: theme.colors.onPrimary,
      fontWeight: 'bold',
      letterSpacing: 2,
      marginRight: spacing.md,
    },
    shareButton: {
      backgroundColor: theme.colors.onPrimary,
      borderRadius: borderRadius.full,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xl,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    shareButtonText: {
      ...typography.labelLarge,
      color: theme.colors.primary,
      fontWeight: 'bold',
      marginLeft: spacing.xs,
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
    rewardCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
      elevation: elevation.sm,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    rewardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    rewardIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.primaryContainer,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
    },
    rewardTitle: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    rewardDescription: {
      ...typography.bodyMedium,
      color: theme.colors.onSurfaceVariant,
    },
    historyCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
    },
    historyInfo: {
      flex: 1,
      marginLeft: spacing.md,
    },
    historyName: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: '600',
    },
    historyMeta: {
      ...typography.bodySmall,
      color: theme.colors.onSurfaceVariant,
    },
    historyReward: {
      ...typography.labelLarge,
      color: theme.colors.primary,
      fontWeight: 'bold',
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
        <Text style={styles.headerTitle}>Refer & Earn</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.referralCard}>
          <Text style={styles.referralTitle}>Share the love!</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.referralCode}>{referralCode}</Text>
            <TouchableOpacity onPress={() => {}}>
              <Copy size={20} color={theme.colors.onPrimary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <ShareIcon size={18} color={theme.colors.primary} />
            <Text style={styles.shareButtonText}>Share Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rewards</Text>
          <View style={styles.rewardCard}>
            <View style={styles.rewardHeader}>
              <View style={styles.rewardIcon}>
                <Users size={20} color={theme.colors.primary} />
              </View>
              <View>
                <Text style={styles.rewardTitle}>Refer a Friend</Text>
                <Text style={styles.rewardDescription}>
                  30% off their first order
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.rewardCard}>
            <View style={styles.rewardHeader}>
              <View style={styles.rewardIcon}>
                <ShoppingBag size={20} color={theme.colors.primary} />
              </View>
              <View>
                <Text style={styles.rewardTitle}>Refer a Shop Owner</Text>
                <Text style={styles.rewardDescription}>
                  0.5% commission for 2 months
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Referral History</Text>
          {referralHistory.map((referral) => (
            <View key={referral.id} style={styles.historyCard}>
              {referral.type === 'customer' ? (
                <Users size={24} color={theme.colors.primary} />
              ) : (
                <ShoppingBag size={24} color={theme.colors.primary} />
              )}
              <View style={styles.historyInfo}>
                <Text style={styles.historyName}>{referral.name}</Text>
                <Text style={styles.historyMeta}>
                  {new Date(referral.date).toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.historyReward}>{referral.reward}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}