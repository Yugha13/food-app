import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Clock, Star, Plus } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

export default function DailyDealsSection() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { dailyDeals } = useSelector((state: RootState) => state.products);

  const DealCard = ({ item }: { item: any }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const handlePress = () => {
      scale.value = withSpring(0.95, {}, () => {
        scale.value = withSpring(1);
      });
    };

    const handleAddToCart = () => {
      dispatch(addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        restaurant: item.restaurant,
      }));
    };

    const styles = StyleSheet.create({
      dealCard: {
        width: 280,
        backgroundColor: theme.colors.surface,
        borderRadius: borderRadius.xl,
        marginRight: spacing.md,
        elevation: elevation.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: 'hidden',
        marginBottom : 10,
        marginTop : 10
      },
      imageContainer: {
        position: 'relative',
        height: 140,
      },
      dealImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      discountBadge: {
        position: 'absolute',
        top: spacing.sm,
        left: spacing.sm,
        backgroundColor: theme.colors.error,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.lg,
      },
      discountText: {
        ...typography.labelSmall,
        color: theme.colors.onError,
        fontWeight: 'bold',
      },
      timerBadge: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.sm,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.lg,
        flexDirection: 'row',
        alignItems: 'center',
      },
      timerText: {
        ...typography.labelSmall,
        color: '#FFFFFF',
        marginLeft: spacing.xs,
        fontWeight: 'bold',
      },
      content: {
        padding: spacing.md,
      },
      dealName: {
        ...typography.titleMedium,
        color: theme.colors.onSurface,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
      },
      restaurant: {
        ...typography.bodySmall,
        color: theme.colors.onSurfaceVariant,
        marginBottom: spacing.sm,
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
      },
      rating: {
        ...typography.bodySmall,
        color: theme.colors.onSurfaceVariant,
        marginLeft: spacing.xs,
      },
      priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      originalPrice: {
        ...typography.bodyMedium,
        color: theme.colors.onSurfaceVariant,
        textDecorationLine: 'line-through',
        marginRight: spacing.sm,
      },
      currentPrice: {
        ...typography.titleMedium,
        color: theme.colors.primary,
        fontWeight: 'bold',
      },
      addButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <Animated.View style={[styles.dealCard, animatedStyle]}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.dealImage} />
            
            {item.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}% OFF</Text>
              </View>
            )}
            
            <View style={styles.timerBadge}>
              <Clock size={12} color="#FFFFFF" />
              <Text style={styles.timerText}>2h 15m</Text>
            </View>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.dealName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.restaurant}>{item.restaurant}</Text>
            
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>{item.rating} ({item.reviews})</Text>
            </View>
            
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                {item.originalPrice && (
                  <Text style={styles.originalPrice}>${item.originalPrice}</Text>
                )}
                <Text style={styles.currentPrice}>${item.price}</Text>
              </View>
              
              <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                <Plus size={20} color={theme.colors.onPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      marginVertical: spacing.md,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
    },
    title: {
      ...typography.headlineSmall,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    seeAllButton: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
    },
    seeAllText: {
      ...typography.labelLarge,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    listContainer: {
      paddingLeft: spacing.md,
    },
  });

  if (dailyDeals.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⚡ Daily Deals</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={dailyDeals}
        renderItem={({ item }) => <DealCard item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}