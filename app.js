const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const routes = require('./routes');
const response = require('./helpers/response');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }));
    
app.get('/', (req, res,next) => {
    res.status(200).send({
        message: "Welcome to USER ARTIKEL API REQUEST"
    })
})
routes(app)

app.use(response.errorHandler)

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})