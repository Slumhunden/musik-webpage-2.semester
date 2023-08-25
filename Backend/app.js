import express from "express"

const app = express();
const port = 1919;

app.listen(port, () =>{
    console.log(`App is running on http://localhost:${port}`)
})