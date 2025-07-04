import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Pizza, Coffee, Fish, Beef, Salad, IceCreamBowl as IceCream, Cookie, Soup } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { RootState } from '@/store/store';
import { setSelectedCategory } from '@/store/slices/productsSlice';
import { spacing, borderRadius, typography } from '@/constants/theme';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  count: number;
}

const categories: Category[] = [
  { id: '1', name: 'Pizza', icon: Pizza, color: '#FF6B35', count: 24 },
  { id: '2', name: 'Coffee', icon: Coffee, color: '#8B4513', count: 18 },
  { id: '3', name: 'Sushi', icon: Fish, color: '#FF69B4', count: 15 },
  { id: '4', name: 'Burgers', icon: Beef, color: '#FF4500', count: 32 },
  { id: '5', name: 'Salads', icon: Salad, color: '#32CD32', count: 21 },
  { id: '6', name: 'Desserts', icon: IceCream, color: '#FFB6C1', count: 28 },
  { id: '7', name: 'Bakery', icon: Cookie, color: '#DEB887', count: 19 },
  { id: '8', name: 'Soups', icon: Soup, color: '#FFA500', count: 12 },
];

export default function CategoryGrid() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state: RootState) => state.products);

  const CategoryItem = ({ category }: { category: Category }) => {
    const scale = useSharedValue(1);
    const isSelected = selectedCategory === category.name;

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const handlePress = () => {
      scale.value = withSpring(0.95, {}, () => {
        scale.value = withSpring(1);
      });
      dispatch(setSelectedCategory(isSelected ? undefined : category.name));
    };

    const IconComponent = category.icon;

    const styles = StyleSheet.create({
      categoryItem: {
        width: '23%',
        aspectRatio: 1,
        marginBottom: spacing.md,
        alignItems: 'center',
      },
      categoryButton: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: borderRadius.xl,
        backgroundColor: isSelected ? category.color : theme.colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: isSelected ? 8 : 2,
        shadowColor: isSelected ? category.color : '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isSelected ? 0.3 : 0.1,
        shadowRadius: 8,
        borderWidth: isSelected ? 0 : 1,
        borderColor: theme.colors.outline,
      },
      categoryName: {
        ...typography.labelMedium,
        color: theme.colors.onSurface,
        textAlign: 'center',
        marginTop: spacing.xs,
        fontWeight: '600',
      },
      categoryCount: {
        ...typography.labelSmall,
        color: theme.colors.onSurfaceVariant,
        textAlign: 'center',
        marginTop: 2,
      },
    });

    return (
      <TouchableOpacity onPress={handlePress} style={styles.categoryItem}>
        <Animated.View style={[styles.categoryButton, animatedStyle]}>
          <IconComponent 
            size={28} 
            color={isSelected ? '#FFFFFF' : category.color}
          />
        </Animated.View>
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.categoryCount}>{category.count} items</Text>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.md,
      marginVertical: spacing.md,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.grid}>
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </View>
    </View>
  );
}