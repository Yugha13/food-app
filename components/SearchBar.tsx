import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Search, Mic, ScanBarcode, Filter } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { setSearchQuery } from '@/store/slices/productsSlice';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

interface SearchBarProps {
  onVoiceSearch?: () => void;
  onScanBarcode?: () => void;
  onFilterPress?: () => void;
  showFilters?: boolean;
}

export default function SearchBar({ 
  onVoiceSearch, 
  onScanBarcode, 
  onFilterPress,
  showFilters = false 
}: SearchBarProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleFocus = () => {
    setIsFocused(true);
    scale.value = withSpring(1.02);
  };

  const handleBlur = () => {
    setIsFocused(false);
    scale.value = withSpring(1);
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    dispatch(setSearchQuery(text));
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.xl,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      elevation: elevation.sm,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      borderWidth: isFocused ? 2 : 1,
      borderColor: isFocused ? theme.colors.primary : theme.colors.outline,
    },
    searchInput: {
      flex: 1,
      ...typography.bodyLarge,
      color: theme.colors.onSurface,
      marginHorizontal: spacing.sm,
    },
    iconButton: {
      padding: spacing.xs,
      borderRadius: borderRadius.md,
    },
    activeIconButton: {
      backgroundColor: theme.colors.primaryContainer,
    },
    filterButton: {
      marginLeft: spacing.sm,
      padding: spacing.sm,
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: borderRadius.lg,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Animated.View style={[styles.searchContainer, animatedStyle, { flex: 1 }]}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={20} color={theme.colors.onSurfaceVariant} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food, restaurants..."
            placeholderTextColor={theme.colors.onSurfaceVariant}
            value={query}
            onChangeText={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
            returnKeyType="search"
          />
          
          <TouchableOpacity 
            onPress={onVoiceSearch} 
            style={[styles.iconButton, isFocused && styles.activeIconButton]}
          >
            <Mic size={20} color={theme.colors.onSurfaceVariant} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={onScanBarcode} 
            style={[styles.iconButton, isFocused && styles.activeIconButton]}
          >
            <ScanBarcode size={20} color={theme.colors.onSurfaceVariant} />
          </TouchableOpacity>
        </Animated.View>
        
        {showFilters && (
          <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
            <Filter size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}