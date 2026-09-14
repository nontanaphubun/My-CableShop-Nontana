import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const initialProducts = [
  {
    id: '1',
    name: 'USB-C Fast Charge Cable',
    type: 'USB-C',
    price: 199,
    stock: 15,
  },
  {
    id: '2',
    name: 'Lightning Cable',
    type: 'Lightning',
    price: 249,
    stock: 10,
  },
  {
    id: '3',
    name: 'USB-C to USB-C Cable',
    type: 'USB-C to USB-C',
    price: 299,
    stock: 8,
  },
];

export default function HomeScreen() {
  const API_URL = 'http://119.59.102.161:3087';
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<(typeof initialProducts)[number] | null>(null);
  const [cart, setCart] = useState<(typeof initialProducts)[number][]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        const formattedProducts = data.map((item: any) => ({
          id: String(item.Product_ID),
          name: item.Name,
          type: item.Category,
          price: 0,
          stock: item.Stock,
        }));

        setProducts(formattedProducts);
      })
      .catch((error) => {
        console.error('GET products error:', error);
      });
  }, []);

const [newProduct, setNewProduct] = useState({
  name: '',
  type: '',
  price: '',
  stock: '',
});

  const addToCart = (product: (typeof initialProducts)[number]) => {
  setCart([...cart, product]);
};

const removeFromCart = (index: number) => {
  setCart(cart.filter((_, i) => i !== index));
};

const handleAddProduct = async () => {
  if (
    !newProduct.name ||
    !newProduct.type ||
    !newProduct.price ||
    !newProduct.stock
  ) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Productcode: `USB-C-${Date.now()}`,
        Name: newProduct.name,
        Stock: Number(newProduct.stock),
        Category: newProduct.type,
        Location: 'Sriracha',
        Status: 'Active',
        image: null,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      return;
    }

    const refreshResponse = await fetch(`${API_URL}/api/products`);
    const refreshData = await refreshResponse.json();

    const formattedProducts = refreshData.map((item: any) => ({
      id: String(item.Product_ID),
      name: item.Name,
      type: item.Category,
      price: 0,
      stock: item.Stock,
    }));

    setProducts(formattedProducts);

    setNewProduct({
      name: '',
      type: '',
      price: '',
      stock: '',
    });

    setShowAddForm(false);
  } catch (error) {
    console.error('Add product error:', error);
  }
};

    const filteredProducts = products.filter((product) =>
     product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
  setProducts(products.filter((product) => product.id !== id));
};

const handleEdit = (product: (typeof initialProducts)[number]) => {
  setEditingProduct({ ...product });
};

const handleSaveEdit = async () => {
  if (!editingProduct) return;

  try {
    const response = await fetch(
      `${API_URL}/api/products/${editingProduct.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: editingProduct.name,
          Stock: Number(editingProduct.stock),
          Category: editingProduct.type,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      return;
    }

    const refreshResponse = await fetch(`${API_URL}/api/products`);
    const refreshData = await refreshResponse.json();

    const formattedProducts = refreshData.map((item: any) => ({
      id: String(item.Product_ID),
      name: item.Name,
      type: item.Category,
      price: 0,
      stock: item.Stock,
    }));

    setProducts(formattedProducts);
    setEditingProduct(null);
  } catch (error) {
    console.error('Edit product error:', error);
  }
};

  return (

    <ScrollView style={styles.container}>
{/* Header */}
<View style={styles.header}>
  <View>
    <Text style={styles.shopName}>CHARGEHUB</Text>

    <Text style={styles.logo}>
      Cable Collection
    </Text>

    <Text style={styles.subtitle}>
      Find your perfect cable
    </Text>
  </View>

  <TouchableOpacity
    style={styles.cartCircle}
    onPress={() => setShowCart(true)}
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
</View>

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
  onPress={() => setShowCheckout(true)}
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

      {/* Welcome */}
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeTitle}>
          สายชาร์จคุณภาพดี
        </Text>

        <Text style={styles.welcomeText}>
          เลือกสายชาร์จที่เหมาะกับอุปกรณ์ของคุณ
        </Text>

        <TouchableOpacity style={styles.shopButton}>
          <Text style={styles.shopButtonText}>
            ดูสินค้าทั้งหมด
          </Text>
        </TouchableOpacity>
      </View>

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

{/* Search and Add Product */}
<View style={styles.searchRow}>
  <TextInput
    style={styles.searchInput}
    placeholder="🔍  Search products..."
    value={searchQuery}
    onChangeText={setSearchQuery}
  />

<TouchableOpacity
  style={styles.addProductButton}
  onPress={() => setShowAddForm(true)}
>
    <Text style={styles.addProductText}>
      ＋ ADD PRODUCT
    </Text>
  </TouchableOpacity>
</View>
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
            <Text style={styles.cableIcon}>🔌</Text>
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

<TouchableOpacity
  style={styles.editButton}
  onPress={() => handleEdit(product)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F6',
  },

header: {
  backgroundColor: '#1F6B4F',
  paddingTop: 45,
  paddingBottom: 25,
  paddingHorizontal: 25,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

shopName: {
  fontSize: 13,
  fontWeight: 'bold',
  color: '#F4C542',
  letterSpacing: 2,
},

cartCircle: {
  width: 58,
  height: 58,
  borderRadius: 29,
  backgroundColor: '#F4C542',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
},

cartBadge: {
  position: 'absolute',
  top: -4,
  right: -4,
  minWidth: 22,
  height: 22,
  borderRadius: 11,
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
    backgroundColor: '#1F6B4F',
    paddingVertical: 12,
    borderRadius: 10,
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
  backgroundColor: '#1F6B4F',
  height: 48,
  paddingHorizontal: 18,
  borderRadius: 12,
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
    color: '#1F6B4F',
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
    height: 36,
    backgroundColor: '#1F6B4F',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  deleteButton: {
    height: 36,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFB3B3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteButtonText: {
    color: '#E53935',
    fontSize: 12,
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