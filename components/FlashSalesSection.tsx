import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
import { useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Zap, Star, Plus, Maximize } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

export default function FlashSalesSection() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { flashSales } = useSelector((state: RootState) => state.products);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const FlashSaleCard = ({ item }: { item: any }) => {
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
      flashCard: {
        width: width * 0.8,
        backgroundColor: theme.colors.surface,
        borderRadius: borderRadius.lg,
        marginHorizontal: spacing.xs,
        marginVertical: spacing.sm,
        elevation: elevation.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: 'hidden',
        alignSelf: 'center',
      },
      imageContainer: {
        position: 'relative',
        height: 180,
      },
      flashImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      flashBadge: {
        position: 'absolute',
        top: spacing.sm,
        left: spacing.sm,
        backgroundColor: '#FF6B6B',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.lg,
        flexDirection: 'row',
        alignItems: 'center',
      },
      flashText: {
        ...typography.labelSmall,
        color: theme.colors.onPrimary,
        fontWeight: 'bold',
        marginLeft: spacing.xs,
      },
      discountBadge: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.sm,
        backgroundColor: '#FF3B30',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.lg,
      },
      discountText: {
        ...typography.labelSmall,
        color: theme.colors.onError,
        fontWeight: 'bold',
      },
      content: {
        padding: spacing.md,
      },
      flashName: {
        ...typography.titleSmall,
        color: theme.colors.onSurface,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
      },
      restaurant: {
        ...typography.bodySmall,
        color: theme.colors.onSurfaceVariant,
        marginBottom: spacing.sm,
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
        ...typography.bodySmall,
        color: theme.colors.onSurfaceVariant,
        textDecorationLine: 'line-through',
        marginRight: spacing.xs,
      },
      currentPrice: {
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

    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <Animated.View style={[styles.flashCard, animatedStyle]}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.flashImage} />
            
            <View style={styles.flashBadge}>
              <Zap size={12} color={theme.colors.onPrimary} fill={theme.colors.onPrimary} />
              <Text style={styles.flashText}>FLASH</Text>
            </View>
            
            {item.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}% OFF</Text>
              </View>
            )}
          </View>
          
          <View style={styles.content}>
            <Text style={styles.flashName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.restaurant}>{item.restaurant}</Text>
            
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                {item.originalPrice && (
                  <Text style={styles.originalPrice}>${item.originalPrice}</Text>
                )}
                <Text style={styles.currentPrice}>${item.price}</Text>
              </View>
              
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
      marginVertical: spacing.lg,
      backgroundColor: '#FFE8E8',
      padding: spacing.lg,
      width: width,
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      ...typography.headlineSmall,
      color: theme.colors.onPrimaryContainer,
      fontWeight: 'bold',
      marginLeft: spacing.sm,
    },
    timerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.lg,
    },
    timerText: {
      ...typography.labelMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    listContainer: {
      paddingLeft: 0,
    },
  });

  if (flashSales.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Zap size={24} color={theme.colors.onPrimaryContainer} fill={theme.colors.onPrimaryContainer} />
          <Text style={styles.title}>Flash Sales</Text>
        </View>
        
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </Text>
        </View>
      </View>
      
      <FlatList
        data={flashSales}
        renderItem={({ item }) => <FlashSaleCard item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}