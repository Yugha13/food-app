import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Camera, Mail, Phone, MapPin, Calendar } from 'lucide-react-native';
import { router } from 'expo-router';
import { spacing, borderRadius, elevation, typography } from '@/constants/theme';

export default function EditProfileScreen() {
  const theme = useTheme();

  // Example user data - in real app, fetch from state/API
  const [formData, setFormData] = useState({
    name: 'Yugha',
    email: 'yugha@gmail.com',
    phone: '+91 88888-00000',
    address: 'Ariyalur',
    dateOfBirth: '1990-01-01',
    avatar: 'https://atlas-content-cdn.pixelsquid.com/stock-images/gold-icon-man-avatar-male-symbol-ze8mxZC-600.jpg',
  });

  const handleSave = () => {
    // In real app, implement API call to update profile
    console.log('Saving profile...', formData);
    router.back();
  };

  const handleChangePhoto = () => {
    // In real app, implement image picker
    console.log('Changing photo...');
  };

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
      justifyContent: 'space-between',
    },
    headerLeft: {
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
    saveButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.full,
    },
    saveButtonText: {
      ...typography.labelLarge,
      color: theme.colors.onPrimary,
      fontWeight: 'bold',
    },
    content: {
      padding: spacing.lg,
    },
    avatarSection: {
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: spacing.md,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 4,
      borderColor: theme.colors.primaryContainer,
    },
    changePhotoButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: theme.colors.primary,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: theme.colors.surface,
    },
    changePhotoText: {
      ...typography.labelMedium,
      color: theme.colors.primary,
      marginTop: spacing.xs,
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      ...typography.titleSmall,
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.md,
      marginLeft: spacing.xs,
    },
    inputContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: elevation.sm,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    inputIcon: {
      marginRight: spacing.md,
    },
    input: {
      flex: 1,
      ...typography.bodyLarge,
      color: theme.colors.onSurface,
      padding: 0,
    },
    inputLabel: {
      ...typography.labelSmall,
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.xs,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <ChevronLeft
            size={24}
            color={theme.colors.onSurface}
            style={styles.backButton}
            onPress={() => router.back()}
          />
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: formData.avatar }} style={styles.avatar} />
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={handleChangePhoto}
            >
              <Camera size={20} color={theme.colors.onPrimary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.changePhotoText}>Change Profile Photo</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Enter your full name"
                placeholderTextColor={theme.colors.onSurfaceVariant}
              />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <Mail size={20} color={theme.colors.onSurfaceVariant} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="Enter your email"
                placeholderTextColor={theme.colors.onSurfaceVariant}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <Phone size={20} color={theme.colors.onSurfaceVariant} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                placeholder="Enter your phone number"
                placeholderTextColor={theme.colors.onSurfaceVariant}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabel}>Address</Text>
            <View style={styles.inputContainer}>
              <MapPin size={20} color={theme.colors.onSurfaceVariant} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.address}
                onChangeText={(text) => setFormData({ ...formData, address: text })}
                placeholder="Enter your address"
                placeholderTextColor={theme.colors.onSurfaceVariant}
                multiline
              />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <View style={styles.inputContainer}>
              <Calendar size={20} color={theme.colors.onSurfaceVariant} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.dateOfBirth}
                onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={theme.colors.onSurfaceVariant}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}