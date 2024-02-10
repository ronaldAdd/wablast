// const functions = require("firebase-functions");
const cors = require("cors");
require("dotenv").config();

//data
const contact = require("./data/contacts.json");
const contactChat = require("./data/historyChat.json");

const express = require("express"); //Import the express dependency
const axios = require("axios").default;

const app = express(); //Instantiate an express app, the main work horse of this server
const PORT = process.env.PORT || 8080;

let counter = 0;
app.use(cors({ origin: true }));

const bodyParser = require("body-parser");
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(bodyParser.json());

app.get("/chatbot/chat", async (req, res, next) => {
  var viewName = {
    sections: "chat_content",
    modal: "aside_chat_modal",
    content: "chat_content",
    dataJson: contact.contacts,
  };
  res.render("index", viewName);
});

app.get("/chatbot/js/app.js", async (req, res, next) => {
  res.set("Content-Type", "text/javascript");
  res.render("app", {
    created_at: new Date().toLocaleString(),
    appName: "WeTracker1.0",
  });
});

app.get("/chatbot/js/bundle.js", async (req, res, next) => {
  res.set("Content-Type", "text/javascript");
  res.render("bundle", {
    created_at: new Date().toLocaleString(),
    appName: "WeTracker1.0",
  });
});

app.get("/chatbot/chat/history/:id", async (req, res, next) => {
  var result = contact.contacts.filter(
    (x) => x.id === parseInt(req.params["id"])
  );
  console.log(req.params);
  var viewName = {
    sections: "chat_content",
    modal: "aside_chat_modal",
    content: "chat_content",
    dataJson: contact.contacts,
    history: result,
  };
  return res.status(200).send(result);
  // res.render("index", viewName);
});

app.get("/chatbot/contacts", async (req, res, next) => {
  var viewName = {
    sections: "contact_content",
    modal: "aside_contact_modal",
    content: "contact_content",
    dataJson: contact.contacts,
  };
  res.render("index", viewName);
});

app.get("/chatbot/login", async (req, res, next) => {
  var viewName = { sections: "content" };
  res.render("chatlogin", viewName);
});

app.get("/", async (req, res, next) => {
  res.status(200).send({ id: "chatbot" });
});

app.listen(PORT, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${PORT}`);
});
