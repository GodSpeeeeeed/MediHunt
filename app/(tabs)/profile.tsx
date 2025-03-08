import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Text, List, Button, Divider, Surface, Portal, Dialog } from 'react-native-paper';
import { MapPin, Bell, Shield, LogOut, FileText, Search, CreditCard as Edit } from 'lucide-react-native';

export default function ProfileScreen() {
  const [name, setName] = useState('Aditya Nanda');
  const [email, setEmail] = useState('nandaaditya573@gmail.com');
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const handleEditProfile = () => {
    setEditModalVisible(true); // Open the edit modal
  };

  const handleSave = () => {
    setEditModalVisible(false); // Close the modal after saving
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <Surface style={styles.header} elevation={0}>
          <Avatar.Image
            size={100}
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop' }}
            style={styles.avatar}
          />
          <Text variant="headlineMedium" style={styles.name}>
            {name}
          </Text>
          <Text variant="bodyMedium" style={styles.email}>
            {email}
          </Text>
          <Button
            mode="outlined"
            icon={() => <Edit size={18} color="#2563eb" />}
            style={styles.editButton}
            contentStyle={styles.editButtonContent}
            labelStyle={styles.editButtonLabel}
            onPress={handleEditProfile}
          >
            Edit Profile
          </Button>
        </Surface>

        {/* Profile Options */}
        <Surface style={styles.listContainer} elevation={0}>
          <List.Item
            title="Saved Locations"
            titleStyle={styles.listTitle}
            description="Manage your saved pharmacy locations"
            descriptionStyle={styles.listDescription}
            left={() => <MapPin size={24} color="#2563eb" />}
            right={() => <List.Icon icon="chevron-right" color="#64748b" />}
            style={styles.listItem}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="Notifications"
            titleStyle={styles.listTitle}
            description="Enable or disable notifications"
            descriptionStyle={styles.listDescription}
            left={() => <Bell size={24} color="#2563eb" />}
            right={() => <List.Icon icon="chevron-right" color="#64748b" />}
            style={styles.listItem}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="Medical History"
            titleStyle={styles.listTitle}
            description="View your past prescriptions and searches"
            descriptionStyle={styles.listDescription}
            left={() => <FileText size={24} color="#2563eb" />}
            right={() => <List.Icon icon="chevron-right" color="#64748b" />}
            style={styles.listItem}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="Find Pharmacies"
            titleStyle={styles.listTitle}
            description="Search for nearby pharmacies"
            descriptionStyle={styles.listDescription}
            left={() => <Search size={24} color="#2563eb" />}
            right={() => <List.Icon icon="chevron-right" color="#64748b" />}
            style={styles.listItem}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="Privacy Settings"
            titleStyle={styles.listTitle}
            description="Manage your privacy and data"
            descriptionStyle={styles.listDescription}
            left={() => <Shield size={24} color="#2563eb" />}
            right={() => <List.Icon icon="chevron-right" color="#64748b" />}
            style={styles.listItem}
          />
        </Surface>

        {/* Logout Button */}
        <View style={styles.footer}>
          <Button
            mode="contained"
            icon={() => <LogOut size={20} color="#ffffff" />}
            style={styles.logoutButton}
            contentStyle={styles.logoutButtonContent}
            labelStyle={styles.logoutButtonLabel}
            buttonColor="#ef4444"
          >
            Log Out
          </Button>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Portal>
  <Dialog
    visible={isEditModalVisible}
    onDismiss={() => setEditModalVisible(false)}
    style={styles.dialog} // Apply custom styles for the dialog
  >
    <Dialog.Title style={styles.dialogTitle}>Edit Profile</Dialog.Title>
    <Dialog.Content>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
    </Dialog.Content>
    <Dialog.Actions>
      <Button
        onPress={() => setEditModalVisible(false)}
        textColor="#2563eb" // Blue color for Cancel
      >
        Cancel
      </Button>
      <Button
        onPress={handleSave}
        textColor="#2563eb" // Blue color for Save
      >
        Save
      </Button>
    </Dialog.Actions>
  </Dialog>
</Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 24,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  editButton: {
    borderRadius: 12,
    borderColor: '#2563eb',
    width: '100%',
    maxWidth: 200,
  },
  editButtonContent: {
    height: 44,
  },
  editButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  listContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  listItem: {
    paddingVertical: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  listDescription: {
    fontSize: 13,
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  footer: {
    paddingHorizontal: 16,
  },
  logoutButton: {
    borderRadius: 12,
    width: '100%',
  },
  logoutButtonContent: {
    height: 48,
  },
  logoutButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  dialog: {
    backgroundColor: '#f8fafc', // Light grey background
    borderRadius: 16, // Match the app's border radius
  },
  dialogTitle: {
    color: '#2462e9', // Dark text color for the title
    fontWeight: '600', // Bold title
  },
  input: {
    backgroundColor: '#ffffff', // White background for inputs
    borderWidth: 1,
    borderColor: '#2462e9', // Light border color
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
});