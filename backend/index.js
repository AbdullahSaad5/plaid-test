const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const path = require("path");
const util = require("util");
const cors = require("cors");

app.use(cors());

// Plaid Configuration
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Create a link token
app.get("/create-link-token", async (req, res) => {
  const { client_user_id } = req.query;
  try {
    const user_id = req.query.user_id;
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id },
      client_name: "Plaid Quickstart",
      products: ["auth", "identity", "transactions"],
      country_codes: ["US"],
      language: "en",
    });
    res.json(response.data);
  } catch (err) {
    res.json(err);
  }
});

// Get a link token
app.post("/get-link-token", async (req, res) => {
  try {
    const { link_token } = req.body;
    const response = await plaidClient.linkTokenGet({ link_token });
    res.json(response.data);
  } catch (err) {
    res.json(err);
  }
});

// Get access token
app.post("/get-access-token", async (req, res) => {
  try {
    const { public_token } = req.body;
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    console.log(response);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

app.get("/get-accounts", async (req, res) => {
  try {
    const { access_token } = req.query;
    const response = await plaidClient.accountsGet({ access_token });
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

app.get("/get-identity", async (req, res) => {
  try {
    const { access_token } = req.query;
    const response = await plaidClient.identityGet({ access_token });
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

app.get("/get-transactions", async (req, res) => {
  try {
    const { access_token } = req.query;
    console.log(access_token);
    const response = await plaidClient.transactionsGet({
      access_token,
    });
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.get("/get-balance", async (req, res) => {
  try {
    const { access_token } = req.query;
    const response = await plaidClient.accountsBalanceGet({ access_token });
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

app.get("/get-auth", async (req, res) => {
  try {
    const { access_token } = req.query;
    const response = await plaidClient.authGet({ access_token });
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

app.get("/get-liabilities", async (req, res) => {
  try {
    const { access_token } = req.query;
    const response = await plaidClient.liabilitiesGet({ access_token });
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
