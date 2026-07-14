import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// ==========================================
// 1. TypeScript Interface Definition
// ==========================================
interface Product {
  id: string;
  name: string;
  stock: number;
  category: string;
  location: string;
  status: string;
  imageUrl: string;
}

// ==========================================
// 2. Mock Products Data (From Slide)
// ==========================================
const products: Product[] = [
  {
    id: '1',
    name: 'Pompompurin',
    stock: 1,
    category: 'Type-C+Type-C',
    location: '3 stores',
    status: 'Active',
    imageUrl: 'https://down-th.img.susercontent.com/file/cn-11134207-7r98o-m05kjdjafft352@resize_w450_nl.webp',
  },
  {
    id: '2',
    name: 'Hello Kitty',
    stock: 2,
    category: 'Type-C+Type-C',
    location: '5 stores',
    status: 'Active',
    imageUrl: 'https://down-th.img.susercontent.com/file/cn-11134207-7r98o-m05kjdjaff4e0f@resize_w450_nl.webp',
  },
  {
    id: '3',
    name: 'Kuromi',
    stock: 5,
    category: 'Type-C+Type-C',
    location: '7 stores',
    status: 'Active',
    imageUrl: 'https://down-th.img.susercontent.com/file/cn-11134207-7r98o-m05kjeremvnr94@resize_w450_nl.webp',
  },
  {
    id: '4',
    name: 'My Melody',
    stock: 8,
    category: 'Type-C+Type-C',
    location: '8 stores',
    status: 'Active',
    imageUrl: 'https://down-th.img.susercontent.com/file/cn-11134207-7r98o-m05kjhj0l3da77@resize_w450_nl.webp',
  },
];

// ==========================================
// 3. Main Functional Component (UI Layout)
// ==========================================
const ProductsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* --- Header Styles Section --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* --- Search & Actions Bar Section --- */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#ff00f2"
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter ▼</Text>
        </TouchableOpacity>
      </View>

      {/* --- Scrollable Product List Section --- */}
      <ScrollView style={styles.productsList} showsVerticalScrollIndicator={false}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.productInfo}>
              <Image 
                source={{ uri: product.imageUrl }} 
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productDetails}>
                <Text style={styles.stockText}>Stock: {product.stock} in stock</Text>
                <Text style={styles.categoryText}>Category: {product.category}</Text>
                <Text style={styles.locationText}>Location: {product.location}</Text>
              </View>
              <View style={styles.productActions}>
                <TouchableOpacity style={styles.statusButton}>
                  <Text style={styles.statusText}>{product.status}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreButton}>
                  <Text style={styles.moreIcon}>&gt;</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.productName}>{product.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* --- Bottom Navigation Section --- */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>➕</Text>
          <Text style={styles.navText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📦</Text>
          <Text style={[styles.navText, { color: '#8B5CF6' }]}>Products</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📁</Text>
          <Text style={styles.navText}>Categories</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ==========================================
// 4. CSS for App StyleSheet (From Slides)
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff1ff4',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ff1ff4',
  },
  menuButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 18,
    color: '#ff1ff4',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  profileButton: {
    width: 30,
    height: 30,
    backgroundColor: '#8B5CF6',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 16,
    color: 'white',
  },

  // Search Container Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchIcon: {
    fontSize: 16,
    color: '#999',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  filterText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },

  // Product List Styles
  productsList: {
    flex: 1,
    padding: 20,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#cc00ff',
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productDetails: {
    flex: 1,
  },
  stockText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  moreButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: {
    fontSize: 20,
    color: '#8B5CF6',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  // Bottom Navigation Styles
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f700ff',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
});

// Export Component
export default ProductsScreen;