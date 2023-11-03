import { http } from "@ampt/sdk";
import express, { Router } from "express";
import { data } from "@ampt/data";

const app = express();

const api = Router();

api.get("/hello", async (req, res) => {
  await data.set("foo", "bar");
  const results = await data.get("foo");
  const returningResults = `Hello from the public api! ${results}`
  return res.status(200).send({ message:  returningResults});
});

api.get("/greet/:name", (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).send({ message: "Missing route param for `name`!" });
  }

  return res.status(200).send({ message: `Hello ${name}!` });
});

api.post("/submit", async (req, res) => {
  return res.status(200).send({
    body: req.body,
    message: "You just posted data",
  });
});

app.use("/api", api);

http.node.use(app);
