const router=require('express').Router();
const _ = require("lodash");
const List = require("../modles/list-modle");
const Item = require("../modles/item-modle");
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

router.get("/", function (req, res) {
  let listItem;
List.find({},function(err,listitem){
  if(!err){
  listItem=listitem;
  }
  else{
    console.log(err);
  }
});
  
    Item.find({}, function (err, foundItems) {
      if (foundItems==null || foundItems.length === 0) {
        Item.insertMany(defaultItems, function (err) {
          if (err) {
            console.log(err);
          }
          else {
            res.render("list", { listName: foundItems.item,lists:listItem});
            console.log("Successfully saved default item in DB");
          }
    
        });
    res.redirect("/");
    }
    else {
    res.render("list", { ListTitle: "Today", newListItems: foundItems,lists:listItem});
    }
    
      });
    });
    
    router.post("/", function (req, res) {
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
    // Custom routes
    router.get("/:customListName", function (req, res) {
      let listItem;
    List.find({},function(err,listitem){
           if(!err){
          listItem=listitem;
           }
        else{
           console.log(err);
          }
          });
      const customListName = _.capitalize(req.params.customListName);
      List.findOne({ name: customListName }, function (err, foundList) {
        if (!err) {
          if (!foundList) {
            //create a new list
            const list = new List({
              name: customListName,
              items: defaultItems
            });
            list.save();
           res.redirect("/"+customListName);
          } else {
            //show an exiting list
            res.render("list", { ListTitle: foundList.name, newListItems: foundList.items ,lists:listItem});
    
          }
        }
      });
    
    });
    module.exports=router;