require('dotenv').config();
const mysql = require('mysql2/promise');
const express = require('express');
const cors = require('cors');

const app = express();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+07:00'
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'CHARGEHUB API is running'
  });
});
const products = [
  {
    id: 1,
    name: 'USB-C Fast Charge Cable',
    type: 'USB-C',
    price: 199,
    stock: 15
  },
  {
    id: 2,
    name: 'Lightning Cable',
    type: 'Lightning',
    price: 249,
    stock: 10
  },
  {
    id: 3,
    name: 'USB-C to USB-C Cable',
    type: 'USB-C to USB-C',
    price: 299,
    stock: 8
  }
];

app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM products ORDER BY Product_ID ASC'
    );

    res.json(rows);
  } catch (error) {
    console.error('GET products error:', error.message);
    res.status(500).json({
      message: 'ไม่สามารถดึงข้อมูลสินค้าได้'
    });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const {
      Productcode,
      Name,
      Stock,
      Category,
      Location,
      Status,
      image
    } = req.body;

    if (!Name || Stock === undefined) {
      return res.status(400).json({
        message: 'กรุณากรอกข้อมูลสินค้าให้ครบ'
      });
    }

    const [result] = await pool.query(
      `INSERT INTO products
      (Productcode, Name, Stock, Category, Location, Status, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        Productcode || null,
        Name,
        Number(Stock),
        Category || null,
        Location || null,
        Status || 'Active',
        image || null
      ]
    );

    res.status(201).json({
      message: 'เพิ่มสินค้าสำเร็จ',
      productId: result.insertId
    });

  } catch (error) {
    console.error('POST products error:', error.message);
    res.status(500).json({
      message: 'ไม่สามารถเพิ่มสินค้าได้'
    });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Stock, Category } = req.body;

    if (!Name || Stock === undefined) {
      return res.status(400).json({
        message: 'กรุณากรอกข้อมูลสินค้าให้ครบ'
      });
    }

    const [result] = await pool.query(
      `UPDATE products
       SET Name = ?, Stock = ?, Category = ?
       WHERE Product_ID = ?`,
      [
        Name,
        Number(Stock),
        Category || null,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'ไม่พบสินค้า'
      });
    }

    res.json({
      message: 'แก้ไขสินค้าสำเร็จ'
    });

  } catch (error) {
    console.error('PUT products error:', error.message);
    res.status(500).json({
      message: 'ไม่สามารถแก้ไขสินค้าได้'
    });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM products WHERE Product_ID = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบสินค้า'
      });
    }

    res.json({
      success: true,
      message: 'ลบสินค้าสำเร็จ'
    });

  } catch (error) {
    console.error('DELETE products error:', error.message);
    res.status(500).json({
      success: false,
      message: 'ไม่สามารถลบสินค้าได้'
    });
  }
});

async function testMySQL() {
  try {
    const conn = await pool.getConnection();
    console.log('Connected to MySQL:', process.env.DB_NAME);
    conn.release();
  } catch (err) {
    console.error('MySQL Failed:', err.message);
    process.exit(1);
  }
}

testMySQL();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});