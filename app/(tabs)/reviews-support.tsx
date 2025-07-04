import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, ChevronLeft, Star, Clock, Phone, Mail, HelpCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

export default function ReviewsSupportScreen() {
  const theme = useTheme();

  // Example reviews - in real app, fetch from state/API
  const pendingReviews = [
    {
      id: 1,
      restaurantName: 'Pizza Palace',
      orderDate: '2024-01-15',
      items: ['Margherita Pizza', 'Garlic Bread'],
      image: 'https://example.com/pizza.jpg',
    },
    {
      id: 2,
      restaurantName: 'Burger House',
      orderDate: '2024-01-14',
      items: ['Classic Burger', 'Fries'],
      image: 'https://example.com/burger.jpg',
    },
  ];

  const supportOptions = [
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: MessageCircle,
      color: '#4CAF50',
    },
    {
      id: 'call',
      title: 'Call Support',
      description: 'Speak with a representative',
      icon: Phone,
      color: '#2196F3',
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Get help via email',
      icon: Mail,
      color: '#FF9800',
    },
    {
      id: 'faq',
      title: 'FAQs',
      description: 'Find answers to common questions',
      icon: HelpCircle,
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
    reviewCard: {
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
    reviewHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    restaurantImage: {
      width: 50,
      height: 50,
      borderRadius: borderRadius.md,
      marginRight: spacing.md,
    },
    reviewInfo: {
      flex: 1,
    },
    restaurantName: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
    },
    orderDate: {
      ...typography.bodySmall,
      color: theme.colors.onSurfaceVariant,
      flexDirection: 'row',
      alignItems: 'center',
    },
    orderItems: {
      ...typography.bodyMedium,
      color: theme.colors.onSurfaceVariant,
    },
    reviewButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      alignSelf: 'flex-start',
      marginTop: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
    },
    reviewButtonText: {
      ...typography.labelLarge,
      color: theme.colors.onPrimary,
      marginLeft: spacing.xs,
    },
    supportCard: {
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
    supportContent: {
      flex: 1,
    },
    supportTitle: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    supportDescription: {
      ...typography.bodyMedium,
      color: theme.colors.onSurfaceVariant,
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
        <Text style={styles.headerTitle}>Reviews & Support</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Reviews</Text>
          {pendingReviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image
                  source={{ uri: review.image }}
                  style={styles.restaurantImage}
                />
                <View style={styles.reviewInfo}>
                  <Text style={styles.restaurantName}>
                    {review.restaurantName}
                  </Text>
                  <View style={styles.orderDate}>
                    <Clock size={12} color={theme.colors.onSurfaceVariant} />
                    <Text style={{ marginLeft: spacing.xs }}>
                      {new Date(review.orderDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.orderItems}>
                {review.items.join(', ')}
              </Text>
              <TouchableOpacity style={styles.reviewButton}>
                <Star size={16} color={theme.colors.onPrimary} />
                <Text style={styles.reviewButtonText}>Write Review</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Support</Text>
          {supportOptions.map((option) => (
            <TouchableOpacity key={option.id} style={styles.supportCard}>
              <View
                style={[styles.iconContainer, { backgroundColor: option.color + '20' }]}
              >
                <option.icon size={20} color={option.color} />
              </View>
              <View style={styles.supportContent}>
                <Text style={styles.supportTitle}>{option.title}</Text>
                <Text style={styles.supportDescription}>
                  {option.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}