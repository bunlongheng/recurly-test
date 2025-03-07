require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(express.json());

const RECURY_API_KEY = process.env.RECURY_API_KEY;
const RECURY_API_URL = "https://v3.recurly.com";

// Recurly API Headers
const headers = {
    Authorization: `Basic ${Buffer.from(RECURY_API_KEY).toString("base64")}`,
    Accept: "application/vnd.recurly.v2021-02-25",
    "Content-Type": "application/json",
};

// Serve a simple frontend for testing
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Fetch Recurly Accounts
app.get("/accounts", async (req, res) => {
    try {
        const response = await axios.get(`${RECURY_API_URL}/accounts`, { headers });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// Create a Subscription
app.post("/subscribe", async (req, res) => {
    try {
        const { account_code, plan_code } = req.body;

        const response = await axios.post(
            `${RECURY_API_URL}/subscriptions`,
            {
                account: { code: account_code },
                plan_code: plan_code,
            },
            { headers }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// Fetch Invoices
app.get("/invoices", async (req, res) => {
    try {
        const response = await axios.get(`${RECURY_API_URL}/invoices`, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
