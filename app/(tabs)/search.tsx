import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Grid3x3, List, SlidersHorizontal } from 'lucide-react-native';
import { RootState } from '@/store/store';
import { setSelectedCategory } from '@/store/slices/productsSlice';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';
import EnhancedSearchBar from '@/components/EnhancedSearchBar';
import EnhancedFoodCard from '@/components/EnhancedFoodCard';
import FilterModal, { FilterOptions } from '@/components/FilterModal';
import { router } from 'expo-router';

export default function SearchScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 100],
    dietary: [],
    spiceLevel: [],
    rating: 0,
    deliveryTime: 60,
    sortBy: 'popularity',
  });
  
  const { items: products, searchQuery, selectedCategory, categories } = useSelector((state: RootState) => state.products);

  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    
    const matchesRating = filters.rating === 0 || product.rating >= filters.rating;
    
    const matchesDietary = filters.dietary.length === 0 || 
      filters.dietary.some(diet => product.tags.includes(diet.toLowerCase()));
    
    const matchesSpice = filters.spiceLevel.length === 0 || 
      filters.spiceLevel.some(level => product.spiceLevel === level.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesDietary && matchesSpice;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'delivery-time':
        return parseInt(a.preparationTime) - parseInt(b.preparationTime);
      default: // popularity
        return (b.reviews || 0) - (a.reviews || 0);
    }
  });

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleVoiceSearch = () => {
    console.log('Voice search activated');
  };

  const handleScanBarcode = () => {
    console.log('Barcode scanner activated');
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const CategoryChip = ({ category }: { category: string }) => {
    const isSelected = selectedCategory === category;
    
    const chipStyles = StyleSheet.create({
      chip: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        marginRight: spacing.md,
        borderRadius: borderRadius.full,
        backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
        borderWidth: 1,
        borderColor: isSelected ? theme.colors.primary : theme.colors.outline,
        elevation: isSelected ? elevation.sm : elevation.xs,
      },
      chipText: {
        ...typography.labelLarge,
        color: 'black',
        fontWeight: '600',
      },
    });

    return (
      <TouchableOpacity
        style={chipStyles.chip}
        onPress={() => dispatch(setSelectedCategory(isSelected ? undefined : category))}
      >
        <Text style={chipStyles.chipText}>{category}</Text>
      </TouchableOpacity>
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
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: theme.colors.surface,
      elevation: elevation.xs,
    },
    title: {
      ...typography.headlineSmall,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    viewToggle: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: borderRadius.lg,
      padding: spacing.xs,
    },
    viewButton: {
      padding: spacing.sm,
      borderRadius: borderRadius.md,
    },
    activeViewButton: {
      backgroundColor: theme.colors.primary,
    },
    categoriesContainer: {
      paddingVertical: spacing.lg,
      paddingLeft: spacing.lg,
      backgroundColor: theme.colors.background,
      marginBottom: spacing.md,
    },
    resultsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline + '20',
    },
    resultsText: {
      ...typography.bodyLarge,
      color: theme.colors.onSurface,
      fontWeight: '500',
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: borderRadius.full,
      elevation: elevation.sm,
    },
    filterText: {
      ...typography.labelLarge,
      color: theme.colors.onPrimaryContainer,
      marginLeft: spacing.sm,
      fontWeight: '600',
    },
    productsContainer: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
      paddingTop: spacing.md,
    },
    gridContainer: {
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    listContainer: {
      paddingHorizontal: 0,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.xxxl,
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
    clearButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.lg,
    },
    clearButtonText: {
      ...typography.labelLarge,
      color: theme.colors.onPrimary,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.viewButton,
              viewMode === 'grid' && styles.activeViewButton,
            ]}
            onPress={() => setViewMode('grid')}
          >
            <Grid3x3
              size={20}
              color={
                viewMode === 'grid'
                  ? theme.colors.onPrimary
                  : theme.colors.onSurfaceVariant
              }
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.viewButton,
              viewMode === 'list' && styles.activeViewButton,
            ]}
            onPress={() => setViewMode('list')}
          >
            <List
              size={20}
              color={
                viewMode === 'list'
                  ? theme.colors.onPrimary
                  : theme.colors.onSurfaceVariant
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Enhanced Search Bar */}
      <EnhancedSearchBar
        onVoiceSearch={handleVoiceSearch}
        onScanBarcode={handleScanBarcode}
        onFilterPress={() => setShowFilterModal(true)}
        showFilters={true}
      />

      {/* Category Filters */}
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryChip category={item} />}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {sortedProducts.length} results found
          {searchQuery && ` for "${searchQuery}"`}
        </Text>
        
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilterModal(true)}>
          <SlidersHorizontal size={16} color={theme.colors.onPrimaryContainer} />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Products List */}
      {sortedProducts.length > 0 ? (
        <FlatList
          data={sortedProducts}
          renderItem={({ item }) => (
            <EnhancedFoodCard
              product={item}
              onPress={() => handleProductPress(item.id)}
              layout={viewMode}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={viewMode === 'grid' ? 2 : 1}
          key={viewMode}
          contentContainerStyle={[
            styles.productsContainer,
            viewMode === 'list' && styles.listContainer,
          ]}
          columnWrapperStyle={viewMode === 'grid' ? styles.gridContainer : undefined}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            No results found
          </Text>
          <Text style={styles.emptySubtitle}>
            {searchQuery 
              ? `Try adjusting your filters or search for something else`
              : 'Start typing to search for delicious food'
            }
          </Text>
          {(searchQuery || selectedCategory) && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => {
                dispatch(setSelectedCategory(undefined));
                setFilters({
                  priceRange: [0, 100],
                  dietary: [],
                  spiceLevel: [],
                  rating: 0,
                  deliveryTime: 60,
                  sortBy: 'popularity',
                });
              }}
            >
              <Text style={styles.clearButtonText}>Clear All Filters</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />
    </SafeAreaView>
  );
}