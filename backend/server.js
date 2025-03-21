import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import dashboardRouter from './routes/dashboardRoute.js'

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/user', userRouter);
app.use('/api/dashboard', dashboardRouter);

app.get('/', (req,res) => {
    res.send("API Working");
})

app.listen(port, () => {
    console.log("Server is running on port ", port);
})
