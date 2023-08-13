import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "sql_office",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get("/api/getSuppliers", (req, res) => {
  const selectSuppliers = "SELECT * FROM sql_office.suppliers";
  db.query(selectSuppliers, (err, result) => {
    res.send(result);
  });
});

app.get("/api/getPO", (req, res) => {
  const selectPO = "SELECT * FROM sql_office.purchase_orders";
  db.query(selectPO, (err, result) => {
    res.send(result);
  });
});

app.post("/api/postSupplier", (req, res) => {
  const supplierId = req.body.supplierId;
  const supplierName = req.body.supplierName;
  const supplierAddress = req.body.supplierAddress;
  const supplierTin = req.body.supplierTin;
  const telNumber = req.body.telNumber;
  const celNumber = req.body.celNumber;
  const emailAddress = req.body.emailAddress;

  const suppliersInsert =
    "INSERT INTO sql_office.suppliers (supplierId, supplierName, supplierAddress, supplierTin, telNumber, celNumber, emailAddress) VALUES (?,?,?,?,?,?,?)";

  db.query(
    suppliersInsert,
    [
      supplierId,
      supplierName,
      supplierAddress,
      supplierTin,
      telNumber,
      celNumber,
      emailAddress,
    ],
    (err, result) => {}
  );
});

app.post("/api/postPO", (req, res) => {
  const supplierId = req.body.supplierId;
  const poNumber = req.body.poNumber;
  const poDate = req.body.poDate;
  const fundCluster = req.body.fundCluster;
  const procMode = req.body.procMode;
  const unit = req.body.unit;
  const article = req.body.article;
  const brand = req.body.article;
  const model = req.body.model;
  const serialNumber = req.body.serialNumber;
  const quantity = req.body.quantity;
  const unitCost = req.body.unitCost;
  const totalCost = req.body.totalCost;

  const PoInsert =
    "INSERT INTO sql_office.purchase_orders (supplierId, poNumber, poDate, fundCluster, procMode, unit, article, brand, model, serialNumber, quantity, unitCost, totalCost) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?)";

  db.query(
    PoInsert,
    [
      supplierId,
      poNumber,
      poDate,
      fundCluster,
      procMode,
      unit,
      article,
      brand,
      model,
      serialNumber,
      quantity,
      unitCost,
      totalCost,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

app.listen(3000, () => {
  console.log("RUNNING ON PORT 3000");
});
