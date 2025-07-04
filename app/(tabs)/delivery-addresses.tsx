import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Plus, Home, Briefcase, ChevronLeft, Edit2, Trash2 } from 'lucide-react-native';
import { router } from 'expo-router';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

export default function DeliveryAddressesScreen() {
  const theme = useTheme();
  const [showAddForm, setShowAddForm] = useState(false);

  // Example addresses - in real app, fetch from state/API
  const addresses = [
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street, Apartment 4B',
      area: 'Downtown',
      city: 'Mumbai',
      pincode: '400001',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Work',
      address: '45 Business Park, Floor 3',
      area: 'Bandra Kurla Complex',
      city: 'Mumbai',
      pincode: '400051',
      isDefault: false,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      marginRight: spacing.md,
    },
    headerTitle: {
      ...typography.titleLarge,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    content: {
      padding: spacing.lg,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primaryContainer,
      padding: spacing.lg,
      borderRadius: borderRadius.lg,
      marginBottom: spacing.xl,
    },
    addButtonText: {
      ...typography.titleMedium,
      color: theme.colors.onPrimaryContainer,
      marginLeft: spacing.md,
      fontWeight: '600',
    },
    addressCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      elevation: elevation.sm,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    addressHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    addressType: {
      ...typography.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginLeft: spacing.sm,
    },
    defaultBadge: {
      backgroundColor: theme.colors.primaryContainer,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.full,
      marginLeft: 'auto',
    },
    defaultText: {
      ...typography.labelSmall,
      color: theme.colors.onPrimaryContainer,
      fontWeight: '600',
    },
    addressText: {
      ...typography.bodyLarge,
      color: theme.colors.onSurface,
      marginBottom: spacing.xs,
    },
    areaText: {
      ...typography.bodyMedium,
      color: theme.colors.onSurfaceVariant,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.outlineVariant,
      paddingTop: spacing.md,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: spacing.lg,
    },
    actionText: {
      ...typography.labelLarge,
      color: theme.colors.primary,
      marginLeft: spacing.xs,
    },
    deleteText: {
      color: theme.colors.error,
    },
    form: {
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.lg,
    },
    input: {
      ...typography.bodyLarge,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      marginBottom: spacing.md,
      color: theme.colors.onSurface,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: spacing.md,
    },
    cancelButton: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    cancelText: {
      ...typography.labelLarge,
      color: theme.colors.onSurface,
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.md,
    },
    saveText: {
      ...typography.labelLarge,
      color: theme.colors.onPrimary,
    },
  });

  const AddressForm = () => (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Address Type (e.g., Home, Work)"
        placeholderTextColor={theme.colors.onSurfaceVariant}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Address"
        placeholderTextColor={theme.colors.onSurfaceVariant}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Area"
        placeholderTextColor={theme.colors.onSurfaceVariant}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        placeholderTextColor={theme.colors.onSurfaceVariant}
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        placeholderTextColor={theme.colors.onSurfaceVariant}
        keyboardType="number-pad"
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setShowAddForm(false)}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => setShowAddForm(false)}
        >
          <Text style={styles.saveText}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ChevronLeft
          size={24}
          color={theme.colors.onSurface}
          style={styles.backButton}
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Delivery Addresses</Text>
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddForm(true)}
        >
          <Plus size={24} color={theme.colors.onPrimaryContainer} />
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>

        {showAddForm && <AddressForm />}

        {addresses.map((address) => (
          <View key={address.id} style={styles.addressCard}>
            <View style={styles.addressHeader}>
              {address.type === 'Home' ? (
                <Home size={20} color={theme.colors.primary} />
              ) : (
                <Briefcase size={20} color={theme.colors.primary} />
              )}
              <Text style={styles.addressType}>{address.type}</Text>
              {address.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>

            <Text style={styles.addressText}>{address.address}</Text>
            <Text style={styles.areaText}>
              {address.area}, {address.city} - {address.pincode}
            </Text>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Edit2 size={16} color={theme.colors.primary} />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Trash2 size={16} color={theme.colors.error} />
                <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}