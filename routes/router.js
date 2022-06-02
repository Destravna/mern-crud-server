const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
router.get("/", async(req, res)=>{
    res.send("don't worry Imma working hard");
});

router.post("/register", async(req, res)=>{
    let newUser = req.body;
    if(!newUser.name || !newUser.email || !newUser.number || !newUser.job){
        return res.status(201).json({msg : "Please fill all the details"});
    }
    try{
        const preuser = await User.findOne({email:newUser.email});
        if(preuser){
            return res.status(201).json({msg : "Email already exists"});
        }
        else{
            const user = new User({
                name : newUser.name,
                email : newUser.email,
                job : newUser.job,
                number : newUser.number
            });
            await user.save().catch(err=>{console.log("Couldmt save successfully" + err)});
            return res.status(201).json({msg : "Saved successfully"});

        }     
    }catch(err){
        console.log(err);
    }
});

router.get("/data", async(req, res)=>{
    try{
        const data = await User.find({});
        res.status(201).json(data);

    }
    catch(err){
        console.log(err);
        res.status(404).json("error occurred");
    }
})

router.get("/data/:user", async(req, res)=>{
    const id = req.params.user;
    const data = await User.findById(id);
    res.json(data).status(201);
})

//update data
router.patch("/edit/:id", async(req, res)=>{
    try{
        console.log(req.body);
        const {id} = req.params;
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new : true});
        console.log(updateUser);
        res.status(201).json({"msg" : "UserUpdated"});
    }
    catch(err){
        console.log(err);
    }
})


router.delete("/delete/:id", async(req, res)=>{
    try{
        console.log("DELETE REQUEST");
        const id = req.params.id;
        console.log(req.params);
        const reesult = await User.deleteOne({_id:id});
        console.log(reesult);
        res.status(201).json({"result": reesult, "msg":"data deleted"}).status(201);
    }
    catch(err){
        console.log(err);
    }
    
})

module.exports = router;