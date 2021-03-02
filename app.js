//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const app = express();
const _ = require("lodash");
// let items=["Buy Food","Cook Food","Eat Food"];
// let workItems=[];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
const itemsSchema = {
  name: String
};
const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
  name: "Welocme to your todolist!"
});
const item2 = new Item({
  name: "Hit the + button add a new item."
});
const item3 = new Item({
  name: "<-- Hit this to delete an items."
});
const defaultItems = [item1, item2, item3];
const listSchema = {
  name: String,
  items: [itemsSchema]
};
const List = mongoose.model("List", listSchema);
let listItem;
List.find({},function(err,listitem){
  if(!err){
  
//let day=date.getDate();
  listItem=listitem;
  }
  else{
    console.log(err);
  }
});
let listarray=[];
app.get("/", function (req, res) {
  
Item.find({}, function (err, foundItems) {
  if (foundItems.length === 0) {
    Item.insertMany(defaultItems, function (err) {
      if (err) {
        console.log(err);
      }
      else {
        res.render("list", { listName: foundItems.item,lt:listItem});
        console.log("Successfully saved default item in DB");
      }

    });
res.redirect("/");
}
else {
res.render("list", { ListTitle: "Today", newListItems: foundItems,lt:listItem,listtitle:listarray});
}

  });
});
app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName
  });
  
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    })
  }

});
app.post("/deletelist",function(req,res){
  const checkedItemId = req.body.checkbox;
  if(listItem.findIndex(a => a._id ==checkedItemId) !=-1)
  listItem.splice(listItem.findIndex(a => a._id ==checkedItemId) , 1);
  if(listarray.findIndex(a => a._id ==checkedItemId) !=-1)
  listarray.splice(listarray.findIndex(a => a._id ==checkedItemId) , 1);
//  console.log(listItem);
//  console.log(listarray);
  List.findByIdAndRemove(checkedItemId, function (err) {
    if (err) {
      console.log(err);
    }
    else {
     // console.log("Successfully deleted List");
      res.redirect("/");
    }
  });
})
app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  if (listName == "Today") {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (err) {
        console.log(err);
      }
      else {
        // console.log("Successfully deleted Item");
      }
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } }, function (err) {
      if (!err) {
        res.redirect("/" + listName);
      }
    })

  }


});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/newlist", function (req, res) {
  res.render("newlist");
        // console.log("Create a new list");
});
app.post("/createlist",function(req,res){
  const listName = req.body.listName;
  // console.log(req.body.listName);
  res.redirect("/"+listName);
})
app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        //create a new list
        // console.log("Doesn't exist");
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        listarray.push(list);
       res.redirect("/"+customListName);
      } else {
        //show an exiting list
        res.render("list", { ListTitle: foundList.name, newListItems: foundList.items ,lt:listItem,listtitle:listarray});

      }
    }
  });

});

let port=process.env.PORT;
if(port==null || port==""){
  port=3000;
}
app.listen(port, function () {
  console.log("Server started on port successfully");
});