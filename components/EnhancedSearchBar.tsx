import React, { useState, useRef } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Text,
  ScrollView,
  Dimensions 
} from 'react-native';
import { Search, Mic, ScanBarcode, Filter, X } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { setSearchQuery } from '@/store/slices/productsSlice';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface EnhancedSearchBarProps {
  onVoiceSearch?: () => void;
  onScanBarcode?: () => void;
  onFilterPress?: () => void;
  showFilters?: boolean;
}

const popularTags = [
  'Pizza', 'Burger', 'Sushi', 'Pasta', 'Salad', 'Dessert', 'Coffee', 'Healthy'
];

export default function EnhancedSearchBar({ 
  onVoiceSearch, 
  onScanBarcode, 
  onFilterPress,
  showFilters = false 
}: EnhancedSearchBarProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<TextInput>(null);
  
  const scale = useSharedValue(1);
  const searchIconRotation = useSharedValue(0);
  const suggestionsHeight = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const searchIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${searchIconRotation.value}deg` }],
    };
  });

  const suggestionsStyle = useAnimatedStyle(() => {
    return {
      height: suggestionsHeight.value,
      opacity: interpolate(suggestionsHeight.value, [0, 100], [0, 1]),
    };
  });

  const handleFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
    scale.value = withSpring(1.02);
    searchIconRotation.value = withTiming(360, { duration: 500 });
    suggestionsHeight.value = withSpring(120);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => {
      setShowSuggestions(false);
      suggestionsHeight.value = withSpring(0);
    }, 150);
    scale.value = withSpring(1);
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    dispatch(setSearchQuery(text));
  };

  const handleTagPress = (tag: string) => {
    setQuery(tag);
    dispatch(setSearchQuery(tag));
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    setQuery('');
    dispatch(setSearchQuery(''));
    inputRef.current?.focus();
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: theme.colors.background,
    },
    searchWrapper: {
      position: 'relative',
      zIndex: 10,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.xxl,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      elevation: elevation.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      borderWidth: isFocused ? 2 : 1,
      borderColor: isFocused ? theme.colors.primary : theme.colors.outline,
      minHeight: 56,
    },
    searchIconContainer: {
      marginRight: spacing.sm,
    },
    searchInput: {
      flex: 1,
      ...typography.bodyLarge,
      color: theme.colors.onSurface,
      paddingVertical: 0,
    },
    actionButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: spacing.sm,
    },
    iconButton: {
      padding: spacing.sm,
      borderRadius: borderRadius.md,
      marginLeft: spacing.xs,
    },
    activeIconButton: {
      backgroundColor: theme.colors.primaryContainer,
    },
    clearButton: {
      padding: spacing.xs,
      borderRadius: borderRadius.full,
      backgroundColor: theme.colors.surfaceVariant,
      marginRight: spacing.sm,
    },
    filterButton: {
      marginLeft: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: borderRadius.xxl,
      elevation: elevation.sm,
    },
    suggestionsContainer: {
      position: 'absolute',
      top: 64,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.xl,
      elevation: elevation.lg,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      overflow: 'hidden',
      zIndex: 5,
    },
    suggestionsContent: {
      padding: spacing.lg,
    },
    suggestionsTitle: {
      ...typography.titleSmall,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: spacing.md,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    tagChip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    tagText: {
      ...typography.labelMedium,
      color: theme.colors.onSurfaceVariant,
      fontWeight: '500',
    },
    resultsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      backgroundColor: theme.colors.background,
    },
    resultsText: {
      ...typography.bodyMedium,
      color: theme.colors.onSurfaceVariant,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <Animated.View style={[styles.searchContainer, animatedStyle]}>
          <Animated.View style={[styles.searchIconContainer, searchIconStyle]}>
            <Search size={24} color={theme.colors.primary} />
          </Animated.View>
          
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search for food, restaurants..."
            placeholderTextColor={theme.colors.onSurfaceVariant}
            value={query}
            onChangeText={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
          />
          
          {query.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
              <X size={16} color={theme.colors.onSurfaceVariant} />
            </TouchableOpacity>
          )}
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              onPress={onVoiceSearch} 
              style={[styles.iconButton, isFocused && styles.activeIconButton]}
            >
              <Mic size={20} color={theme.colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={onScanBarcode} 
              style={[styles.iconButton, isFocused && styles.activeIconButton]}
            >
              <ScanBarcode size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        {showSuggestions && (
          <Animated.View style={[styles.suggestionsContainer, suggestionsStyle]}>
            <View style={styles.suggestionsContent}>
              <Text style={styles.suggestionsTitle}>Popular Searches</Text>
              <View style={styles.tagsContainer}>
                {popularTags.map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={styles.tagChip}
                    onPress={() => handleTagPress(tag)}
                  >
                    <Text style={styles.tagText}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Animated.View>
        )}
      </View>
      
     
    </View>
  );
}