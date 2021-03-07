const router=require('express').Router();
const List = require("../modles/list-modle");
const Item = require("../modles/item-modle");
router.post("/", function (req, res) {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    if (listName == "Today") {
      Item.findByIdAndRemove(checkedItemId, function (err) {
        if (err) {
          console.log(err);
        }
      });
      res.redirect('/');
    } else {
      List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } }, function (err) {
        if (!err) {
          res.redirect("/" + listName);
        }
      })
  
    }
  
  
  });
  module.exports=router;