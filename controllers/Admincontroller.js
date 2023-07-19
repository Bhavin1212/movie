const Admin = require ('../model/Admin');
const path = require('path');
const fs = require('fs');

module.exports.home = (req,res) =>{
    return res.render('home');
}

module.exports.insertrecoed = (req,res)=>{
    var imagePath = '';
    if(req.file){
        imagePath = Admin.avatarPath+"/"+req.file.filename;
    }
    req.body.images = imagePath;
    var date = new Date();
    req.body.date = date.toLocaleDateString();

 
    Admin.create(req.body).then(function(data){
        return res.redirect('/');
    }).catch(function(err){
        console.log(err);
    })
};

module.exports.show_view =  (req,res)=>{
    Admin.find({})
    .then(function(showrecord){
        return res.render('show_view',{
            'showdata' : showrecord
        })
    })
    .catch(function(err){
        console.log(err);
    })
};

module.exports.read_more = (req,res)=>{
    Admin.findById(req.params.id).then(function(record){
        return res.render('read_more',{
            'ad' : record
        })
    })
    .catch(function(err){
        console.log(err);
    })
};

module.exports.adminView =  (req,res)=>{
    Admin.find({})
    .then(function(adminrecord){
        return res.render('admin_view',{
            'admindata' : adminrecord
        })
    })
    .catch(function(err){
        console.log(err);
    })
};

module.exports.deleteRecord = (req,res)=>{
    Admin.findById(req.params.id)
    .then((oldrecord)=>{
        console.log(oldrecord.images);
        var imagePath = path.join(__dirname,'..',oldrecord.images);
        if(imagePath){
            fs.unlinkSync(imagePath);
        }
        Admin.findByIdAndDelete(req.params.id)
        .then((rr)=>{
            return res.redirect('/adminView');
        })
        .catch((err)=>{
            console.log("record not deleted");
        })
    })
    .catch((err)=>{
        console.log(err);
    })
};

module.exports.updateRecord = (req,res)=>{
    Admin.findById(req.query.id).then(function(record){
        return res.render('update',{
            'singleAdmin' : record
        })
    })
    .catch(function(err){
        console.log(err);
    })
}


module.exports.MovieEdit = (req,res)=>{
    let adminId = req.body.editid;
    // console.log(req.body);
    // console.log(req.file);

    if(req.file){
        Admin.findById(adminId)
        .then((oldrecord)=>{
            //old image delete from folder
            var imgPath = path.join(__dirname,'..',oldrecord.images);
            if(imgPath){
                fs.unlinkSync(imgPath);
            }

            //set new image path 
            var newPath = Admin.avatarPath+"/"+req.file.filename;
            req.body.images = newPath;

            //update all record in admin model
            Admin.findByIdAndUpdate(adminId,req.body)
            .then((urecord)=>{
                return res.redirect('/adminView');
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else{
        Admin.findById(adminId)
        .then((oldrecord)=>{
            req.body.images = oldrecord.images;
            Admin.findByIdAndUpdate(adminId,req.body)
            .then((updateRecord)=>{
                return res.redirect('/adminView');
            })
            .catch((err)=>{
                console.log(err);
            })
        })
    }
}
