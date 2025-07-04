import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Star, Clock, Plus, Trash2 } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { removeFromFavorites } from '@/store/slices/favoritesSlice';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

export default function FavoritesScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  const { items: favoriteItems } = useSelector((state: RootState) => state.favorites);
  const { items: products } = useSelector((state: RootState) => state.products);
  const { restaurants } = useSelector((state: RootState) => state.products);

  const favoriteProducts = favoriteItems
    .filter(item => item.type === 'product')
    .map(item => products.find(p => p.id === item.id))
    .filter(Boolean);

  const favoriteRestaurants = favoriteItems
    .filter(item => item.type === 'restaurant')
    .map(item => restaurants.find(r => r.id === item.id))
    .filter(Boolean);

  const FavoriteProductCard = ({ item }: { item: any }) => {
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

    const handleRemoveFavorite = () => {
      dispatch(removeFromFavorites({ id: item.id, type: 'product' }));
    };

    const styles = StyleSheet.create({
      productCard: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderRadius: borderRadius.xl,
        marginBottom: spacing.md,
        elevation: elevation.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: 'hidden',
      },
      productImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
      },
      content: {
        flex: 1,
        padding: spacing.md,
        justifyContent: 'space-between',
      },
      topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
      productInfo: {
        flex: 1,
      },
      productName: {
        ...typography.titleMedium,
        color: theme.colors.onSurface,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
      },
      restaurant: {
        ...typography.bodySmall,
        color: theme.colors.onSurfaceVariant,
        marginBottom: spacing.xs,
      },
      infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: spacing.md,
      },
      rating: {
        ...typography.bodySmall,
        color: theme.colors.onSurfaceVariant,
        marginLeft: spacing.xs,
      },
      timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      time: {
        ...typography.bodySmall,
        color: theme.colors.onSurfaceVariant,
        marginLeft: spacing.xs,
      },
      bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      price: {
        ...typography.titleMedium,
        color: theme.colors.primary,
        fontWeight: 'bold',
      },
      actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      removeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: theme.colors.errorContainer,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
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
        <Animated.View style={[styles.productCard, animatedStyle]}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          
          <View style={styles.content}>
            <View style={styles.topRow}>
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.restaurant}>{item.restaurant}</Text>
                
                <View style={styles.infoRow}>
                  <View style={styles.ratingContainer}>
                    <Star size={12} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.rating}>{item.rating}</Text>
                  </View>
                  
                  <View style={styles.timeContainer}>
                    <Clock size={12} color={theme.colors.onSurfaceVariant} />
                    <Text style={styles.time}>{item.preparationTime}</Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.bottomRow}>
              <Text style={styles.price}>${item.price}</Text>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.removeButton} onPress={handleRemoveFavorite}>
                  <Trash2 size={16} color={theme.colors.onErrorContainer} />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                  <Plus size={16} color={theme.colors.onPrimary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const FavoriteRestaurantCard = ({ item }: { item: any }) => {
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

    const handleRemoveFavorite = () => {
      dispatch(removeFromFavorites({ id: item.id, type: 'restaurant' }));
    };

    const styles = StyleSheet.create({
      restaurantCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: borderRadius.xl,
        marginBottom: spacing.md,
        elevation: elevation.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: 'hidden',
      },
      restaurantImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
      },
      restaurantContent: {
        padding: spacing.md,
      },
      restaurantHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.sm,
      },
      restaurantInfo: {
        flex: 1,
      },
      restaurantName: {
        ...typography.titleMedium,
        color: theme.colors.onSurface,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
      },
      cuisine: {
        ...typography.bodySmall,
        color: theme.colors.onSurfaceVariant,
      },
      removeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.errorContainer,
        alignItems: 'center',
        justifyContent: 'center',
      },
      restaurantStats: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      statItem: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      statText: {
        ...typography.bodySmall,
        color: theme.colors.onSurfaceVariant,
        marginLeft: spacing.xs,
      },
    });

    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <Animated.View style={[styles.restaurantCard, animatedStyle]}>
          <Image source={{ uri: item.image }} style={styles.restaurantImage} />
          
          <View style={styles.restaurantContent}>
            <View style={styles.restaurantHeader}>
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <Text style={styles.cuisine}>{item.cuisine.join(', ')}</Text>
              </View>
              
              <TouchableOpacity style={styles.removeButton} onPress={handleRemoveFavorite}>
                <Heart size={16} color={theme.colors.onErrorContainer} fill={theme.colors.onErrorContainer} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.restaurantStats}>
              <View style={styles.statItem}>
                <Star size={12} color="#FFD700" fill="#FFD700" />
                <Text style={styles.statText}>{item.rating} ({item.reviews})</Text>
              </View>
              
              <View style={styles.statItem}>
                <Clock size={12} color={theme.colors.onSurfaceVariant} />
                <Text style={styles.statText}>{item.deliveryTime}</Text>
              </View>
              
              <Text style={styles.statText}>${item.deliveryFee} delivery</Text>
            </View>
          </View>
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
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      backgroundColor: theme.colors.surface,
      elevation: elevation.xs,
    },
    title: {
      ...typography.headlineSmall,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
    },
    sectionTitle: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginLeft: spacing.sm,
    },
    listContainer: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.md,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.xxxl,
    },
    emptyIcon: {
      marginBottom: spacing.md,
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
      marginBottom: spacing.lg,
    },
    exploreButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.lg,
    },
    exploreButtonText: {
      ...typography.labelLarge,
      color: theme.colors.onPrimary,
      fontWeight: 'bold',
    },
  });

  if (favoriteItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Favorites</Text>
        </View>
        
        <View style={styles.emptyContainer}>
          <Heart size={64} color={theme.colors.onSurfaceVariant} style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtitle}>
            Start adding your favorite restaurants and dishes to see them here
          </Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
      </View>

      <FlatList
        data={[
          ...(favoriteProducts.length > 0 ? [{ type: 'section', title: 'Favorite Dishes', icon: Heart }] : []),
          ...favoriteProducts.map(item => ({ ...item, type: 'product' })),
          ...(favoriteRestaurants.length > 0 ? [{ type: 'section', title: 'Favorite Restaurants', icon: Heart }] : []),
          ...favoriteRestaurants.map(item => ({ ...item, type: 'restaurant' })),
        ]}
        renderItem={({ item }) => {
          if (item.type === 'section') {
            const IconComponent = item.icon;
            return (
              <View style={styles.sectionHeader}>
                <IconComponent size={20} color={theme.colors.primary} />
                <Text style={styles.sectionTitle}>{item.title}</Text>
              </View>
            );
          }
          
          if (item.type === 'product') {
            return <FavoriteProductCard item={item} />;
          }
          
          return <FavoriteRestaurantCard item={item} />;
        }}
        keyExtractor={(item, index) => `${item.type}-${item.id || index}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}