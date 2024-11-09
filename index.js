import mongoose from "mongoose";
import express from "express"
import { login,register } from "./controllers/UserController.js";
import { loginValidation, registerValidation } from "./validations.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";

mongoose
  .connect(
    "mongodb+srv://fedakurakin:00006@cluster0.sf3qr.mongodb.net/roadmap?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello asdadasd!")
})

app.post('/auth/login',loginValidation,handleValidationErrors,login)
app.post('/auth/register',registerValidation,handleValidationErrors,register)

app.listen(3000,(err)=>{
    if (err) {
        return console.log(err);
      } else {
        console.log("Server started on port http://localhost:3000/");
      }
})