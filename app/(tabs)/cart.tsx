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
import { Minus, Plus, Trash2, ShoppingBag, Tag, MapPin } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { RootState } from '@/store/store';
import { updateQuantity, removeFromCart, applyPromoCode } from '@/store/slices/cartSlice';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

export default function CartScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  const { items, total, itemCount, deliveryFee, serviceFee, tax, discount, promoCode } = useSelector((state: RootState) => state.cart);
  const { addresses } = useSelector((state: RootState) => state.user);
  const defaultAddress = addresses.find(addr => addr.isDefault);

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const CartItem = ({ item }: { item: any }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const handleQuantityPress = (newQuantity: number) => {
      scale.value = withSpring(0.98, {}, () => {
        scale.value = withSpring(1);
      });
      handleQuantityChange(item.id, newQuantity);
    };

    const styles = StyleSheet.create({
      cartItem: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        padding: spacing.md,
        marginHorizontal: spacing.md,
        marginVertical: spacing.xs,
        borderRadius: borderRadius.xl,
        elevation: elevation.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      itemImage: {
        width: 80,
        height: 80,
        borderRadius: borderRadius.lg,
        marginRight: spacing.md,
      },
      itemDetails: {
        flex: 1,
        justifyContent: 'space-between',
      },
      itemName: {
        ...typography.titleMedium,
        color: theme.colors.onSurface,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
      },
      itemRestaurant: {
        ...typography.bodySmall,
        color: theme.colors.onSurfaceVariant,
        marginBottom: spacing.sm,
      },
      customizations: {
        ...typography.bodySmall,
        color: theme.colors.onSurfaceVariant,
        fontStyle: 'italic',
        marginBottom: spacing.sm,
      },
      itemFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      itemPrice: {
        ...typography.titleMedium,
        color: theme.colors.primary,
        fontWeight: 'bold',
      },
      quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.surfaceVariant,
        alignItems: 'center',
        justifyContent: 'center',
      },
      quantityText: {
        ...typography.titleMedium,
        color: theme.colors.onSurface,
        fontWeight: 'bold',
        marginHorizontal: spacing.md,
        minWidth: 24,
        textAlign: 'center',
      },
      removeButton: {
        padding: spacing.sm,
        marginLeft: spacing.sm,
      },
    });

    return (
      <Animated.View style={[styles.cartItem, animatedStyle]}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        
        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.itemRestaurant}>{item.restaurant}</Text>
          
          {item.customizations && item.customizations.length > 0 && (
            <Text style={styles.customizations}>
              {item.customizations.join(', ')}
            </Text>
          )}
          
          <View style={styles.itemFooter}>
            <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityPress(item.quantity - 1)}
              >
                <Minus size={16} color={theme.colors.onSurfaceVariant} />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{item.quantity}</Text>
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityPress(item.quantity + 1)}
              >
                <Plus size={16} color={theme.colors.onSurfaceVariant} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.id)}
        >
          <Trash2 size={20} color={theme.colors.error} />
        </TouchableOpacity>
      </Animated.View>
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
    itemCount: {
      ...typography.bodyMedium,
      color: theme.colors.onSurfaceVariant,
    },
    deliveryInfo: {
      backgroundColor: theme.colors.primaryContainer,
      marginHorizontal: spacing.md,
      marginVertical: spacing.sm,
      padding: spacing.md,
      borderRadius: borderRadius.xl,
      flexDirection: 'row',
      alignItems: 'center',
    },
    deliveryText: {
      ...typography.bodyMedium,
      color: theme.colors.onPrimaryContainer,
      marginLeft: spacing.sm,
      flex: 1,
    },
    promoSection: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: spacing.md,
      marginVertical: spacing.sm,
      padding: spacing.md,
      borderRadius: borderRadius.xl,
      elevation: elevation.sm,
    },
    promoHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    promoTitle: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginLeft: spacing.sm,
    },
    promoInput: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: borderRadius.lg,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    promoInputText: {
      flex: 1,
      ...typography.bodyMedium,
      color: theme.colors.onSurface,
    },
    applyButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
    },
    applyButtonText: {
      ...typography.labelMedium,
      color: theme.colors.onPrimary,
      fontWeight: 'bold',
    },
    appliedPromo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.successContainer,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.lg,
    },
    appliedPromoText: {
      ...typography.bodyMedium,
      color: theme.colors.onSuccessContainer,
      fontWeight: '600',
    },
    summaryContainer: {
      backgroundColor: theme.colors.surface,
      padding: spacing.md,
      margin: spacing.md,
      borderRadius: borderRadius.xl,
      elevation: elevation.sm,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.xs,
    },
    summaryLabel: {
      ...typography.bodyMedium,
      color: theme.colors.onSurfaceVariant,
    },
    summaryValue: {
      ...typography.bodyMedium,
      color: theme.colors.onSurface,
      fontWeight: '500',
    },
    discountValue: {
      color: theme.colors.success,
    },
    totalRow: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.outline,
      paddingTop: spacing.sm,
      marginTop: spacing.sm,
    },
    totalLabel: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    totalValue: {
      ...typography.titleLarge,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    checkoutButton: {
      backgroundColor: theme.colors.primary,
      margin: spacing.md,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.xl,
      alignItems: 'center',
      elevation: elevation.md,
    },
    checkoutButtonText: {
      ...typography.titleMedium,
      color: theme.colors.onPrimary,
      fontWeight: 'bold',
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.xl,
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
    shopButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.lg,
    },
    shopButtonText: {
      ...typography.labelLarge,
      color: theme.colors.onPrimary,
      fontWeight: 'bold',
    },
  });

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Cart</Text>
        </View>
        
        <View style={styles.emptyContainer}>
          <ShoppingBag size={64} color={theme.colors.onSurfaceVariant} style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Add some delicious food to your cart to get started
          </Text>
          <TouchableOpacity style={styles.shopButton}>
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const finalTotal = total + deliveryFee + serviceFee + tax - discount;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Cart</Text>
          <Text style={styles.itemCount}>{itemCount} items</Text>
        </View>
      </View>

      {/* Delivery Info */}
      <View style={styles.deliveryInfo}>
        <MapPin size={20} color={theme.colors.onPrimaryContainer} />
        <Text style={styles.deliveryText}>
          Delivering to {defaultAddress?.label || 'Default Address'}
        </Text>
      </View>

      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => `${item.id}-${JSON.stringify(item.customizations)}`}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      />

      {/* Promo Code Section */}
      <View style={styles.promoSection}>
        <View style={styles.promoHeader}>
          <Tag size={20} color={theme.colors.primary} />
          <Text style={styles.promoTitle}>Promo Code</Text>
        </View>
        
        {promoCode ? (
          <View style={styles.appliedPromo}>
            <Text style={styles.appliedPromoText}>
              {promoCode} applied • ${discount.toFixed(2)} off
            </Text>
            <TouchableOpacity>
              <Text style={[styles.appliedPromoText, { textDecorationLine: 'underline' }]}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.promoInput}>
            <Text style={styles.promoInputText}>Enter promo code</Text>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Order Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service Fee</Text>
          <Text style={styles.summaryValue}>${serviceFee.toFixed(2)}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax</Text>
          <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
        </View>
        
        {discount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={[styles.summaryValue, styles.discountValue]}>
              -${discount.toFixed(2)}
            </Text>
          </View>
        )}
        
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>
          Proceed to Checkout • ${finalTotal.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}