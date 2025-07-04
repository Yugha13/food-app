import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { X, Check } from 'lucide-react-native';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

export interface FilterOptions {
  priceRange: [number, number];
  dietary: string[];
  spiceLevel: string[];
  rating: number;
  deliveryTime: number;
  sortBy: string;
}

const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Halal',
  'Keto',
  'Low-Carb',
];

const spiceLevels = [
  'Mild',
  'Medium',
  'Hot',
  'Extra Hot',
];

const sortOptions = [
  { id: 'popularity', label: 'Popularity' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Rating' },
  { id: 'delivery-time', label: 'Delivery Time' },
];

const priceRanges = [
  { label: '$0 - $10', value: [0, 10] },
  { label: '$10 - $20', value: [10, 20] },
  { label: '$20 - $30', value: [20, 30] },
  { label: '$30+', value: [30, 100] },
];

export default function FilterModal({ 
  visible, 
  onClose, 
  onApply, 
  currentFilters 
}: FilterModalProps) {
  const theme = useTheme();
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      priceRange: [0, 100],
      dietary: [],
      spiceLevel: [],
      rating: 0,
      deliveryTime: 60,
      sortBy: 'popularity',
    };
    setFilters(resetFilters);
  };

  const toggleDietary = (option: string) => {
    setFilters(prev => ({
      ...prev,
      dietary: prev.dietary.includes(option)
        ? prev.dietary.filter(item => item !== option)
        : [...prev.dietary, option]
    }));
  };

  const toggleSpiceLevel = (level: string) => {
    setFilters(prev => ({
      ...prev,
      spiceLevel: prev.spiceLevel.includes(level)
        ? prev.spiceLevel.filter(item => item !== level)
        : [...prev.spiceLevel, level]
    }));
  };

  const setPriceRange = (range: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: borderRadius.xxl,
      borderTopRightRadius: borderRadius.xxl,
      maxHeight: '90%',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
    },
    title: {
      ...typography.headlineSmall,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surfaceVariant,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1,
    },
    section: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
    },
    sectionTitle: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: spacing.md,
    },
    priceRangeContainer: {
      marginVertical: spacing.md,
    },
    priceRangeGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    priceRangeButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.surface,
      minWidth: '45%',
      alignItems: 'center',
    },
    selectedPriceRange: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    priceRangeText: {
      ...typography.labelMedium,
      color: theme.colors.onSurfaceVariant,
    },
    selectedPriceRangeText: {
      color: theme.colors.onPrimary,
    },
    optionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    optionChip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.surface,
    },
    selectedChip: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    optionText: {
      ...typography.labelMedium,
      color: theme.colors.onSurfaceVariant,
    },
    selectedOptionText: {
      color: theme.colors.onPrimary,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    ratingButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    selectedRatingButton: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    ratingText: {
      ...typography.labelMedium,
      color: theme.colors.onSurfaceVariant,
      marginLeft: spacing.xs,
    },
    selectedRatingText: {
      color: theme.colors.onPrimary,
    },
    footer: {
      flexDirection: 'row',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      gap: spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.outline,
    },
    resetButton: {
      flex: 1,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      alignItems: 'center',
    },
    resetButtonText: {
      ...typography.labelLarge,
      color: theme.colors.onSurfaceVariant,
      fontWeight: '600',
    },
    applyButton: {
      flex: 2,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.lg,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
    },
    applyButtonText: {
      ...typography.labelLarge,
      color: theme.colors.onPrimary,
      fontWeight: 'bold',
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={20} color={theme.colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Price Range */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Range</Text>
              <View style={styles.priceRangeGrid}>
                {priceRanges.map((range, index) => {
                  const isSelected = filters.priceRange[0] === range.value[0] && 
                                   filters.priceRange[1] === range.value[1];
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[styles.priceRangeButton, isSelected && styles.selectedPriceRange]}
                      onPress={() => setPriceRange(range.value as [number, number])}
                    >
                      <Text style={[styles.priceRangeText, isSelected && styles.selectedPriceRangeText]}>
                        {range.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Dietary Preferences */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dietary Preferences</Text>
              <View style={styles.optionsGrid}>
                {dietaryOptions.map((option) => {
                  const isSelected = filters.dietary.includes(option);
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[styles.optionChip, isSelected && styles.selectedChip]}
                      onPress={() => toggleDietary(option)}
                    >
                      <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Spice Level */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Spice Level</Text>
              <View style={styles.optionsGrid}>
                {spiceLevels.map((level) => {
                  const isSelected = filters.spiceLevel.includes(level);
                  return (
                    <TouchableOpacity
                      key={level}
                      style={[styles.optionChip, isSelected && styles.selectedChip]}
                      onPress={() => toggleSpiceLevel(level)}
                    >
                      <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                        {level}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Rating */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Minimum Rating</Text>
              <View style={styles.ratingContainer}>
                {[0, 3, 4, 4.5].map((rating) => {
                  const isSelected = filters.rating === rating;
                  return (
                    <TouchableOpacity
                      key={rating}
                      style={[styles.ratingButton, isSelected && styles.selectedRatingButton]}
                      onPress={() => setFilters(prev => ({ ...prev, rating }))}
                    >
                      <Text style={[styles.ratingText, isSelected && styles.selectedRatingText]}>
                        {rating === 0 ? 'Any' : `${rating}+ ⭐`}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Sort By */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <View style={styles.optionsGrid}>
                {sortOptions.map((option) => {
                  const isSelected = filters.sortBy === option.id;
                  return (
                    <TouchableOpacity
                      key={option.id}
                      style={[styles.optionChip, isSelected && styles.selectedChip]}
                      onPress={() => setFilters(prev => ({ ...prev, sortBy: option.id }))}
                    >
                      <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}