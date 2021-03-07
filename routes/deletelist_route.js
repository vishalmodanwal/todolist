const router=require('express').Router();

const List = require("../modles/list-modle");
const Item = require("../modles/item-modle");
router.post('/',function(req,res){
  const checkedItemId = req.body.checkbox;
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
 
module.exports=router;