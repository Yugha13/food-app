import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing, borderRadius, typography } from '@/constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - (spacing.md * 2);
const CARD_HEIGHT = 180;

interface PromoItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  backgroundColor: string;
  textColor: string;
  buttonText: string;
  discount?: string;
}

const promoItems: PromoItem[] = [
  {
    id: '1',
    title: 'Free Delivery',
    subtitle: 'On orders over $25',
    image: 'https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg',
    backgroundColor: '#FF6B35',
    textColor: '#FFFFFF',
    buttonText: 'Order Now',
  },
  {
    id: '2',
    title: '50% OFF',
    subtitle: 'Your first pizza order',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
    backgroundColor: '#FFB800',
    textColor: '#000000',
    buttonText: 'Get Deal',
    discount: '50%',
  },
  {
    id: '3',
    title: 'Happy Hour',
    subtitle: '20% off sushi rolls',
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
    backgroundColor: '#6B73FF',
    textColor: '#FFFFFF',
    buttonText: 'Order Sushi',
    discount: '20%',
  },
];

export default function PromotionalCarousel() {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % promoItems.length;
      translateX.value = withTiming(-nextIndex * CARD_WIDTH, { duration: 500 }, () => {
        runOnJS(setCurrentIndex)(nextIndex);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const styles = StyleSheet.create({
    container: {
      height: CARD_HEIGHT + spacing.lg,
      marginVertical: spacing.md,
    },
    carouselContainer: {
      height: CARD_HEIGHT,
      overflow: 'hidden',
      borderRadius: borderRadius.xl,
      marginHorizontal: spacing.md,
    },
    carousel: {
      flexDirection: 'row',
      height: CARD_HEIGHT,
    },
    promoCard: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      position: 'relative',
      overflow: 'hidden',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.3,
    },
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    content: {
      flex: 1,
      padding: spacing.lg,
      justifyContent: 'space-between',
    },
    topContent: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      ...typography.headlineMedium,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
    },
    subtitle: {
      ...typography.bodyLarge,
      opacity: 0.9,
    },
    discount: {
      position: 'absolute',
      top: spacing.md,
      right: spacing.md,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.full,
    },
    discountText: {
      ...typography.titleMedium,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.lg,
      alignSelf: 'flex-start',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    buttonText: {
      ...typography.labelLarge,
      fontWeight: 'bold',
    },
    indicators: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: spacing.md,
    },
    indicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: spacing.xs,
      backgroundColor: theme.colors.outline,
    },
    activeIndicator: {
      backgroundColor: theme.colors.primary,
      width: 24,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Animated.View style={[styles.carousel, animatedStyle]}>
          {promoItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.promoCard} activeOpacity={0.9}>
              <Image source={{ uri: item.image }} style={styles.backgroundImage} />
              <LinearGradient
                colors={[item.backgroundColor + 'E6', item.backgroundColor + 'CC']}
                style={styles.gradient}
              />
              
              <View style={styles.content}>
                <View style={styles.topContent}>
                  <Text style={[styles.title, { color: item.textColor }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.subtitle, { color: item.textColor }]}>
                    {item.subtitle}
                  </Text>
                </View>
                
                <TouchableOpacity style={styles.button}>
                  <Text style={[styles.buttonText, { color: item.textColor }]}>
                    {item.buttonText}
                  </Text>
                </TouchableOpacity>
              </View>
              
              {item.discount && (
                <View style={styles.discount}>
                  <Text style={[styles.discountText, { color: item.textColor }]}>
                    {item.discount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>
      
      <View style={styles.indicators}>
        {promoItems.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentIndex && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
}