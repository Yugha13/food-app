import { Tabs } from 'expo-router';
import { Chrome as Home, Search, ShoppingBag, User, Heart, MessageCircle, Gift, Settings as SettingsIcon } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { View, Text, StyleSheet } from 'react-native';

export default function TabLayout() {
  const theme = useTheme();
  const { itemCount } = useSelector((state: RootState) => state.cart);

  const CartIcon = ({ size, color }: { size: number; color: string }) => (
    <View style={styles.cartIconContainer}>
      <ShoppingBag size={size} color={color} />
      {itemCount > 0 && (
        <View style={[styles.badge, { backgroundColor: theme.colors.error }]}>
          <Text style={[styles.badgeText, { color: theme.colors.onError }]}>
            {itemCount > 99 ? '99+' : itemCount}
          </Text>
        </View>
      )}
    </View>
  );

  const styles = StyleSheet.create({
    cartIconContainer: {
      position: 'relative',
    },
    badge: {
      position: 'absolute',
      top: -8,
      right: -8,
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 4,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: 'bold',
    },
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
          borderTopWidth: 0.5,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 88 : 64,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => (
            <Search size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ size, color }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ size, color }) => (
            <CartIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reviews"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="referral"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="loyalty-benefits"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="delivery-addresses"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="payment-methods"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="reviews-support"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="edit-profile"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="privacy-security"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="notification-settings"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}