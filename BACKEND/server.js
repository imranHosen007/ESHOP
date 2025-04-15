import { app } from "./app.js";
import { DbConncect } from "./Database/Database.js";
import cloudinary from "cloudinary";
// Handling uncaught Exception
process.on("uncaughtException", err => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});
// -----Conncect-DataBase-----
DbConncect();
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server Working ${process.env.PORT}`);
});
// ----Cloudinary-Config---

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
