import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, MapPin, CreditCard, Bell, Heart, CircleHelp as HelpCircle, Settings, LogOut, ChevronRight, Award, Star, TrendingUp, Clock, Shield, Gift, Zap, Crown, CreditCard as Edit3, Camera, Info, Check, Trophy } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { RootState } from '@/store/store';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const theme = useTheme();
  const { name, email, avatar, stats, achievements } = useSelector((state: RootState) => state.user);

  const menuSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          title: 'Edit Profile',
          subtitle: 'Update your personal information',
          color: theme.colors.primary,
          onPress: () => router.push('/(tabs)/edit-profile'),
        },
        {
          icon: MapPin,
          title: 'Delivery Addresses',
          subtitle: 'Manage your delivery locations',
          color: '#4CAF50',
          onPress: () => router.push('/(tabs)/delivery-addresses'),
        },
        {
          icon: CreditCard,
          title: 'Payment Methods',
          subtitle: 'Cards, wallets & more',
          color: '#2196F3',
          onPress: () => router.push('/(tabs)/payment-methods'),
        },
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          title: 'Notifications',
          subtitle: 'Push notifications, SMS & email',
          color: '#FF9800',
          onPress: () => router.push('/(tabs)/notification-settings'),
        },
        {
          icon: Heart,
          title: 'Favorites',
          subtitle: 'Your liked restaurants and dishes',
          color: '#E91E63',
          onPress: () => router.push('/(tabs)/favorites'),
        },
        {
          icon: Shield,
          title: 'Privacy & Security',
          subtitle: 'Manage your privacy settings',
          color: '#9C27B0',
          onPress: () => router.push('/(tabs)/privacy-security'),
        },
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          title: 'Reviews & Support',
          subtitle: 'Get help and leave reviews',
          color: '#607D8B',
          onPress: () => router.push('/(tabs)/reviews-support'),
        },
        {
          icon: Gift,
          title: 'Refer Friends',
          subtitle: 'Earn rewards for referrals',
          color: '#FF5722',
          onPress: () => router.push('/(tabs)/referral'),
        },
        {
          icon: Settings,
          title: 'App Settings',
          subtitle: 'App preferences and privacy',
          color: '#795548',
          onPress: () => router.push('/(tabs)/settings'),
        },
      ]
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlockedAt);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerGradient: {
      paddingTop: 60,
      paddingBottom: 40,
      paddingHorizontal: spacing.lg,
    },
    headerContent: {
      alignItems: 'center',
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: spacing.lg,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 4,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    editAvatarButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: '#FFFFFF',
    },
    userName: {
      ...typography.headlineMedium,
      color: '#FFFFFF',
      fontWeight: 'bold',
      marginBottom: spacing.xs,
      textAlign: 'center',
    },
    userEmail: {
      ...typography.bodyLarge,
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      marginBottom: spacing.lg,
    },
    membershipBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    membershipText: {
      ...typography.labelLarge,
      color: '#FFFFFF',
      fontWeight: 'bold',
      marginLeft: spacing.sm,
    },
    statsContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      marginHorizontal: spacing.lg,
      marginTop: -20,
      borderRadius: borderRadius.xl,
      elevation: elevation.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      paddingVertical: spacing.lg,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.sm,
    },
    statIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.primaryContainer,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
    },
    statValue: {
      ...typography.titleLarge,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
    },
    statLabel: {
      ...typography.bodySmall,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
    },
    achievementsSection: {
      marginHorizontal: spacing.lg,
      marginTop: spacing.xl,
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      ...typography.titleLarge,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: spacing.md,
    },
    achievementsContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      elevation: elevation.sm,
    },
    achievementsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
    },
    achievementItem: {
      alignItems: 'center',
      width: (width - spacing.lg * 2 - spacing.lg * 2 - spacing.md * 2) / 3,
    },
    achievementIcon: {
      fontSize: 32,
      marginBottom: spacing.sm,
    },
    achievementTitle: {
      ...typography.labelSmall,
      color: theme.colors.onSurface,
      textAlign: 'center',
      fontWeight: '600',
    },
    achievementDate: {
      ...typography.labelSmall,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
      fontSize: 10,
      marginTop: spacing.xs,
    },
    loyaltyContainer: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: spacing.lg,
      marginTop: -20,
      borderRadius: borderRadius.xl,
      elevation: elevation.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      padding: spacing.lg,
    },
    loyaltyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    loyaltyTitle: {
      ...typography.titleLarge,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    learnMoreButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.full,
    },
    learnMoreText: {
      ...typography.labelMedium,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    circlesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xl,
      paddingHorizontal: spacing.xs,
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#E0E0E0',
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    completedCircle: {
      borderColor: '#4CAF50',
      backgroundColor: '#E8F5E9',
    },
    rewardCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderColor: '#FF6B6B',
      borderWidth: 3,
      shadowColor: '#FF6B6B',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 6,
      backgroundColor: '#FFE8E8',
      transform: [{ scale: 1.1 }],
    },
    finalCircle: {
      width: 56,
      height: 56,
      borderRadius: 28,
      borderColor: '#FFD700',
      borderWidth: 3,
      shadowColor: '#FFD700',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 8,
      backgroundColor: '#FFF8DC',
      transform: [{ scale: 1.2 }],
    },
    progressText: {
      ...typography.bodyLarge,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
      fontWeight: '500',
    },
    menuContainer: {
      marginTop: 30,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    menuSection: {
      marginBottom: spacing.xl,
    },
    menuSectionTitle: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: spacing.md,
      marginLeft: spacing.sm,
    },
    menuItem: {
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
    menuIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.lg,
    },
    menuContent: {
      flex: 1,
    },
    menuTitle: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
    },
    menuSubtitle: {
      ...typography.bodySmall,
      color: theme.colors.onSurfaceVariant,
    },
    logoutSection: {
      marginTop: spacing.lg,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.errorContainer,
      paddingVertical: spacing.lg,
      borderRadius: borderRadius.xl,
      elevation: elevation.sm,
    },
    logoutText: {
      ...typography.titleMedium,
      color: theme.colors.onErrorContainer,
      fontWeight: 'bold',
      marginLeft: spacing.sm,
    },
  });

  const MenuItem = ({ item }: { item: any }) => {
    const IconComponent = item.icon;
    
    return (
      <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
        <View style={[styles.menuIconContainer, { backgroundColor: item.color + '20' }]}>
          <IconComponent size={24} color={item.color} />
        </View>
        
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
        </View>
        
        <ChevronRight size={20} color={theme.colors.onSurfaceVariant} />
      </TouchableOpacity>
    );
  };
  
  

  const orders = stats.totalOrders > 0 && stats.totalOrders % 7 === 0 ? 7 : stats.totalOrders % 7;

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Enhanced Header with Gradient */}
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary]}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
              <TouchableOpacity style={styles.editAvatarButton}>
                <Camera size={16} color={theme.colors.onPrimary} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userEmail}>{email}</Text>
            
            <View style={styles.membershipBadge}>
              {orders === 7 ? (
                <>
                  <Trophy size={16} color="#FFFFFF" />
                  <Text style={styles.membershipText}>You've Completed a Cycle!</Text>
                </>
              ) : orders === 6 ? (
                <>
                  <Zap size={16} color="#FFFFFF" />
                  <Text style={styles.membershipText}>One More for Final Reward!</Text>
                </>
              ) : orders === 2 ? (
                <>
                  <Gift size={16} color="#FFFFFF" />
                  <Text style={styles.membershipText}>Next Order = First Reward!</Text>
                </>
              ) : (
                <>
                  <Star size={16} color="#FFFFFF" />
                  <Text style={styles.membershipText}>{`${orders} Orders - Keep Going!`}</Text>
                </>
              )}
            </View>
          </View>
        </LinearGradient>

  
       

        {/* Loyalty Progress Tracker */}
        <View style={styles.loyaltyContainer}>
          <View style={styles.loyaltyHeader}>
            <Text style={styles.loyaltyTitle}>Your Loyalty Rewards</Text>
            <TouchableOpacity 
              style={styles.learnMoreButton}
              onPress={() => router.push('/(tabs)/loyalty-benefits')}
            >
              <Text style={styles.learnMoreText}>Learn More</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.circlesContainer}>
            {[...Array(7)].map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.circle,
                  index < orders && styles.completedCircle
                ]}
              >
                {index < orders ? (
                  index === 2 ? (
                    <Gift size={20} color="#FFD700" />
                  ) : index === 6 ? (
                    <Trophy size={24} color="#FFD700" />
                  ) : (
                    <Check size={16} color="#4CAF50" />
                  )
                ) : (
                  index === 2 ? (
                    <Gift size={20} color="#FF6B6B" />
                  ) : index === 6 ? (
                    <Trophy size={24} color="#FFD700" />
                  ) : null
                )}
              </View>
            ))}
          </View>
          
          <Text style={styles.progressText}>
           {orders} of 7 orders completed
          </Text>
        </View>

       
        {/* Enhanced Menu Sections */}
        <View style={styles.menuContainer}>
          {menuSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.menuSection}>
              <Text style={styles.menuSectionTitle}>{section.title}</Text>
              {section.items.map((item, itemIndex) => (
                <MenuItem key={itemIndex} item={item} />
              ))}
            </View>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color={theme.colors.onErrorContainer} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}