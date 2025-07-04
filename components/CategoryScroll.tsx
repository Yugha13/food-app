import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Milk, Coffee, IceCreamBowl as IceCream, Droplets, Package } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { spacing, borderRadius } from '@/constants/theme';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
}

const categories: Category[] = [
  { id: '1', name: 'Milk', icon: Milk, color: '#E3F2FD' },
  { id: '2', name: 'Curd', icon: Coffee, color: '#FFF3E0' },
  { id: '3', name: 'Milk Drinks', icon: IceCream, color: '#F3E5F5' },
  { id: '4', name: 'Ghee', icon: Droplets, color: '#E8F5E8' },
  { id: '5', name: 'Paneer', icon: Package, color: '#FFF8E1' },
];

interface CategoryScrollProps {
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
}

export default function CategoryScroll({ onCategorySelect, selectedCategory }: CategoryScrollProps) {
  const theme = useTheme();

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
      onCategorySelect?.(category.name);
    };

    const IconComponent = category.icon;

    const styles = StyleSheet.create({
      categoryItem: {
        alignItems: 'center',
        marginRight: spacing.md,
        marginVertical: spacing.sm,
      },
      iconContainer: {
        width: 64,
        height: 64,
        borderRadius: borderRadius.xl,
        backgroundColor: isSelected ? theme.colors.primary : category.color,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xs,
        elevation: isSelected ? 4 : 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      categoryText: {
        fontSize: 12,
        fontWeight: '500',
        color: isSelected ? theme.colors.primary : theme.colors.onSurface,
        textAlign: 'center',
      },
    });

    return (
      <TouchableOpacity onPress={handlePress} style={styles.categoryItem}>
        <Animated.View style={[styles.iconContainer, animatedStyle]}>
          <IconComponent 
            size={24} 
            color={isSelected ? theme.colors.onPrimary : theme.colors.primary} 
          />
        </Animated.View>
        <Text style={styles.categoryText}>{category.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ paddingVertical: spacing.sm }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing.md }}
      >
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ScrollView>
    </View>
  );
}