import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, ChevronDown, Bell } from 'lucide-react-native';
import { router } from 'expo-router';
import { RootState } from '@/store/store';
import { setSelectedCategory } from '@/store/slices/productsSlice';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';
import EnhancedSearchBar from '@/components/EnhancedSearchBar';
import EnhancedFoodCard from '@/components/EnhancedFoodCard';
import PromotionalCarousel from '@/components/PromotionalCarousel';
import DailyDealsSection from '@/components/DailyDealsSection';
import FlashSalesSection from '@/components/FlashSalesSection';
import OrderAgainSection from '@/components/OrderAgainSection';

export default function HomeScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  
  const { name, addresses } = useSelector((state: RootState) => state.user);
  const { items: products } = useSelector((state: RootState) => state.products);
  const defaultAddress = addresses.find(addr => addr.isDefault);

  // Get featured products for the grid
  const featuredProducts = products.filter(p => p.isFeatured || p.isPopular).slice(0, 6);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleVoiceSearch = () => {
    console.log('Voice search activated');
  };

  const handleScanBarcode = () => {
    console.log('Barcode scanner activated');
  };

  const handleNotificationPress = () => {
    router.push('/notifications');
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleCategoryPress = (category: string) => {
    dispatch(setSelectedCategory(category));
    router.push('/(tabs)/search');
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
      paddingVertical: spacing.lg,
      backgroundColor: theme.colors.surface,
      elevation: elevation.xs,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    locationInfo: {
      marginLeft: spacing.sm,
      flex: 1,
    },
    locationText: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    addressText: {
      ...typography.bodySmall,
      color: theme.colors.onSurfaceVariant,
      marginTop: 2,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    notificationButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      marginRight: spacing.md,
      backgroundColor: theme.colors.surfaceVariant,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: elevation.sm,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    greetingContainer: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: theme.colors.background,
    },
    greeting: {
      ...typography.headlineMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    subGreeting: {
      ...typography.bodyLarge,
      color: theme.colors.onSurfaceVariant,
      marginTop: spacing.sm,
    },
    deliveryPromise: {
      backgroundColor: theme.colors.primaryContainer,
      marginHorizontal: spacing.lg,
      marginVertical: spacing.md,
      padding: spacing.lg,
      borderRadius: borderRadius.xl,
      alignItems: 'center',
      elevation: elevation.sm,
    },
    deliveryText: {
      ...typography.titleLarge,
      color: theme.colors.onPrimaryContainer,
      fontWeight: 'bold',
    },
    deliverySubtext: {
      ...typography.bodyMedium,
      color: theme.colors.onPrimaryContainer,
      textAlign: 'center',
      marginTop: spacing.sm,
      opacity: 0.8,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      marginTop: spacing.lg,
    },
    sectionTitle: {
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
    categoriesContainer: {
      paddingVertical: spacing.md,
      paddingLeft: spacing.lg,
    },
    productsGrid: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    gridContainer: {
      justifyContent: 'space-between',
    },
    contentContainer: {
      paddingBottom: spacing.xl,
    },
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Enhanced Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MapPin size={24} color={theme.colors.primary} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>Deliver to</Text>
            <Text style={styles.addressText} numberOfLines={1}>
              {defaultAddress?.address || 'Select address'}
            </Text>
          </View>
         
        </View>
        
        <View style={styles.userContainer}>
          <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
            <Bell size={20} color={theme.colors.onSurfaceVariant} />
          </TouchableOpacity>
          <Image 
            source={{ uri: 'https://atlas-content-cdn.pixelsquid.com/stock-images/gold-icon-man-avatar-male-symbol-ze8mxZC-600.jpg' }} 
            style={styles.avatar} 
          />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Personalized Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>{getGreeting()}, {name.split(' ')[0]}!</Text>
          <Text style={styles.subGreeting}>What would you like to eat today?</Text>
        </View>

        {/* Enhanced Search Bar */}
        <EnhancedSearchBar
          onVoiceSearch={handleVoiceSearch}
          onScanBarcode={handleScanBarcode}
        />

        {/* Delivery Promise */}
        <View style={styles.deliveryPromise}>
          <Text style={styles.deliveryText}>🚀 30-Minute Delivery</Text>
          <Text style={styles.deliverySubtext}>
            Fast delivery guaranteed or your next order is free!
          </Text>
        </View>

        {/* Promotional Carousel */}
        <PromotionalCarousel />

        

      

        {/* Featured Food Items Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Items</Text>
          <TouchableOpacity style={styles.seeAllButton} onPress={() => router.push('/(tabs)/search')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={featuredProducts}
          renderItem={({ item }) => (
            <EnhancedFoodCard
              product={item}
              onPress={() => handleProductPress(item.id)}
              layout="grid"
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productsGrid}
          columnWrapperStyle={styles.gridContainer}
          scrollEnabled={false}
        />

        {/* Daily Deals */}
        <DailyDealsSection />

        {/* Flash Sales */}
        <FlashSalesSection />

        {/* Order Again */}
        <OrderAgainSection />

      </ScrollView>
    </SafeAreaView>
  );
}