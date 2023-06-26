import express from "express";
import mysql from "mysql";

const app = express();

app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bank",
});

connection.connect((err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`mysql Connected`);
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM ACCOUNT", (err, result, fields) => {
    if (err) throw err;
    res.status(200).json({ result });
  });
});

app.post("/", async (req, res) => {
  const { acnumber, custid, bid, opening_balance, aod, atype, astatus } =
    req.body;
  try {
    connection.query(
      `INSERT INTO ACCOUNT (acnumber , custid , bid , opening_balance ,aod ,atype ,astatus  ) VALUES ('${acnumber}' , '${custid}' , '${bid}' , '${opening_balance}' , '${aod}' ,'${atype}' ,'${astatus}')`,
      function (err, result) {
        console.log("1 record inserted");
        res.status(201).json({ result });
      }
    );
  } catch (error) {}
});

app.listen("3000", () => {
  console.log("server running at port 3000");
});
