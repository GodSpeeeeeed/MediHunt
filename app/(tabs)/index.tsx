import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Image, Pressable, Modal, Dimensions, ScrollView, Animated } from 'react-native';
import { Searchbar, Card, Text, Chip, Button, Surface, Provider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SlidersHorizontal, Navigation, Star, Clock, MapPin } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const mockPharmacies = [
  {
    id: '1',
    name: 'HealthCare Pharmacy',
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800&q=80',
    distance: '0.8',
    address: '123 Main St, Bhubaneswar, Odisha',
    medicines: [
      { name: 'Paracetamol', price: 5.99, stock: 50 },
      { name: 'Ibuprofen', price: 7.99, stock: 20 },
      { name: 'Aspirin', price: 4.99, stock: 60 },
      { name: 'Vitamin C', price: 9.99, stock: 15 },
      { name: 'Amoxicillin', price: 12.99, stock: 30 },
      { name: 'Cetirizine', price: 3.99, stock: 40 },
      { name: 'Omeprazole', price: 8.99, stock: 25 },
      { name: 'Metformin', price: 6.99, stock: 35 },
      { name: 'Atorvastatin', price: 10.99, stock: 20 },
      { name: 'Loratadine', price: 5.49, stock: 50 },
    ],
    rating: 4.5,
    openUntil: '9:00 PM',
  },
  {
    id: '2',
    name: 'City Drugs',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&q=80',
    distance: '1.2',
    address: '456 Oak Ave, Bhubaneswar, Odisha',
    medicines: [
      { name: 'Paracetamol', price: 6.49, stock: 30 },
      { name: 'Ibuprofen', price: 8.49, stock: 15 },
      { name: 'Aspirin', price: 5.49, stock: 45 },
      { name: 'Vitamin C', price: 10.49, stock: 10 },
      { name: 'Amoxicillin', price: 13.49, stock: 25 },
      { name: 'Cetirizine', price: 4.49, stock: 35 },
      { name: 'Omeprazole', price: 9.49, stock: 20 },
      { name: 'Metformin', price: 7.49, stock: 30 },
      { name: 'Atorvastatin', price: 11.49, stock: 15 },
      { name: 'Loratadine', price: 6.49, stock: 40 },
    ],
    rating: 4.2,
    openUntil: '10:00 PM',
  },
  {
    id: '3',
    name: 'Downtown Pharmacy',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80',
    distance: '1.5',
    address: '789 Market St, Bhubaneswar, Odisha',
    medicines: [
      { name: 'Paracetamol', price: 5.49, stock: 45 },
      { name: 'Ibuprofen', price: 7.49, stock: 25 },
      { name: 'Aspirin', price: 4.49, stock: 55 },
      { name: 'Vitamin C', price: 9.49, stock: 20 },
      { name: 'Amoxicillin', price: 12.49, stock: 35 },
      { name: 'Cetirizine', price: 3.49, stock: 45 },
      { name: 'Omeprazole', price: 8.49, stock: 30 },
      { name: 'Metformin', price: 6.49, stock: 40 },
      { name: 'Atorvastatin', price: 10.49, stock: 25 },
      { name: 'Loratadine', price: 5.99, stock: 55 },
    ],
    rating: 4.8,
    openUntil: '8:00 PM',
  },
  {
    id: '4',
    name: 'Green Valley Pharmacy',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80',
    distance: '2.0',
    address: '101 Green St, Bhubaneswar, Odisha',
    medicines: [
      { name: 'Paracetamol', price: 5.99, stock: 40 },
      { name: 'Ibuprofen', price: 7.99, stock: 30 },
      { name: 'Aspirin', price: 4.99, stock: 50 },
      { name: 'Vitamin C', price: 9.99, stock: 25 },
      { name: 'Amoxicillin', price: 12.99, stock: 40 },
      { name: 'Cetirizine', price: 3.99, stock: 50 },
      { name: 'Omeprazole', price: 8.99, stock: 35 },
      { name: 'Metformin', price: 6.99, stock: 45 },
      { name: 'Atorvastatin', price: 10.99, stock: 30 },
      { name: 'Loratadine', price: 5.49, stock: 60 },
    ],
    rating: 4.6,
    openUntil: '7:00 PM',
  },
  {
    id: '5',
    name: 'Sunrise Pharmacy',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&q=80',
    distance: '1.8',
    address: '202 Sunrise Blvd, Bhubaneswar, Odisha',
    medicines: [
      { name: 'Paracetamol', price: 5.99, stock: 35 },
      { name: 'Ibuprofen', price: 7.99, stock: 20 },
      { name: 'Aspirin', price: 4.99, stock: 45 },
      { name: 'Vitamin C', price: 9.99, stock: 15 },
      { name: 'Amoxicillin', price: 12.99, stock: 30 },
      { name: 'Cetirizine', price: 3.99, stock: 40 },
      { name: 'Omeprazole', price: 8.99, stock: 25 },
      { name: 'Metformin', price: 6.99, stock: 35 },
      { name: 'Atorvastatin', price: 10.99, stock: 20 },
      { name: 'Loratadine', price: 5.49, stock: 50 },
    ],
    rating: 4.3,
    openUntil: '9:30 PM',
  },
  {
    id: '6',
    name: 'Golden Gate Pharmacy',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    distance: '2.5',
    address: '303 Golden Gate Ave, Bhubaneswar, Odisha',
    medicines: [
      { name: 'Paracetamol', price: 5.99, stock: 30 },
      { name: 'Ibuprofen', price: 7.99, stock: 15 },
      { name: 'Aspirin', price: 4.99, stock: 40 },
      { name: 'Vitamin C', price: 9.99, stock: 10 },
      { name: 'Amoxicillin', price: 12.99, stock: 25 },
      { name: 'Cetirizine', price: 3.99, stock: 35 },
      { name: 'Omeprazole', price: 8.99, stock: 20 },
      { name: 'Metformin', price: 6.99, stock: 30 },
      { name: 'Atorvastatin', price: 10.99, stock: 15 },
      { name: 'Loratadine', price: 5.49, stock: 45 },
    ],
    rating: 4.7,
    openUntil: '8:30 PM',
  },
  {
    id: '7',
    name: 'MediPlus Pharmacy',
    image: 'https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=800&q=80',
    distance: '1.0',
    address: '404 Health St, Bhubaneswar, Odisha',
    medicines: [
      { name: 'Paracetamol', price: 5.99, stock: 50 },
      { name: 'Ibuprofen', price: 7.99, stock: 20 },
      { name: 'Aspirin', price: 4.99, stock: 60 },
      { name: 'Vitamin C', price: 9.99, stock: 15 },
      { name: 'Amoxicillin', price: 12.99, stock: 30 },
      { name: 'Cetirizine', price: 3.99, stock: 40 },
      { name: 'Omeprazole', price: 8.99, stock: 25 },
      { name: 'Metformin', price: 6.99, stock: 35 },
      { name: 'Atorvastatin', price: 10.99, stock: 20 },
      { name: 'Loratadine', price: 5.49, stock: 50 },
    ],
    rating: 4.4,
    openUntil: '9:00 PM',
  },
  {
    id: '8',
    name: 'LifeCare Pharmacy',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&q=80',
    distance: '1.3',
    address: '505 Wellness Rd, Bhubaneswar, Odisha',
    medicines: [
      { name: 'Paracetamol', price: 5.99, stock: 40 },
      { name: 'Ibuprofen', price: 7.99, stock: 25 },
      { name: 'Aspirin', price: 4.99, stock: 55 },
      { name: 'Vitamin C', price: 9.99, stock: 20 },
      { name: 'Amoxicillin', price: 12.99, stock: 35 },
      { name: 'Cetirizine', price: 3.99, stock: 45 },
      { name: 'Omeprazole', price: 8.99, stock: 30 },
      { name: 'Metformin', price: 6.99, stock: 40 },
      { name: 'Atorvastatin', price: 10.99, stock: 25 },
      { name: 'Loratadine', price: 5.49, stock: 55 },
    ],
    rating: 4.6,
    openUntil: '8:00 PM',
  },
  // Add more pharmacies here...
];

const FilterChip = ({ label, active, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Surface
        style={[
          styles.filterChip,
          {
            backgroundColor: active ? '#2563eb' : '#f3f4f6',
            borderColor: active ? '#2563eb' : '#dddddd',
            borderWidth: 1,
          }
        ]}>
        <Text
          style={{
            color: active ? '#ffffff' : '#333333',
            fontSize: 14,
            fontWeight: active ? '600' : '400',
          }}>
          {label}
        </Text>
      </Surface>
    </Pressable>
  );
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Nearest');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showMedicinesModal, setShowMedicinesModal] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [currentMedicineIndex, setCurrentMedicineIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;

  const filters = ['Nearest', 'Rating', 'Price: Low to High', 'In Stock'];

  // Function to filter and sort pharmacies
  const getFilteredPharmacies = () => {
    let filteredPharmacies = [...mockPharmacies];

    if (searchQuery) {
      filteredPharmacies = filteredPharmacies.filter(pharmacy =>
        pharmacy.medicines.some(medicine =>
          medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    switch (activeFilter) {
      case 'Nearest':
        filteredPharmacies.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      case 'Rating':
        filteredPharmacies.sort((a, b) => b.rating - a.rating);
        break;
      case 'Price: Low to High':
        filteredPharmacies.sort((a, b) => a.medicines[0].price - b.medicines[0].price);
        break;
      case 'In Stock':
        filteredPharmacies = filteredPharmacies.filter(pharmacy =>
          pharmacy.medicines.some(medicine => medicine.stock > 0)
        );
        break;
      default:
        break;
    }

    return filteredPharmacies;
  };

  // Rotate through medicines every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!searchQuery) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setCurrentMedicineIndex((prevIndex) =>
            (prevIndex + 1) % (selectedPharmacy?.medicines.length || 1)
          );
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedPharmacy, searchQuery]);

  // Modal animation
  useEffect(() => {
    if (showFiltersModal) {
      Animated.timing(modalAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(modalAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showFiltersModal]);

  const openMedicinesModal = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setShowMedicinesModal(true);
  };

  const renderMedicineItem = (item) => {
    const isSearchedMedicine = searchQuery && item.name.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      <View
        key={item.name}
        style={[
          styles.medicineItem,
          isSearchedMedicine && { backgroundColor: '#2563eb10' },
        ]}>
        <Text variant="bodyMedium" style={{ color: '#333333' }}>
          {item.name}
        </Text>
        <Text variant="bodyMedium" style={{ color: '#666666' }}>
          ₹{(item.price * 75).toFixed(2)} | Stock: {item.stock}
        </Text>
      </View>
    );
  };

  const renderPharmacyCard = ({ item }) => {
    const searchedMedicine = item.medicines.find(medicine =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Card
        style={[styles.card, { backgroundColor: '#ffffff' }]}
        mode="elevated">
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <Card.Content style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.nameContainer}>
              <Text
                variant="titleMedium"
                style={{ color: '#333333', fontSize: 18 }}>
                {item.name}
              </Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#fbbf24" fill="#fbbf24" />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            </View>
            <Chip
              icon={() => <Navigation size={14} color="#1e40af" />}
              style={[styles.distanceChip, { backgroundColor: '#dbeafe' }]}
              textStyle={{ color: '#2563eb' }}> {/* Updated text color to blue */}
              {item.distance} km
            </Chip>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.addressContainer}>
              <MapPin size={14} color="#666666" />
              <Text
                variant="bodySmall"
                style={{ color: '#666666', marginLeft: 4 }}>
                {item.address}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <Clock size={14} color="#666666" />
              <Text
                variant="bodySmall"
                style={{ color: '#666666', marginLeft: 4 }}>
                Open until {item.openUntil}
              </Text>
            </View>
          </View>

          {searchedMedicine ? (
            <View style={[styles.medicineInfo, { backgroundColor: '#f3f4f6' }]}>
              <View>
                <Text variant="bodyMedium" style={{ color: '#333333' }}>
                  {searchedMedicine.name}
                </Text>
                <Text variant="titleMedium" style={styles.price}>
                  ₹{(searchedMedicine.price * 75).toFixed(2)}
                </Text>
              </View>
              <Text variant="bodySmall" style={styles.stockText}>
                In Stock ({searchedMedicine.stock})
              </Text>
            </View>
          ) : (
            <Animated.View style={{ opacity: fadeAnim }}>
              <View style={[styles.medicineInfo, { backgroundColor: '#f3f4f6' }]}>
                <View>
                  <Text variant="bodyMedium" style={{ color: '#333333' }}>
                    {item.medicines[currentMedicineIndex].name}
                  </Text>
                  <Text variant="titleMedium" style={styles.price}>
                    ₹{(item.medicines[currentMedicineIndex].price * 75).toFixed(2)}
                  </Text>
                </View>
                <Text variant="bodySmall" style={styles.stockText}>
                  In Stock ({item.medicines[currentMedicineIndex].stock})
                </Text>
              </View>
            </Animated.View>
          )}

          <Button
            mode="contained"
            style={styles.directionsButton}
            labelStyle={{ fontSize: 14, color: '#ffffff' }}
            icon={() => <Navigation size={16} />}
            onPress={() => openMedicinesModal(item)}>
            View All Medicines
          </Button>
        </Card.Content>
      </Card>
    );
  };

  return (
    <Provider>
      <SafeAreaView style={[styles.container, { backgroundColor: '#ffffff' }]}>
        <View style={styles.header}>
          <Text variant="displaySmall" style={[styles.appName, { color: '#333333' }]}>
            MediHunt
          </Text>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Search medicines..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={[
                styles.searchBar,
                { backgroundColor: '#f3f4f6' }
              ]}
              iconColor="#2563eb"
              placeholderTextColor="#666666"
              inputStyle={{ color: '#333333' }}
            />
            <Button
              mode="contained"
              onPress={() => setShowFiltersModal(true)}
              style={[
                styles.filterButton,
                { backgroundColor: '#2563eb' }
              ]}
              labelStyle={{ color: '#ffffff' }} 
              icon={() => <SlidersHorizontal size={18} color="#ffffff" />}>
              Filter
            </Button>
          </View>
        </View>

        <FlatList
          data={getFilteredPharmacies()}
          renderItem={renderPharmacyCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />

        {/* Medicines Modal */}
        <Modal
          visible={showMedicinesModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowMedicinesModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.squareModalContainer, { backgroundColor: '#ffffff' }]}>
              <Text variant="titleLarge" style={{ color: '#333333', marginBottom: 16 }}>
                {selectedPharmacy?.name} Medicines
              </Text>
              <ScrollView contentContainerStyle={styles.medicinesList}>
                {selectedPharmacy?.medicines.map((medicine) => renderMedicineItem(medicine))}
              </ScrollView>
              <Button
                mode="contained"
                onPress={() => setShowMedicinesModal(false)}
                style={styles.modalButton}>
                Close
              </Button>
            </View>
          </View>
        </Modal>

        {/* Filters Modal */}
        <Modal
          visible={showFiltersModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowFiltersModal(false)}>
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.modalContainer,
                { backgroundColor: '#ffffff' },
                {
                  transform: [
                    {
                      translateY: modalAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [300, 0],
                      }),
                    },
                  ],
                  opacity: modalAnim,
                },
              ]}>
              <Text variant="titleLarge" style={{ color: '#333333', marginBottom: 16 }}>
                Filters
              </Text>
              <View style={styles.modalContent}>
                {filters.map((filter) => (
                  <FilterChip
                    key={filter}
                    label={filter}
                    active={activeFilter === filter}
                    onPress={() => {
                      setActiveFilter(filter);
                      setShowFiltersModal(false);
                    }}
                  />
                ))}
              </View>
              <View style={styles.modalFooter}>
                <Button
                  mode="outlined"
                  onPress={() => {
                    setActiveFilter('Nearest'); // Reset to default filter
                    setShowFiltersModal(false);
                  }}
                  style={styles.clearFilterButton}>
                  Clear Filters
                </Button>
                <Button
                  mode="contained"
                  onPress={() => setShowFiltersModal(false)}
                  style={styles.modalButton}>
                  Apply Filters
                </Button>
              </View>
            </Animated.View>
          </View>
        </Modal>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    elevation: 2,
    borderRadius: 12,
    height: 48,
    backgroundColor: '#f3f4f6',
  },
  filterButton: {
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    backgroundColor: '#2563eb',
  },
  list: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#ffffff',
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    paddingTop: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  nameContainer: {
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    marginLeft: 4,
    color: '#fbbf24',
    fontWeight: '600',
  },
  distanceChip: {
    height: 28,
    backgroundColor: '#dbeafe',
  },
  infoContainer: {
    marginBottom: 16,
    gap: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicineInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  price: {
    color: '#2563eb',
    marginTop: 4,
    fontWeight: '600',
  },
  stockText: {
    color: '#22c55e',
    fontWeight: '500',
    fontSize:14,
  },
  directionsButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  squareModalContainer: {
    width: width * 0.8,
    height: width * 1.1,
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#ffffff',
    elevation: 5,
  },
  medicinesList: {
    paddingBottom: 16,
  },
  modalButton: {
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: '#2563eb',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 1,
    marginBottom: 8,
  },
  medicineItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#ffffff',
  },
  modalContainer: {
    width: width * 0.9,
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#ffffff',
    elevation: 5,
  },
  modalContent: {
    gap: 12,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  clearFilterButton: {
    flex: 1,
    marginRight: 8,
    borderColor: '#2563eb',
  },
});