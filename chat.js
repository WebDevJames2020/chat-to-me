const OpenAI = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

var promptSetup =
  "In your reply to the user message, make the tone funny and silly";

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/index.html", function (req, res) {
  var myPrompt = req.body.formPrompt;
  const openFun = async () => {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "assistant", content: promptSetup },
        { role: "user", content: myPrompt },
      ],
      max_tokens: 200,
    });
    //console.log(chatCompletion.choices[0].message.content);
    //res.send("<h2> " + chatCompletion.choices[0].message.content + "</h2>");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.write(
      "<h1 style='text-align: center; font-family: Arial, Helvetica, sans-serif; margin-top: 50px'>ChatGPT says..</h1>"
    );

    res.write(
      "<p style='font-family: Arial, Helvetica, sans-serif; margin: 100px 30px auto 100px'>"
    );
    res.write(chatCompletion.choices[0].message.content);

    res.send();
  };
  openFun();
});

app.listen(port, "0.0.0.0", function () {
  console.log("Server started on port 0000");
});
