const router=require('express').Router();

router.get('/', function (req, res) {
    res.render("about");
  });
  module.exports=router;