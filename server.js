const express = require('express');
const dotenv = require('dotenv');
const port = 3000;


const postsRouter = require("./routers/posts");
const authRouter = require("./routers/authRouter");


const app = express();
dotenv.config();

app.use(express.json());

app.use("/posts", postsRouter);
app.use("", authRouter);


app.listen( process.env.PORT || 3000, ()=>{
    console.log(`App attiva su http://localhost:${port}`);
})