import { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const initialProducts = [
  {
    id: '1',
    name: 'USB-C Fast Charge Cable',
    type: 'USB-C',
    price: 199,
    stock: 15,
    image: '',
  },
  {
    id: '2',
    name: 'Lightning Cable',
    type: 'Lightning',
    price: 249,
    stock: 10,
    image: '',
  },
  {
    id: '3',
    name: 'USB-C to USB-C Cable',
    type: 'USB-C to USB-C',
    price: 299,
    stock: 8,
    image: '',
  },
];

const styles = StyleSheet.create({
 header: {
  backgroundColor: '#FFF7F7',
  paddingHorizontal: 24,
  paddingTop: 28,
  paddingBottom: 28,
  borderBottomLeftRadius: 28,
  borderBottomRightRadius: 28,
  overflow: 'hidden',
  position: 'relative',
zIndex: 10,
},

headerTop: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
},

brand: {
  fontSize: 22,
  fontWeight: '900',
  letterSpacing: 1,
  color: '#111111',
},

brandRed: {
  color: '#E53935',
},

brandSub: {
  fontSize: 9,
  letterSpacing: 2,
  color: '#888888',
  marginTop: 2,
},

heroTitle: {
  fontSize: 42,
  fontWeight: '900',
  color: '#7F1717',
  marginTop: 28,
  lineHeight: 44,
},

heroTitleRed: {
  fontSize: 42,
  fontWeight: '900',
  color: '#E53935',
  lineHeight: 44,
},

heroSubtitle: {
  fontSize: 11,
  letterSpacing: 3,
  color: '#A66A6A',
  marginTop: 12,
  lineHeight: 18,
},

headerActions: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  position: 'relative',
  zIndex: 9999,
  elevation: 10,
},

searchBox: {
  height: 58,
  backgroundColor: '#FFFFFF',
  borderRadius: 30,
  marginTop: 25,
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 18,
  paddingRight: 7,
  borderWidth: 1,
  borderColor: '#F3D5D5',
},

searchIcon: {
  fontSize: 28,
  color: '#D32F2F',
  marginRight: 8,
},

searchButton: {
  width: 45,
  height: 45,
  borderRadius: 23,
  backgroundColor: '#E53935',
  justifyContent: 'center',
  alignItems: 'center',
},

searchButtonText: {
  color: '#FFFFFF',
  fontSize: 25,
  fontWeight: 'bold',
},

powerText: {
  textAlign: 'right',
  color: '#C62828',
  fontSize: 13,
  fontWeight: '600',
  fontStyle: 'italic',
  marginTop: 18,
  marginRight: 10,
},

container: {
  flex: 1,
  backgroundColor: '#FFF7F7',
},
loginBox: {
  backgroundColor: '#FFFFFF',
  marginHorizontal: 20,
  marginTop: 20,
  marginBottom: 20,
  padding: 24,
  borderRadius: 24,
  borderWidth: 1,
  borderColor: '#F3D5D5',
},

loginWelcome: {
  fontSize: 28,
  fontWeight: '900',
  color: '#222222',
  marginBottom: 6,
},

loginSubtitle: {
  fontSize: 13,
  color: '#999999',
  marginBottom: 20,
},

loginInput: {
  height: 48,
  backgroundColor: '#FFF7F7',
  borderWidth: 1,
  borderColor: '#F0CACA',
  borderRadius: 14,
  paddingHorizontal: 16,
  fontSize: 14,
  color: '#222222',
  marginBottom: 12,
},

loginButton: {
  height: 48,
  backgroundColor: '#E53935',
  borderRadius: 24,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 4,
},

loginButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '900',
},

loginPower: {
  textAlign: 'center',
  color: '#D66A6A',
  fontSize: 11,
  fontWeight: '600',
  fontStyle: 'italic',
  marginTop: 16,
},

shopName: {
  fontSize: 13,
  fontWeight: 'bold',
  color: '#F4C542',
  letterSpacing: 2,
},

logoutButton: {
  height: 44,
  paddingHorizontal: 18,
  borderRadius: 22,
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#E53935',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 8,
  zIndex: 9999,
  elevation: 10,
},

logoutButtonText: {
  color: '#E53935',
  fontSize: 14,
  fontWeight: 'bold',
},

cartCircle: {
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  zIndex: 9999,
  elevation: 10,
  borderWidth: 1,
  borderColor: '#EEEEEE',
},

cartBadge: {
  position: 'absolute',
  top: -5,
  right: -5,
  minWidth: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: '#E53935',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 4,
},

cartBadgeText: {
  color: '#FFFFFF',
  fontSize: 12,
  fontWeight: 'bold',
},

cartIcon: {
  fontSize: 28,
},

  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 16,
    color: '#E8F5EF',
    marginTop: 5,
  },

  welcomeBox: {
    margin: 20,
    padding: 20,
backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },

  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222222',
  },

  welcomeText: {
    fontSize: 15,
    color: '#666666',
    marginTop: 8,
    marginBottom: 15,
  },

shopButton: {
  height: 45,
  backgroundColor: '#E53935',
  borderRadius: 24,
  justifyContent: 'center',
  alignItems: 'center',
},

  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

productsHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginHorizontal: 20,
  marginTop: 20,
  marginBottom: 15,
},

productsTitle: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#222222',
},

productCount: {
  fontSize: 14,
  color: '#777777',
  marginTop: 4,
},

totalBox: {
  backgroundColor: '#E8F5EF',
  paddingVertical: 8,
  paddingHorizontal: 18,
  borderRadius: 12,
  alignItems: 'center',
},

totalNumber: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#1F6B4F',
},

totalText: {
  fontSize: 10,
  fontWeight: 'bold',
  color: '#777777',
},

searchRow: {
  flexDirection: 'row',
  marginHorizontal: 20,
  marginBottom: 20,
  gap: 10,
},

searchInput: {
  flex: 1,
  height: 48,
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  paddingHorizontal: 15,
  fontSize: 15,
  borderWidth: 1,
  borderColor: '#E0E0E0',
},

addProductButton: {
  height: 45,
  paddingHorizontal: 20,
  borderRadius: 24,
  backgroundColor: '#E53935',
  justifyContent: 'center',
  alignItems: 'center',
},

addProductText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: 'bold',
},

  productCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  productImage: {
    width: 75,
    height: 75,
    borderRadius: 12,
    backgroundColor: '#E8F5EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cableIcon: {
    fontSize: 35,
  },

  productInfo: {
    flex: 1,
    marginLeft: 15,
  },

  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },

  productType: {
    fontSize: 13,
    color: '#777777',
    marginTop: 4,
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E53935',
    marginTop: 5,
  },

  stock: {
    fontSize: 12,
    color: '#777777',
    marginTop: 2,
  },

  actionButtons: {
    width: 90,
    marginLeft: 10,
    gap: 8,
  },

editButton: {
  backgroundColor: '#7F1717',
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 8,
},

  editButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

deleteButton: {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#E53935',
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 8,
},

deleteButtonText: {
  color: '#E53935',
  fontWeight: 'bold',
},

  editForm: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DDE9E3',
  },

  editFormTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F6B4F',
    marginBottom: 15,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555555',
    marginBottom: 5,
    marginTop: 8,
  },

  formInput: {
    height: 45,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FAFAFA',
    fontSize: 14,
  },

  formButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },

  cancelButton: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#777777',
    fontWeight: 'bold',
    fontSize: 13,
  },

  saveButton: {
    flex: 1,
    height: 42,
    backgroundColor: '#1F6B4F',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  cartPanel: {
  backgroundColor: '#FFFFFF',
  marginHorizontal: 20,
  marginTop: 10,
  marginBottom: 20,
  padding: 20,
  borderRadius: 15,
  borderWidth: 1,
  borderColor: '#DDE9E3',
},

cartHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 15,
},

cartTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#1F6B4F',
},

closeCart: {
  fontSize: 20,
  color: '#777777',
},

emptyCart: {
  textAlign: 'center',
  color: '#777777',
  paddingVertical: 20,
},

cartItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#EEEEEE',
},

cartItemInfo: {
  flex: 1,
},

cartItemName: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#222222',
},

cartItemPrice: {
  fontSize: 14,
  color: '#1F6B4F',
  marginTop: 4,
},

removeCartButton: {
  paddingHorizontal: 10,
  paddingVertical: 7,
  borderWidth: 1,
  borderColor: '#FFB3B3',
  borderRadius: 6,
},

removeCartText: {
  color: '#E53935',
  fontSize: 11,
  fontWeight: 'bold',
},

cartTotal: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
  marginBottom: 15,
},

cartTotalText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#222222',
},

cartTotalPrice: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#1F6B4F',
},

checkoutButton: {
  height: 45,
  backgroundColor: '#1F6B4F',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
},

checkoutText: {
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontSize: 14,
},

checkoutPanel: {
  backgroundColor: '#FFFFFF',
  marginHorizontal: 20,
  marginTop: 10,
  marginBottom: 20,
  padding: 20,
  borderRadius: 15,
  borderWidth: 1,
  borderColor: '#DDE9E3',
},

checkoutTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#1F6B4F',
},

checkoutItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#EEEEEE',
},

checkoutItemName: {
  fontSize: 14,
  color: '#333333',
  flex: 1,
},

checkoutItemPrice: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#1F6B4F',
},

checkoutTotal: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
  marginBottom: 15,
},

checkoutTotalText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#222222',
},

checkoutTotalPrice: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#1F6B4F',
},

confirmButton: {
  height: 45,
  backgroundColor: '#1F6B4F',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
},

confirmButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: 'bold',
},

backButton: {
  height: 42,
  marginTop: 10,
  borderWidth: 1,
  borderColor: '#1F6B4F',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
},

backButtonText: {
  color: '#1F6B4F',
  fontSize: 13,
  fontWeight: 'bold',
},

  bottomSpace: {
    height: 40,
  },

  addButton: {
  width: 36,
  height: 36,
  borderRadius: 8,
  backgroundColor: '#F4C542',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 8,
},

addButtonText: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#1F6B4F',
},

});

export default function HomeScreen() {
  const API_URL = 'http://119.59.102.161:3087';

  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editingProduct, setEditingProduct] = useState<(typeof initialProducts)[number] | null>(null);
  const [cart, setCart] = useState<(typeof initialProducts)[number][]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
 const handleLogin = async () => {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data.message);
      return;
    }

    setAuthToken(data.token);
    setUserRole(data.user.role);

    console.log('Login สำเร็จ');
    console.log('Role:', data.user.role);
  } catch (error) {
    console.error('Login error:', error);
  }
};

const handleLogout = () => {
  setAuthToken('');
  setUserRole('');
  setUsername('');
  setPassword('');
};

  const apiCall = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      ...(options.headers || {}),
    },
  });

  return response;
};

useEffect(() => {
  if (!authToken) return;

  const loadProducts = async () => {
    try {
      const response = await apiCall('/api/products?page=1&limit=20');

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      const formattedProducts = data.items.map((item: any) => ({
        id: String(item.Product_ID),
        name: item.Name,
        type: item.Category,
        price: Number(item.Price),
        stock: item.Stock,
        image: item.image,
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error('GET products error:', error);
    }
  };

  loadProducts();
}, [authToken]);

const [newProduct, setNewProduct] = useState({
  name: '',
  type: '',
  price: '',
  stock: '',
  image: '',
});

  const addToCart = (product: (typeof initialProducts)[number]) => {
  setCart([...cart, product]);
};

const removeFromCart = (index: number) => {
  setCart(cart.filter((_, i) => i !== index));
};

const handleSearch = async () => {
  try {
const response = await apiCall(
  `/api/products?q=${encodeURIComponent(searchQuery)}&page=1&limit=20`
);

    const data = await response.json();

    const formattedProducts = data.items.map((item: any) => ({
      id: String(item.Product_ID),
      name: item.Name,
      type: item.Category,
      price: Number(item.Price),
      stock: item.Stock,
      image: item.image,
    }));

    setProducts(formattedProducts);
  } catch (error) {
    console.error('Search products error:', error);
  }
};

const handleAddProduct = async () => {
  if (
    !newProduct.name ||
    !newProduct.type ||
    !newProduct.price ||
    !newProduct.stock
  ) {
    console.error('Add product error: กรุณากรอกข้อมูลให้ครบ');
    return;
  }

  try {
    const response = await apiCall('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Productcode: `USB-C-${Date.now()}`,
        Name: newProduct.name,
        Price: Number(newProduct.price),
        Stock: Number(newProduct.stock),
        Category: newProduct.type,
        Location: 'Sriracha',
        Status: 'Active',
        image: newProduct.image,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Add product failed:', response.status, data);
      return;
    }

    setProducts((currentProducts) => [
      ...currentProducts,
      {
        id: String(data.productId),
        name: newProduct.name,
        type: newProduct.type,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        image: newProduct.image,
      },
    ]);

    setNewProduct({
      name: '',
      type: '',
      price: '',
      stock: '',
      image: '',
    });

    setShowAddForm(false);

  } catch (error) {
    console.error('Add product error:', error);
  }
};

    const filteredProducts = products.filter((product) =>
     product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

const handleDelete = async (id: string) => {
  const confirmed = window.confirm(
    'ต้องการลบสินค้านี้ใช่หรือไม่?'
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await apiCall(`/api/products/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data.message);
      return;
    }

    setProducts(
      products.filter((product) => product.id !== id)
    );

    console.log(data.message);

  } catch (error) {
    console.error('Delete product error:', error);
  }
};

const handleEdit = (product: (typeof initialProducts)[number]) => {
  setEditingProduct({ ...product });

  setTimeout(() => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, 100);
};

const handleSaveEdit = async () => {
  if (!editingProduct) return;

  try {
const response = await apiCall(
  `/api/products/${editingProduct.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: editingProduct.name,
          Stock: Number(editingProduct.stock),
          Price: Number(editingProduct.price),
          Category: editingProduct.type,
          image: editingProduct.image,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      return;
    }

    const refreshResponse = await apiCall('/api/products?page=1&limit=20');
    const refreshData = await refreshResponse.json();

const formattedProducts = refreshData.items.map((item: any) => ({
      id: String(item.Product_ID),
      name: item.Name,
      type: item.Category,
      price: Number(item.Price),
      stock: item.Stock,
    }));

    setProducts(formattedProducts);
    setEditingProduct(null);
  } catch (error) {
    console.error('Edit product eฆrror:', error);
  }
};

return (
  <ScrollView

  ref={scrollViewRef}
  style={styles.container}
>

{!authToken && (
  <View style={styles.loginBox}>
    <Text style={styles.loginWelcome}>Welcome Back ♡</Text>

    <Text style={styles.loginSubtitle}>
      Log in to your ChargeHub account
    </Text>

    <TextInput
      style={styles.loginInput}
      placeholder="Username"
      placeholderTextColor="#999"
      value={username}
      onChangeText={setUsername}
    />

    <TextInput
      style={styles.loginInput}
      placeholder="Password"
      placeholderTextColor="#999"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />


    <TouchableOpacity
      style={styles.loginButton}
      onPress={handleLogin}
    >
      <Text style={styles.loginButtonText}>
        Login                         →
      </Text>
    </TouchableOpacity>

    <Text style={styles.loginPower}>
      ✦  Good Power. Better You ♡
    </Text>
      </View>
    )}

{/* Header */}
<View style={styles.header}>
  <View style={styles.headerTop}>

    {/* Logo */}
    <View>
      <Text style={styles.brand}>
        CHARGE<Text style={styles.brandRed}>HUB</Text>
      </Text>

      <Text style={styles.brandSub}>
        CABLES FOR A BRIGHTER YOU
      </Text>

      <Text style={styles.heroTitle}>
        Cable
      </Text>

      <Text style={styles.heroTitleRed}>
        Collection ♡
      </Text>

      <Text style={styles.heroSubtitle}>
        SMALL CABLES{"\n"}BIGGER MOMENTS
      </Text>
    </View>

    {/* Cart + Logout */}
    <View style={styles.headerActions}>

      <TouchableOpacity
        style={styles.cartCircle}
        onPress={() => alert('CLICK CART')}
      >
        <Text style={styles.cartIcon}>🛒</Text>

        {cart.length > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>
              {cart.length}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {authToken && (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => alert('CLICK LOGOUT')}
        >
          <Text style={styles.logoutButtonText}>
            ⇥ Logout
          </Text>
        </TouchableOpacity>
      )}

    </View>
  </View>

  {/* Search */}
  <View style={styles.searchBox}>
    <Text style={styles.searchIcon}>⌕</Text>

    <TextInput
      style={styles.searchInput}
      placeholder="Search cables, brands, or categories..."
      placeholderTextColor="#999"
      value={searchQuery}
      onChangeText={setSearchQuery}
    />

    <TouchableOpacity
      style={styles.searchButton}
      onPress={handleSearch}
    >
      <Text style={styles.searchButtonText}>→</Text>
    </TouchableOpacity>
  </View>

  <Text style={styles.powerText}>
    Good Power. Better You ♡
  </Text>
</View>  {/* Search */}

{showCart && (
  <View style={styles.cartPanel}>
    <View style={styles.cartHeader}>
      <Text style={styles.cartTitle}>🛒 Shopping Cart</Text>

      <TouchableOpacity onPress={() => setShowCart(false)}>
        <Text style={styles.closeCart}>✕</Text>
      </TouchableOpacity>
    </View>

    {cart.length === 0 ? (
      <Text style={styles.emptyCart}>
        Your cart is empty
      </Text>
    ) : (
      <>
        {cart.map((product, index) => (
          <View style={styles.cartItem} key={`${product.id}-${index}`}>
            <View style={styles.cartItemInfo}>
              <Text style={styles.cartItemName}>
                {product.name}
              </Text>

              <Text style={styles.cartItemPrice}>
                ฿{product.price}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.removeCartButton}
              onPress={() => removeFromCart(index)}
            >
              <Text style={styles.removeCartText}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.cartTotal}>
          <Text style={styles.cartTotalText}>
            TOTAL
          </Text>

          <Text style={styles.cartTotalPrice}>
            ฿{cart.reduce((sum, product) => sum + product.price, 0)}
          </Text>
        </View>

<TouchableOpacity
  style={styles.checkoutButton}
onPress={() => alert('CLICK CHECKOUT')}
>
  <Text style={styles.checkoutText}>
    CHECKOUT
  </Text>
</TouchableOpacity>
      </>
    )}
  </View>
)}

{showCheckout && (
  <View style={styles.checkoutPanel}>
    <View style={styles.cartHeader}>
      <Text style={styles.checkoutTitle}>
        Order Summary
      </Text>

      <TouchableOpacity
        onPress={() => setShowCheckout(false)}
      >
        <Text style={styles.closeCart}>✕</Text>
      </TouchableOpacity>
    </View>

    {cart.map((product, index) => (
      <View
        style={styles.checkoutItem}
        key={`${product.id}-${index}`}
      >
        <Text style={styles.checkoutItemName}>
          {product.name}
        </Text>

        <Text style={styles.checkoutItemPrice}>
          ฿{product.price}
        </Text>
      </View>
    ))}

    <View style={styles.checkoutTotal}>
      <Text style={styles.checkoutTotalText}>
        TOTAL
      </Text>

      <Text style={styles.checkoutTotalPrice}>
        ฿{cart.reduce(
          (sum, product) => sum + product.price,
          0
        )}
      </Text>
    </View>

    <TouchableOpacity
      style={styles.confirmButton}
      onPress={() => {
        setCart([]);
        setShowCheckout(false);
        setShowCart(false);
      }}
    >
      <Text style={styles.confirmButtonText}>
        ✓ CONFIRM ORDER
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.backButton}
      onPress={() => setShowCheckout(false)}
    >
      <Text style={styles.backButtonText}>
        BACK TO CART
      </Text>
    </TouchableOpacity>
  </View>
)}

{/* Products Header */}
<View style={styles.productsHeader}>
  <View>
    <Text style={styles.productsTitle}>
      Your Products
    </Text>

    <Text style={styles.productCount}>
      {filteredProducts.length} products
    </Text>
  </View>

  <View style={styles.totalBox}>
    <Text style={styles.totalNumber}>
      {products.length}
    </Text>

    <Text style={styles.totalText}>
      TOTAL
    </Text>
  </View>
</View>

{/* Add Product */}
<TouchableOpacity
  style={styles.addProductButton}
  onPress={() => setShowAddForm(true)}
>
  <Text style={styles.addProductText}>
    ＋ ADD PRODUCT
  </Text>
</TouchableOpacity>

{showAddForm && (
  <View style={styles.editForm}>
    <Text style={styles.editFormTitle}>Add New Product</Text>

    <Text style={styles.inputLabel}>Product Name</Text>
    <TextInput
      style={styles.formInput}
      placeholder="เช่น USB-C Cable 2M"
      value={newProduct.name}
      onChangeText={(text) =>
        setNewProduct({ ...newProduct, name: text })
      }
    />

    <Text style={styles.inputLabel}>Type</Text>
    <TextInput
      style={styles.formInput}
      placeholder="เช่น USB-C"
      value={newProduct.type}
      onChangeText={(text) =>
        setNewProduct({ ...newProduct, type: text })
      }
    />

    <Text style={styles.inputLabel}>Price</Text>
    <TextInput
      style={styles.formInput}
      placeholder="เช่น 159"
      keyboardType="numeric"
      value={newProduct.price}
      onChangeText={(text) =>
        setNewProduct({ ...newProduct, price: text })
      }
    />

    <Text style={styles.inputLabel}>Stock</Text>
    <TextInput
      style={styles.formInput}
      placeholder="เช่น 20"
      keyboardType="numeric"
      value={newProduct.stock}
      onChangeText={(text) =>
        setNewProduct({ ...newProduct, stock: text })
      }
    />

    <Text style={styles.inputLabel}>Image</Text>

<input
  type="file"
  accept="image/*"
  onChange={(event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setNewProduct({
        ...newProduct,
        image: reader.result as string,
      });
    };

    reader.readAsDataURL(file);
  }}
/>

{newProduct.image && (
  <img
    src={newProduct.image}
    alt="Preview"
    style={{
      width: 100,
      height: 100,
      objectFit: 'cover',
      marginTop: 10,
      borderRadius: 12,
    }}
  />
)}

    <View style={styles.formButtons}>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setShowAddForm(false)}
      >
        <Text style={styles.cancelButtonText}>CANCEL</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleAddProduct}
      >
        <Text style={styles.saveButtonText}>ADD PRODUCT</Text>
      </TouchableOpacity>
    </View>
  </View>
)}

{editingProduct && (
  <View style={styles.editForm}>
    <Text style={styles.editFormTitle}>
      Edit Product
    </Text>

    <Text style={styles.inputLabel}>
      Product Name
    </Text>

    <TextInput
      style={styles.formInput}
      value={editingProduct.name}
      onChangeText={(text) =>
        setEditingProduct({
          ...editingProduct,
          name: text,
        })
      }
    />

    <Text style={styles.inputLabel}>
      Type
    </Text>

    <TextInput
      style={styles.formInput}
      value={editingProduct.type}
      onChangeText={(text) =>
        setEditingProduct({
          ...editingProduct,
          type: text,
        })
      }
    />

    <Text style={styles.inputLabel}>
      Price
    </Text>

    <TextInput
      style={styles.formInput}
      value={String(editingProduct.price)}
      keyboardType="numeric"
      onChangeText={(text) =>
        setEditingProduct({
          ...editingProduct,
          price: Number(text) || 0,
        })
      }
    />

    <Text style={styles.inputLabel}>
      Stock
    </Text>

    <TextInput
      style={styles.formInput}
      value={String(editingProduct.stock)}
      keyboardType="numeric"
      onChangeText={(text) =>
        setEditingProduct({
          ...editingProduct,
          stock: Number(text) || 0,
        })
      }
    />

<View style={styles.formButtons}>
  <TouchableOpacity
    style={styles.cancelButton}
    onPress={() => setEditingProduct(null)}
  >
    <Text style={styles.cancelButtonText}>
      CANCEL
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.saveButton}
    onPress={handleSaveEdit}
  >
    <Text style={styles.saveButtonText}>
      SAVE
    </Text>
  </TouchableOpacity>
</View>

</View>
)}
{filteredProducts.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <View style={styles.productImage}>
          {product.image ? (
  <img
    src={product.image}
    alt={product.name}
    style={{
      width: 75,
      height: 75,
      objectFit: 'cover',
      borderRadius: 12,
    }}
  />
) : (
  <Text style={styles.cableIcon}>🔌</Text>
)}

          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productName}>
              {product.name}
            </Text>

            <Text style={styles.productType}>
              ประเภท: {product.type}
            </Text>

            <Text style={styles.price}>
              ฿{product.price}
            </Text>

            <Text style={styles.stock}>
              เหลือ {product.stock} ชิ้น
            </Text>
          </View>

{userRole === 'admin' && (
  <>
    <TouchableOpacity
      style={styles.editButton}
      onPress={() => {
  alert('EDIT CLICKED');
  handleEdit(product);
}}
    >
      <Text style={styles.editButtonText}>
        ✏️ Edit
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDelete(product.id)}
    >
      <Text style={styles.deleteButtonText}>
        🗑 Delete
      </Text>
    </TouchableOpacity>
  </>
)}

<TouchableOpacity
  style={styles.addButton}
  onPress={() => addToCart(product)}
>
  <Text style={styles.addButtonText}>
    +
  </Text>
</TouchableOpacity>

    </View>
))}

      {/* Bottom space */}
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
  }