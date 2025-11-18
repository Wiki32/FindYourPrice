"use strict";

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const defaultOrigins = ["http://localhost:5500", "http://127.0.0.1:5500"];
const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || defaultOrigins.join(","))
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.warn(`Blocked CORS origin: ${origin}`);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400
  })
);
app.options("*", cors());

app.use(express.json({ limit: "1mb" }));

app.post("/api/calculate-price", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: { message: "Missing OPENAI_API_KEY" } });
  }

  const { messages, temperature = 0.2, max_tokens = 20 } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: { message: "messages array required" } });
  }

  try {
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens,
        temperature
      })
    });

    const payload = await upstream.json();
    if (!upstream.ok) {
      const status = upstream.status || 502;
      const message = payload?.error?.message || "Upstream OpenAI request failed";
      return res.status(status).json({ error: { message } });
    }

    res.json(payload);
  } catch (error) {
    console.error("Price API proxy error:", error);
    res.status(500).json({ error: { message: "Unexpected server error" } });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: { message: "Not found" } });
});

app.listen(PORT, () => {
  console.log(`Price API proxy listening on port ${PORT}`);
});
