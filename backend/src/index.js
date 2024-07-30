const express = require('express');
const cors = require("cors");
const retreatRoutes = require('./routes/retreatRoutes');
const bookingRoutes = require('./routes/bookingRoutes')

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());


app.use('/api/v1' , retreatRoutes)
app.use('/api/v1' , bookingRoutes)



app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port} `);
})




