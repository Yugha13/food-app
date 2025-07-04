import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { spacing, borderRadius } from '@/constants/theme';

interface SkeletonLoaderProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export function SkeletonLoader({ width = 100, height = 20, borderRadius: br = 4, style }: SkeletonLoaderProps) {
  const theme = useTheme();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const styles = StyleSheet.create({
    skeleton: {
      width,
      height,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: br,
    },
  });

  return <Animated.View style={[styles.skeleton, animatedStyle, style]} />;
}

export function ProductCardSkeleton() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      marginHorizontal: spacing.xs,
      marginVertical: spacing.sm,
      width: 160,
    },
    imageContainer: {
      marginBottom: spacing.sm,
    },
    titleContainer: {
      marginBottom: spacing.xs,
    },
    categoryContainer: {
      marginBottom: spacing.xs,
    },
    ratingContainer: {
      marginBottom: spacing.sm,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    addButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <SkeletonLoader width={128} height={120} borderRadius={borderRadius.md} />
      </View>
      
      <View style={styles.titleContainer}>
        <SkeletonLoader width={100} height={14} />
      </View>
      
      <View style={styles.categoryContainer}>
        <SkeletonLoader width={70} height={12} />
      </View>
      
      <View style={styles.ratingContainer}>
        <SkeletonLoader width={80} height={12} />
      </View>
      
      <View style={styles.priceContainer}>
        <SkeletonLoader width={50} height={16} />
        <SkeletonLoader width={32} height={32} borderRadius={16} />
      </View>
    </View>
  );
}

export function CategoryItemSkeleton() {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginRight: spacing.md,
      marginVertical: spacing.sm,
    },
    iconContainer: {
      marginBottom: spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <SkeletonLoader width={64} height={64} borderRadius={borderRadius.xl} />
      </View>
      <SkeletonLoader width={50} height={12} />
    </View>
  );
}