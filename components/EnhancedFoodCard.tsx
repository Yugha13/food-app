import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet,
  Dimensions 
} from 'react-native';
import { Heart, Star, Clock, Plus, Minus } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { Product } from '@/store/slices/productsSlice';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '@/store/slices/favoritesSlice';
import { RootState } from '@/store/store';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

const { width } = Dimensions.get('window');
const cardWidth = (width - (spacing.lg * 3)) / 2;

interface EnhancedFoodCardProps {
  product: Product;
  onPress?: () => void;
  layout?: 'grid' | 'list';
}

export default function EnhancedFoodCard({ 
  product, 
  onPress,
  layout = 'grid' 
}: EnhancedFoodCardProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { items: favoriteItems } = useSelector((state: RootState) => state.favorites);
  
  const cartItem = cartItems.find(item => item.id === product.id);
  const isFavorite = favoriteItems.some(item => item.id === product.id && item.type === 'product');
  
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);
  const addButtonScale = useSharedValue(1);
  const quantityOpacity = useSharedValue(cartItem ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }],
    };
  });

  const addButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: addButtonScale.value }],
    };
  });

  const quantityAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: quantityOpacity.value,
      transform: [{ 
        scale: interpolate(quantityOpacity.value, [0, 1], [0.8, 1]) 
      }],
    };
  });

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    onPress?.();
  };

  const handleAddToCart = () => {
    addButtonScale.value = withSpring(0.8, {}, () => {
      addButtonScale.value = withSpring(1);
    });
    
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      restaurant: product.restaurant || 'Restaurant',
    }));
    
    quantityOpacity.value = withTiming(1, { duration: 300 });
  };

  const handleRemoveFromCart = () => {
    if (cartItem && cartItem.quantity === 1) {
      quantityOpacity.value = withTiming(0, { duration: 300 });
    }
    dispatch(removeFromCart(product.id));
  };

  const handleFavoriteToggle = () => {
    heartScale.value = withSpring(0.8, {}, () => {
      heartScale.value = withSpring(1.2, {}, () => {
        heartScale.value = withSpring(1);
      });
    });
    
    if (isFavorite) {
      dispatch(removeFromFavorites({ id: product.id, type: 'product' }));
    } else {
      dispatch(addToFavorites({ id: product.id, type: 'product' }));
    }
  };

  const styles = StyleSheet.create({
    gridCard: {
      width: cardWidth,
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.xl,
      marginBottom: spacing.lg,
      elevation: elevation.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      overflow: 'hidden',
    },
    listCard: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      
      marginBottom: spacing.lg,
      marginHorizontal: spacing.lg,
      elevation: elevation.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      overflow: 'hidden',
    },
    imageContainer: {
      position: 'relative',
    },
    gridImage: {
      width: '100%',
      height: 140,
      resizeMode: 'cover',
    },
    listImage: {
      width: 120,
      height: 120,
      resizeMode: 'cover',
    },
    favoriteButton: {
      position: 'absolute',
      top: spacing.sm,
      right: spacing.sm,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: elevation.sm,
    },
    discountBadge: {
      position: 'absolute',
      top: spacing.sm,
      left: spacing.sm,
      backgroundColor: theme.colors.error,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.md,
    },
    discountText: {
      ...typography.labelSmall,
      color: theme.colors.onError,
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
      padding: spacing.md,
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
      marginBottom: spacing.sm,
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
    price: {
      ...typography.titleMedium,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    addToCartContainer: {
      alignItems: 'center',
    },
    addButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: elevation.sm,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: borderRadius.full,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xs,
    },
    quantityButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quantityText: {
      ...typography.titleSmall,
      color: theme.colors.onPrimaryContainer,
      fontWeight: 'bold',
      marginHorizontal: spacing.sm,
      minWidth: 20,
      textAlign: 'center',
    },
    outOfStock: {
      opacity: 0.6,
    },
    outOfStockText: {
      ...typography.labelMedium,
      color: theme.colors.error,
      fontWeight: '500',
      textAlign: 'center',
      marginTop: spacing.xs,
    },
  });

  const isGrid = layout === 'grid';

  return (
    <TouchableOpacity onPress={handlePress} disabled={!product.isAvailable}>
      <Animated.View style={[
        isGrid ? styles.gridCard : styles.listCard, 
        animatedStyle,
        !product.isAvailable && styles.outOfStock
      ]}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image }} 
            style={isGrid ? styles.gridImage : styles.listImage} 
          />
          
          <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoriteToggle}>
            <Animated.View style={heartAnimatedStyle}>
              <Heart 
                size={20} 
                color={isFavorite ? theme.colors.error : theme.colors.onSurfaceVariant}
                fill={isFavorite ? theme.colors.error : 'none'}
              />
            </Animated.View>
          </TouchableOpacity>
          
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.productName} numberOfLines={isGrid ? 2 : 1}>
            {product.name}
          </Text>
          
          <Text style={styles.restaurant}>{product.restaurant}</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>{product.rating}</Text>
            </View>
            
            <View style={styles.timeContainer}>
              <Clock size={14} color={theme.colors.onSurfaceVariant} />
              <Text style={styles.time}>{product.preparationTime}</Text>
            </View>
          </View>

          {product.isAvailable ? (
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                {product.originalPrice && (
                  <Text style={styles.originalPrice}>${product.originalPrice}</Text>
                )}
                <Text style={styles.price}>${product.price}</Text>
              </View>
              
              <View style={styles.addToCartContainer}>
                {cartItem ? (
                  <Animated.View style={[styles.quantityContainer, quantityAnimatedStyle]}>
                    <TouchableOpacity style={styles.quantityButton} onPress={handleRemoveFromCart}>
                      <Minus size={16} color={theme.colors.onPrimary} />
                    </TouchableOpacity>
                    
                    <Text style={styles.quantityText}>{cartItem.quantity}</Text>
                    
                    <TouchableOpacity style={styles.quantityButton} onPress={handleAddToCart}>
                      <Plus size={16} color={theme.colors.onPrimary} />
                    </TouchableOpacity>
                  </Animated.View>
                ) : (
                  <TouchableOpacity onPress={handleAddToCart}>
                    <Animated.View style={[styles.addButton, addButtonAnimatedStyle]}>
                      <Plus size={20} color={theme.colors.onPrimary} />
                    </Animated.View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}