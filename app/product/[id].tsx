import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { 
  ArrowLeft, 
  Heart, 
  Share, 
  Minus, 
  Plus, 
  Star,
  Clock,
  Users,
  Flame,
  Info
} from 'lucide-react-native';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '@/store/slices/favoritesSlice';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  useAnimatedScrollHandler
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const imageHeight = height * 0.4;

export default function ProductDetailScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, string>>({});
  
  const { items: products } = useSelector((state: RootState) => state.products);
  const { items: favoriteItems } = useSelector((state: RootState) => state.favorites);
  const product = products.find(p => p.id === id);
  
  const isFavorite = favoriteItems.some(item => item.id === product?.id && item.type === 'product');
  
  const scrollY = useSharedValue(0);
  const addButtonScale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 100], [0, 1]);
    return {
      opacity,
      backgroundColor: `${theme.colors.surface}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-100, 0], [1.2, 1]);
    const translateY = interpolate(scrollY.value, [-100, 0], [-50, 0]);
    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const addButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: addButtonScale.value }],
    };
  });

  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }],
    };
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingTop: 50,
      paddingBottom: spacing.md,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: elevation.sm,
    },
    headerActions: {
      flexDirection: 'row',
    },
    actionButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: spacing.sm,
      elevation: elevation.sm,
    },
    imageContainer: {
      height: imageHeight,
      overflow: 'hidden',
    },
    productImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    contentContainer: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      marginTop: -spacing.md,
      paddingTop: spacing.lg,
      borderTopLeftRadius: borderRadius.xl,
      borderTopRightRadius: borderRadius.xl,
    },
    productHeader: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    productName: {
      fontSize: 20,
      color: theme.colors.onSurface,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    restaurant: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.sm,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: spacing.lg,
    },
    infoIcon: {
      marginRight: spacing.xs,
    },
    infoText: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
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
      ...typography.titleMedium,
      color: theme.colors.onSurfaceVariant,
      textDecorationLine: 'line-through',
      marginRight: spacing.sm,
    },
    price: {
      ...typography.headlineSmall,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    stockStatus: {
      ...typography.labelLarge,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    section: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.colors.outline,
    },
    sectionTitle: {
      ...typography.titleLarge,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: spacing.md,
    },
    description: {
      ...typography.bodyLarge,
      color: theme.colors.onSurface,
      lineHeight: 24,
      marginBottom: spacing.lg,
    },
    nutritionGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
    },
    nutritionItem: {
      backgroundColor: theme.colors.surfaceVariant,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.lg,
      minWidth: '22%',
      alignItems: 'center',
    },
    nutritionValue: {
      ...typography.titleSmall,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    nutritionLabel: {
      ...typography.bodySmall,
      color: theme.colors.onSurfaceVariant,
    },
    ingredientsList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    ingredientChip: {
      backgroundColor: theme.colors.primaryContainer,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.full,
    },
    ingredientText: {
      ...typography.bodySmall,
      color: theme.colors.onPrimaryContainer,
      fontWeight: '500',
    },
    bottomContainer: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.xl,
      elevation: elevation.xl,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      borderTopLeftRadius: borderRadius.xxl,
      borderTopRightRadius: borderRadius.xxl,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
    },
    quantityButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.surfaceVariant,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: elevation.sm,
    },
    quantityText: {
      ...typography.headlineSmall,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginHorizontal: spacing.xl,
      minWidth: 40,
      textAlign: 'center',
    },
    addToCartButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.lg,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
    },
    addToCartText: {
      ...typography.titleLarge,
      color: theme.colors.onPrimary,
      fontWeight: 'bold',
      marginRight: spacing.md,
    },
    totalPrice: {
      ...typography.titleLarge,
      color: theme.colors.onPrimary,
      fontWeight: 'bold',
    },
  });

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Product not found</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addButtonScale.value = withSpring(0.95, {}, () => {
      addButtonScale.value = withSpring(1);
    });
    
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category || 'Other',
      restaurant: product.restaurant || 'Restaurant',
      // quantity,
      customizations: [],
      specialInstructions: ''
    }));

    Alert.alert(
      'Success',
      'Item added to cart!',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
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

  const totalPrice = product.price * quantity;

 
  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleFavoriteToggle}>
            <Animated.View style={heartAnimatedStyle}>
              <Heart 
                size={24} 
                color={isFavorite ? theme.colors.error : theme.colors.onSurface}
                fill={isFavorite ? theme.colors.error : 'none'}
              />
            </Animated.View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Share size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.ScrollView 
        style={{ flex: 1 }} 
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Animated.View style={imageAnimatedStyle}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
          </Animated.View>
        </View>

        {/* Product Content */}
        <View style={styles.contentContainer}>
          {/* Product Header */}
          <View style={styles.productHeader}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.restaurant}>{product.restaurant}</Text>
            
            {/* Info Row */}
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Star size={16} color={theme.colors.primary} style={styles.infoIcon} />
                <Text style={styles.infoText}>{product.rating} • {product.reviews} ratings</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Clock size={16} color={theme.colors.onSurfaceVariant} style={styles.infoIcon} />
                <Text style={styles.infoText}>{product.preparationTime || '30-40 mins'}</Text>
              </View>
            </View>
            
            {/* Price */}
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                {product.originalPrice && (
                  <Text style={styles.originalPrice}>${product.originalPrice}</Text>
                )}
                <Text style={styles.price}>${product.price}</Text>
              </View>
              <Text style={styles.stockStatus}>
                {product.isAvailable ? 'In Stock' : 'Out of Stock'}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Nutritional Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutritional Information</Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{product.nutritionalInfo.calories}</Text>
                <Text style={styles.nutritionLabel}>Calories</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{product.nutritionalInfo.protein}g</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{product.nutritionalInfo.carbs}g</Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{product.nutritionalInfo.fat}g</Text>
                <Text style={styles.nutritionLabel}>Fat</Text>
              </View>
            </View>
          </View>

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {product.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientChip}>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(quantity - 1)}
          >
            <Minus size={24} color={theme.colors.onSurfaceVariant} />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{quantity}</Text>
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(quantity + 1)}
          >
            <Plus size={24} color={theme.colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={handleAddToCart}
          disabled={!product.isAvailable}
        >
          <Animated.View style={[styles.addToCartButton, addButtonAnimatedStyle]}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
            <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
}