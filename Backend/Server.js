const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = process.env.PORT 

app.use(cors());
app.use(express.json());

/* DB CONNECTION */
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

/* USER REGISTER */
app.post("/api/register", (req, res) => {

  const { name, phone, district, city, pincode, email, userId, password } = req.body;

  const sql = `
    INSERT INTO users 
    (name, phone, district, city, pincode, email, userId, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, phone, district, city, pincode, email, userId, password], (err) => {

    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    res.json({ success: true });

  });

});

/* USER LOGIN */
app.post("/api/login", (req, res) => {

  const { userId, password } = req.body;

  const sql = "SELECT * FROM users WHERE BINARY userId = ?";

  db.query(sql, [userId], (err, result) => {

    if (err) return res.json({ success: false });

    if (result.length === 0) return res.json({ success: false });

    const user = result[0];

    if (user.password === password) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false });
    }

  });

});

/* ✅ SHOP REGISTER (FIXED) */
app.post("/api/shop/register", (req, res) => {

  const { name, shopName, address, phone, userId, password } = req.body;

  const sql = `
    INSERT INTO shopkeepers 
    (name, shopName, address, phone, userId, password)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, shopName, address, phone, userId, password], (err, result) => {

    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    // 🔥 IMPORTANT FIX
    res.json({
      success: true,
      user: {
        id: result.insertId,
        name,
        shopName,
        address,
        phone,
        userId,
        image: "",
        category: ""
      }
    });

  });

});

/* SHOP LOGIN */
app.post("/api/shop/login", (req, res) => {

  const { userId, password } = req.body;

  const sql = "SELECT * FROM shopkeepers WHERE BINARY userId = ?";

  db.query(sql, [userId], (err, result) => {

    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    if (result.length === 0) return res.json({ success: false });

    const shop = result[0];

    if (shop.password === password) {
      res.json({ success: true, user: shop }); // 🔥 FIX (user not shop)
    } else {
      res.json({ success: false });
    }

  });

});

/* SHOP UPDATE */
app.post("/api/shop/update", (req, res) => {

  const { id, shopName, image, category } = req.body;

  const sql = `
    UPDATE shopkeepers 
    SET shopName = ?, image = ?, category = ?
    WHERE id = ?
  `;

  db.query(sql, [shopName, image, category, id], (err) => {

    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    res.json({ success: true });

  });

});

/* FETCH SHOPS */
app.get("/api/shops", (req, res) => {

  const { district } = req.query;

  let sql = "SELECT * FROM shopkeepers";

  if (district) {
    sql += " WHERE district LIKE ?";
    db.query(sql, [`%${district}%`], (err, result) => {
      if (err) return res.json([]);
      res.json(result);
    });
  } else {
    db.query(sql, (err, result) => {
      if (err) return res.json([]);
      res.json(result);
    });
  }

});
/* SERVER */
app.listen(8080, () => {
  console.log("Server running on port 8080 🚀");
});
app.get("/api/products/:shopId", (req, res) => {

  const shopId = req.params.shopId;

  const sql = "SELECT * FROM products WHERE shopId = ?";

  db.query(sql, [shopId], (err, result) => {

    if (err) return res.json([]);

    res.json(result);

  });

});
