import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, ToastAndroid, Alert } from 'react-native';
import { Heart, Plus } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Product } from '@/store/slices/productsSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { spacing, borderRadius, elevation } from '@/constants/theme';

interface ProductCardProps {
  product: Product & {
    inStock?: boolean;
  };
  onPress?: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const scale = useSharedValue(1);
  const addButtonScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const addButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: addButtonScale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withSpring(0.98, {}, () => {
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
      category: product.category || 'Other',
      restaurant: product.restaurant || 'Restaurant',
      customizations: [],
      specialInstructions: ''
    }));

    if (Platform.OS === 'android') {
      ToastAndroid.show('Added to cart!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Success', 'Item added to cart!');
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      flexDirection: 'column',
      padding: spacing.md,
      marginHorizontal: spacing.sm,
      marginVertical: spacing.xs,
      borderRadius: borderRadius.lg,
      elevation: elevation.sm,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      width: '100%',
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: 200,
      marginBottom: spacing.md,
    },
    productImage: {
      width: '100%',
      height: '100%',
      borderRadius: borderRadius.lg,
      resizeMode: 'cover',
    },
    favoriteButton: {
      position: 'absolute',
      top: spacing.xs,
      right: spacing.xs,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    discountBadge: {
      position: 'absolute',
      top: spacing.xs,
      left: spacing.xs,
      backgroundColor: theme.colors.error,
      paddingHorizontal: spacing.xs,
      paddingVertical: 2,
      borderRadius: borderRadius.sm,
    },
    discountText: {
      color: theme.colors.onError,
      fontSize: 10,
      fontWeight: 'bold',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
    productName: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.onSurface,
      marginBottom: spacing.sm,
    },
    productCategory: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.sm,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    rating: {
      fontSize: 12,
      color: theme.colors.onSurfaceVariant,
      marginLeft: spacing.xs,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
    },
    addButton: {
      width: '100%',
      height: 48,
      borderRadius: borderRadius.md,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: spacing.md,
    },
    outOfStock: {
      opacity: 0.6,
    },
    outOfStockText: {
      color: theme.colors.error,
      fontSize: 12,
      fontWeight: '500',
      textAlign: 'center',
      marginTop: spacing.xs,
    },
  });

  return (
    <TouchableOpacity onPress={handlePress} disabled={!product.inStock}>
      <Animated.View style={[styles.container, animatedStyle, !product.inStock && styles.outOfStock]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.productName} numberOfLines={2}>
              {product.name}
            </Text>
            <Text style={styles.productCategory}>{product.restaurant || product.category}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★ {product.rating} • {product.preparationTime || '30-40 mins'}</Text>
            </View>
          </View>

          {product.inStock ? (
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{product.price}</Text>
              <TouchableOpacity onPress={handleAddToCart} style={{width: '100%'}}>
                <Animated.View style={[styles.addButton, addButtonAnimatedStyle]}>
                  <Plus size={20} color={theme.colors.onPrimary} />
                  <Text style={{color: theme.colors.onPrimary, marginLeft: spacing.sm, fontSize: 16, fontWeight: '600'}}>Add to Cart</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.outOfStockText}>Currently Unavailable</Text>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}