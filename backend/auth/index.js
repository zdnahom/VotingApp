const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv/config');
//import router
const authRoute=require('./routes/auth');
const partyR=require('./routes/partyRoute');
const electionR=require('./routes/electionR')
//middleware
app.use(express.json());
app.use('/api/user',authRoute);
app.use('/api/parties',partyR);
app.use('/api/elections',electionR);
mongoose.connect(process.env.Db_CONNECTION, { useNewUrlParser: true }, () => console.log('connected to DB'));

app.listen(3030,()=>console.log('server is running'));