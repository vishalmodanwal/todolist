const router=require('express').Router();
router.get("/", function (req, res) {
    res.render("newlist");
          // console.log("Create a new list");
  });
  router.post('/',function(req,res){
      const listName = req.body.listName;
     console.log(req.body.listName);
       res.redirect("/"+listName);
     });
module.exports=router;