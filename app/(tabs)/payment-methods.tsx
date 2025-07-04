import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, Plus, ChevronLeft, Edit2, Trash2, Wallet } from 'lucide-react-native';
import { router } from 'expo-router';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

export default function PaymentMethodsScreen() {
  const theme = useTheme();
  const [showAddForm, setShowAddForm] = useState(false);

  // Example payment methods - in real app, fetch from state/API
  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      cardType: 'Visa',
      lastFourDigits: '4242',
      expiryDate: '12/24',
      isDefault: true,
    },
    {
      id: 2,
      type: 'wallet',
      name: 'PayTM Wallet',
      balance: '₹2,500',
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
    paymentCard: {
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
    paymentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    paymentType: {
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
    paymentDetails: {
      ...typography.bodyLarge,
      color: theme.colors.onSurface,
      marginBottom: spacing.xs,
    },
    expiryText: {
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
    row: {
      flexDirection: 'row',
      gap: spacing.md,
    },
    halfInput: {
      flex: 1,
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

  const AddCardForm = () => (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        placeholderTextColor={theme.colors.onSurfaceVariant}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Cardholder Name"
        placeholderTextColor={theme.colors.onSurfaceVariant}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="MM/YY"
          placeholderTextColor={theme.colors.onSurfaceVariant}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="CVV"
          placeholderTextColor={theme.colors.onSurfaceVariant}
          keyboardType="number-pad"
          secureTextEntry
        />
      </View>
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
          <Text style={styles.saveText}>Save Card</Text>
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
        <Text style={styles.headerTitle}>Payment Methods</Text>
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddForm(true)}
        >
          <Plus size={24} color={theme.colors.onPrimaryContainer} />
          <Text style={styles.addButtonText}>Add New Card</Text>
        </TouchableOpacity>

        {showAddForm && <AddCardForm />}

        {paymentMethods.map((method) => (
          <View key={method.id} style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              {method.type === 'card' ? (
                <CreditCard size={20} color={theme.colors.primary} />
              ) : (
                <Wallet size={20} color={theme.colors.primary} />
              )}
              <Text style={styles.paymentType}>
                {method.type === 'card' ? method.cardType : method.name}
              </Text>
              {method.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>

            {method.type === 'card' ? (
              <>
                <Text style={styles.paymentDetails}>
                  •••• •••• •••• {method.lastFourDigits}
                </Text>
                <Text style={styles.expiryText}>Expires {method.expiryDate}</Text>
              </>
            ) : (
              <Text style={styles.paymentDetails}>Balance: {method.balance}</Text>
            )}

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