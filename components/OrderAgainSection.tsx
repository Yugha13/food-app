import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RotateCcw, Star, Plus } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

export default function OrderAgainSection() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.orders);
  const { items: products } = useSelector((state: RootState) => state.products);

  // Get unique items from recent orders
  const recentItems = React.useMemo(() => {
    const itemMap = new Map();
    
    orders.slice(0, 3).forEach(order => {
      order.items.forEach(orderItem => {
        const product = products.find(p => p.id === orderItem.id);
        if (product && !itemMap.has(orderItem.id)) {
          itemMap.set(orderItem.id, {
            ...product,
            lastOrdered: order.orderTime,
          });
        }
      });
    });
    
    return Array.from(itemMap.values()).slice(0, 6);
  }, [orders, products]);

  const OrderAgainCard = ({ item }: { item: any }) => {
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
      orderCard: {
        width: 180,
        backgroundColor: theme.colors.surface,
        borderRadius: borderRadius.xl,
        marginRight: spacing.md,
        elevation: elevation.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: 'hidden',
        marginBottom: 10,
      },
      imageContainer: {
        position: 'relative',
        height: 120,
      },
      orderImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      reorderBadge: {
        position: 'absolute',
        top: spacing.sm,
        left: spacing.sm,
        backgroundColor: theme.colors.secondary,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.lg,
        flexDirection: 'row',
        alignItems: 'center',
      },
      reorderText: {
        ...typography.labelSmall,
        color: theme.colors.onSecondary,
        fontWeight: 'bold',
        marginLeft: spacing.xs,
      },
      content: {
        padding: spacing.md,
      },
      orderName: {
        ...typography.titleSmall,
        color: theme.colors.onSurface,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
      },
      restaurant: {
        ...typography.bodySmall,
        color: theme.colors.onSurfaceVariant,
        marginBottom: spacing.xs,
      },
      lastOrdered: {
        ...typography.labelSmall,
        color: theme.colors.onSurfaceVariant,
        marginBottom: spacing.sm,
      },
      priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      price: {
        ...typography.titleSmall,
        color: theme.colors.primary,
        fontWeight: 'bold',
      },
      addButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    const formatLastOrdered = (dateString: string) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString();
    };

    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <Animated.View style={[styles.orderCard, animatedStyle]}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.orderImage} />
            
            <View style={styles.reorderBadge}>
              <RotateCcw size={10} color={theme.colors.onSecondary} />
              <Text style={styles.reorderText}>REORDER</Text>
            </View>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.orderName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.restaurant}>{item.restaurant}</Text>
            <Text style={styles.lastOrdered}>
              Last ordered {formatLastOrdered(item.lastOrdered)}
            </Text>
            
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${item.price}</Text>
              
              <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                <Plus size={16} color={theme.colors.onPrimary} />
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
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      ...typography.headlineSmall,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginLeft: spacing.sm,
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

  if (recentItems.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <RotateCcw size={24} color={theme.colors.secondary} />
          <Text style={styles.title}>Order Again</Text>
        </View>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={recentItems}
        renderItem={({ item }) => <OrderAgainCard item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}