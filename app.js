//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const homeRoutes = require('./routes/home_route');
const aboutRoutes = require('./routes/about_route');
const newlistRoutes = require('./routes/newlist_route');
const deleteitemRouteRoutes = require('./routes/delete_item_route');
const deletelistRoutes = require('./routes/deletelist_route');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//Rotes

app.use('/about',aboutRoutes);
app.use('/newlist',newlistRoutes);
app.use('/delete',deleteitemRouteRoutes);
app.use('/deletelist',deletelistRoutes);
app.use('/',homeRoutes);
mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

let port=process.env.PORT;
if(port==null || port==""){
  port=3000;
}
app.listen(port, function () {
  console.log("Server started on port successfully");
});