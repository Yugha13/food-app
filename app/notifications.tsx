import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Bell, Package, MapPin, CreditCard, Star, Gift, Settings, CircleCheck as CheckCircle, Clock, Truck, CircleAlert as AlertCircle } from 'lucide-react-native';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface Notification {
  id: string;
  type: 'order' | 'delivery' | 'promotion' | 'payment' | 'review' | 'restaurant';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: React.ComponentType<any>;
  iconColor: string;
  backgroundColor: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'delivery',
    title: 'Order Delivered!',
    message: 'Your order from Bella Italia has been delivered successfully.',
    time: '2 min ago',
    isRead: false,
    icon: CheckCircle,
    iconColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  {
    id: '2',
    type: 'order',
    title: 'Order Confirmed',
    message: 'Your order #1234 from Tokyo Sushi is being prepared.',
    time: '15 min ago',
    isRead: false,
    icon: Package,
    iconColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  {
    id: '3',
    type: 'delivery',
    title: 'Driver on the way',
    message: 'Your driver Alex is 5 minutes away from your location.',
    time: '20 min ago',
    isRead: true,
    icon: Truck,
    iconColor: '#FF9800',
    backgroundColor: '#FFF3E0',
  },
  {
    id: '4',
    type: 'promotion',
    title: '50% OFF Flash Sale!',
    message: 'Limited time offer on all pizza orders. Order now!',
    time: '1 hour ago',
    isRead: true,
    icon: Gift,
    iconColor: '#E91E63',
    backgroundColor: '#FCE4EC',
  },
  {
    id: '5',
    type: 'payment',
    title: 'Payment Successful',
    message: 'Payment of $24.99 processed successfully for order #1233.',
    time: '2 hours ago',
    isRead: true,
    icon: CreditCard,
    iconColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  {
    id: '6',
    type: 'review',
    title: 'Rate your order',
    message: 'How was your experience with Spice Garden? Leave a review!',
    time: '1 day ago',
    isRead: true,
    icon: Star,
    iconColor: '#FFD700',
    backgroundColor: '#FFFDE7',
  },
];

export default function NotificationsScreen() {
  const theme = useTheme();
  const [notifications, setNotifications] = useState(mockNotifications);
 

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const NotificationItem = ({ notification }: { notification: Notification }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const handlePress = () => {
      scale.value = withSpring(0.98, {}, () => {
        scale.value = withSpring(1);
      });
      markAsRead(notification.id);
    };

    const IconComponent = notification.icon;

    const itemStyles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        backgroundColor: notification.isRead ? theme.colors.surface : theme.colors.primaryContainer,
        marginHorizontal: spacing.lg,
        marginVertical: spacing.sm,
        padding: spacing.lg,
        borderRadius: borderRadius.xl,
        elevation: notification.isRead ? elevation.sm : elevation.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: notification.isRead ? theme.colors.outline : theme.colors.primary,
      },
      iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: notification.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
      },
      content: {
        flex: 1,
      },
      title: {
        ...typography.titleMedium,
        color: theme.colors.onSurface,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
      },
      message: {
        ...typography.bodyMedium,
        color: theme.colors.onSurfaceVariant,
        lineHeight: 20,
        marginBottom: spacing.sm,
      },
      time: {
        ...typography.bodySmall,
        color: theme.colors.onSurfaceVariant,
      },
      unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        marginLeft: spacing.sm,
        alignSelf: 'center',
      },
    });

    return (
      <TouchableOpacity onPress={handlePress}>
        <Animated.View style={[itemStyles.container, animatedStyle]}>
          <View style={itemStyles.iconContainer}>
            <IconComponent size={24} color={notification.iconColor} />
          </View>
          
          <View style={itemStyles.content}>
            <Text style={itemStyles.title}>{notification.title}</Text>
            <Text style={itemStyles.message}>{notification.message}</Text>
            <Text style={itemStyles.time}>{notification.time}</Text>
          </View>
          
          {!notification.isRead && <View style={itemStyles.unreadDot} />}
        </Animated.View>
      </TouchableOpacity>
    );
  };



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: theme.colors.surface,
      elevation: elevation.xs,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
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
    markAllButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: borderRadius.lg,
    },
    markAllText: {
      ...typography.labelMedium,
      color: theme.colors.onPrimaryContainer,
      fontWeight: '600',
    },
    summary: {
      backgroundColor: theme.colors.primaryContainer,
      marginHorizontal: spacing.lg,
      marginVertical: spacing.md,
      padding: spacing.lg,
      borderRadius: borderRadius.xl,
      flexDirection: 'row',
      alignItems: 'center',
    },
    summaryIcon: {
      marginRight: spacing.md,
    },
    summaryText: {
      ...typography.titleMedium,
      color: theme.colors.onPrimaryContainer,
      fontWeight: 'bold',
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      marginTop: spacing.lg,
    },
    sectionTitle: {
      ...typography.titleLarge,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginLeft: spacing.sm,
    },
    preferencesContainer: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: spacing.lg,
      marginVertical: spacing.md,
      borderRadius: borderRadius.xl,
      elevation: elevation.sm,
      overflow: 'hidden',
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.xxxl,
    },
    emptyIcon: {
      marginBottom: spacing.lg,
    },
    emptyTitle: {
      ...typography.titleLarge,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: spacing.sm,
      textAlign: 'center',
    },
    emptySubtitle: {
      ...typography.bodyMedium,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={theme.colors.onSurfaceVariant} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary */}
        {unreadCount > 0 && (
          <View style={styles.summary}>
            <AlertCircle size={24} color={theme.colors.onPrimaryContainer} style={styles.summaryIcon} />
            <Text style={styles.summaryText}>
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </Text>
          </View>
        )}

        {/* Notifications List */}
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Bell size={64} color={theme.colors.onSurfaceVariant} style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptySubtitle}>
              We'll notify you about order updates, promotions, and more
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}