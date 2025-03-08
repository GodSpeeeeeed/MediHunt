import { useState, useEffect } from 'react';
import { StyleSheet, View, useColorScheme, Platform, Image, TextInput, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Button, Surface } from 'react-native-paper';
import { Navigation, Star, Clock, MapPin, Search, X } from 'lucide-react-native';

const mockPharmacies = [
  {
    id: '1',
    name: 'HealthCare Pharmacy',
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800&q=80',
    coordinate: {
      latitude: 20.296059,
      longitude: 85.824539,
    },
    medicines: [
      { name: 'Paracetamol', price: 5.99, quantity: 50 },
      { name: 'Ibuprofen', price: 6.49, quantity: 30 },
      { name: 'Aspirin', price: 4.99, quantity: 45 },
    ],
    rating: 4.5,
    openUntil: '9:00 PM',
    address: '123 Saheed Nagar, Bhubaneswar, Odisha',
  },
  {
    id: '2',
    name: 'City Drugs',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&q=80',
    coordinate: {
      latitude: 20.260296,
      longitude: 85.839452,
    },
    medicines: [
      { name: 'Ibuprofen', price: 6.49, quantity: 30 },
      { name: 'Vitamin C', price: 9.99, quantity: 20 },
      { name: 'Cetirizine', price: 3.99, quantity: 60 },
    ],
    rating: 4.2,
    openUntil: '10:00 PM',
    address: '456 Rasulgarh, Bhubaneswar, Odisha',
  },
  // Add more pharmacies with the `medicines` array
];

function WebMap({ selectedPharmacy, onMarkerClick }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');
  const L = require('leaflet');

  const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={selectedPharmacy ? [selectedPharmacy.coordinate.latitude, selectedPharmacy.coordinate.longitude] : [37.78825, -122.4324]}
      zoom={selectedPharmacy ? 16 : 14}
      style={{ height: '100%', width: '100%' }}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mockPharmacies.map((pharmacy) => (
        <Marker
          key={pharmacy.id}
          position={[pharmacy.coordinate.latitude, pharmacy.coordinate.longitude]}
          icon={customIcon}
          eventHandlers={{
            click: () => onMarkerClick(pharmacy),
          }}
        >
          <Popup>
            <Text>{pharmacy.name}</Text>
            <Text>₹{(pharmacy.medicines[0].price * 75).toFixed(2)}</Text>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

function NativeMap({ selectedPharmacy, onMarkerClick }) {
  const MapView = require('react-native-maps').default;
  const { Marker } = require('react-native-maps');

  return (
    <MapView
      style={styles.map}
      region={{
        latitude: selectedPharmacy ? selectedPharmacy.coordinate.latitude : 37.78825,
        longitude: selectedPharmacy ? selectedPharmacy.coordinate.longitude : -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {mockPharmacies.map((pharmacy) => (
        <Marker
          key={pharmacy.id}
          coordinate={pharmacy.coordinate}
          onPress={() => onMarkerClick(pharmacy)}
          image={{ uri: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png' }}
        />
      ))}
    </MapView>
  );
}

export default function MapScreen() {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showMedicinesModal, setShowMedicinesModal] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Filter pharmacies based on search query
  const filteredPharmacies = mockPharmacies.filter((pharmacy) =>
    pharmacy.medicines.some((medicine) =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Handle pharmacy selection from modal
  const handlePharmacySelect = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setShowModal(false);
  };

  // Handle marker click
  const handleMarkerClick = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setShowDetails(true);
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowModal(true);
    }
  };

  // Medicines Modal Component
  const MedicinesModal = ({ visible, onClose, pharmacy, searchQuery }) => {
    const filteredMedicines = (pharmacy.medicines || []).filter((medicine) =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedMedicines = filteredMedicines.sort((a, b) => {
      if (a.name.toLowerCase() === searchQuery.toLowerCase()) return -1;
      if (b.name.toLowerCase() === searchQuery.toLowerCase()) return 1;
      return 0;
    });

    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: '#ffffff' }]}>
            <Text variant="titleLarge" style={{ color: '#333333', marginBottom: 16 }}>
              Medicines Available
            </Text>
            {sortedMedicines.map((medicine) => (
              <View key={medicine.name} style={styles.medicineItem}>
                <Text variant="bodyMedium" style={{ color: '#333333' }}>
                  {medicine.name}
                </Text>
                <Text variant="bodySmall" style={{ color: '#666666' }}>
                  ₹{(medicine.price * 75).toFixed(2)} (Qty: {medicine.quantity})
                </Text>
              </View>
            ))}
            <Button
              mode="contained"
              onPress={onClose}
              style={styles.modalButton}
              labelStyle={{ color: '#ffffff' }} // Text color set to white
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#ffffff' }]}>
      {/* Search Bar and Button */}
      <View style={[styles.searchBarContainer, { backgroundColor: '#ffffff' }]}>
        <TextInput
          placeholder="Search for medicine..."
          placeholderTextColor="#666666"
          style={[styles.searchBar, { color: '#333333' }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button
          mode="contained"
          onPress={handleSearch}
          style={styles.searchButton}
          icon={() => <Search size={18} color="#ffffff" />}
          labelStyle={{ color: '#ffffff' }} // Text color set to white
        >
          Search
        </Button>
      </View>

      {/* Map */}
      {Platform.OS === 'web' ? (
        <WebMap selectedPharmacy={selectedPharmacy} onMarkerClick={handleMarkerClick} />
      ) : (
        <NativeMap selectedPharmacy={selectedPharmacy} onMarkerClick={handleMarkerClick} />
      )}

      {/* Modal for Pharmacy List */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: '#ffffff' }]}>
            <Text variant="titleLarge" style={{ color: '#333333', marginBottom: 16 }}>
              Select a Pharmacy
            </Text>
            {filteredPharmacies.map((pharmacy) => (
              <Pressable
                key={pharmacy.id}
                onPress={() => handlePharmacySelect(pharmacy)}
                style={styles.pharmacyItem}
              >
                <Text variant="bodyMedium" style={{ color: '#333333' }}>
                  {pharmacy.name}
                </Text>
                <Text variant="bodySmall" style={{ color: '#666666' }}>
                  {pharmacy.medicines[0].name} - ₹{(pharmacy.medicines[0].price * 75).toFixed(2)} (Qty: {pharmacy.medicines[0].quantity})
                </Text>
              </Pressable>
            ))}
            <Button
              mode="contained"
              onPress={() => setShowModal(false)}
              style={styles.modalButton}
              labelStyle={{ color: '#ffffff' }} // Text color set to white
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>

      {/* Pharmacy Details Card */}
      {showDetails && selectedPharmacy && (
        <Surface
          style={[
            styles.pharmacyCard,
            { backgroundColor: '#ffffff' },
          ]}
          elevation={4}
        >
          {/* Cross Button */}
          <Pressable
            style={styles.crossButton}
            onPress={() => setShowDetails(false)}
          >
            <View style={styles.crossButtonContainer}>
              <X size={20} color="#333333" />
            </View>
          </Pressable>

          <Image source={{ uri: selectedPharmacy.image }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <View style={styles.nameContainer}>
                <Text
                  variant="titleMedium"
                  style={{ color: '#333333', fontSize: 18, fontWeight: '600' }}
                >
                  {selectedPharmacy.name}
                </Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#fbbf24" fill="#fbbf24" />
                  <Text style={styles.rating}>{selectedPharmacy.rating}</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.addressContainer}>
                <MapPin size={14} color="#666666" />
                <Text
                  variant="bodySmall"
                  style={{ color: '#666666', marginLeft: 4 }}
                >
                  {selectedPharmacy.address}
                </Text>
              </View>
              <View style={styles.timeContainer}>
                <Clock size={14} color="#666666" />
                <Text
                  variant="bodySmall"
                  style={{ color: '#666666', marginLeft: 4 }}
                >
                  Open until {selectedPharmacy.openUntil}
                </Text>
              </View>
            </View>

            <View style={styles.medicineInfo}>
              <View>
                <Text variant="bodyMedium" style={{ color: '#333333' }}>
                  {selectedPharmacy.medicines[0].name}
                </Text>
                <Text variant="titleLarge" style={styles.price}>
                  ₹{(selectedPharmacy.medicines[0].price * 75).toFixed(2)}
                </Text>
                <Text variant="bodySmall" style={{ color: '#666666' }}>
                  In Stock: {selectedPharmacy.medicines[0].quantity}
                </Text>
              </View>
              <Button
                mode="contained"
                icon={() => <Navigation size={18} color="#ffffff" />}
                onPress={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedPharmacy.coordinate.latitude},${selectedPharmacy.coordinate.longitude}`;
                  window.open(url, '_blank');
                }}
                style={styles.directionsButton}
                labelStyle={{ fontSize: 14, color: '#ffffff' }} // Text color set to white
              >
                Get Directions
              </Button>
            </View>

            {/* Button to Show All Medicines */}
            <Button
              mode="outlined"
              onPress={() => setShowMedicinesModal(true)}
              style={styles.showAllMedicinesButton}
              labelStyle={{ color: '#333333' }} // Text color set to black
            >
              Show All Medicines
            </Button>
          </View>
        </Surface>
      )}

      {/* Medicines Modal */}
      {selectedPharmacy && (
        <MedicinesModal
          visible={showMedicinesModal}
          onClose={() => setShowMedicinesModal(false)}
          pharmacy={selectedPharmacy}
          searchQuery={searchQuery}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchBarContainer: {
    position: 'absolute',
    top: 40, // Moved the search bar slightly lower
    left: 20,
    right: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 3,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  searchButton: {
    borderRadius: 12,
    backgroundColor: '#2563eb',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    backgroundColor: '#ffffff',
  },
  pharmacyItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  modalButton: {
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: '#2563eb',
  },
  pharmacyCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  crossButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  crossButtonContainer: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#f3f4f6',
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
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
  },
  price: {
    color: '#2563eb',
    marginTop: 4,
    fontWeight: '600',
  },
  directionsButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
  },
  showAllMedicinesButton: {
    marginTop: 16,
    borderColor: '#2563eb',
  },
  medicineItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});