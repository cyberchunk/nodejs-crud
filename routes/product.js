
const fs = require('fs');

module.exports = {
    addProductPage: function(req, res){
        res.render('add-product.ejs', {
            title: "Welcome to CBTool | Add a new Product",
            message: ''
        });
    },
    addProduct: function(req, res){
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let name = req.body.name;
        let price = req.body.price;       
        let username = req.body.username;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `Products` WHERE username = '" + username + "'";

        db.query(usernameQuery, function(err, result){
            if(err){
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('add-product.ejs', {
                    message,
                    title: "Welcome to CBTool | Add a new Product"
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, function(err ){
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the player's details to the database
                        let query = "INSERT INTO `Products` (name, price, image, user_name) VALUES ('" +
                            name + "', '" + price + "', '" + image_name + "', '" + username + "')";
                        db.query(query, function(err, result){
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-product.ejs', {
                        message,
                        title: "Welcome to CBTool | Add a new Product"
                    });
                }
            }
        });
    },
    editProductPage: function(req, res){
        let product_id = req.params.id;
        let query = "SELECT * FROM `Products` WHERE id = '" + product_id + "' ";
        db.query(query, function(err, result){
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-product.ejs', {
                title: "Edit  Product"
                ,player: result[0]
                ,message: ''
            });
        });
    },
    editProduct: (req, res) => {
        let product_id = req.params.id;
        let name = req.body.name;
        let price = req.body.price;
	
        let query = "UPDATE `Products` SET `name` = '" + name + "', `price` = '" + price + "' WHERE `Products`.`id` = '" + product_id + "'";
        db.query(query, function(err, result){
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteProduct: function(req, res){
        let product_id = req.params.id;
        let getImageQuery = 'SELECT image from `Products` WHERE id = "' + product_id + '"';
        let deleteUserQuery = 'DELETE FROM Products WHERE id = "' + product_id + '"';

        db.query(getImageQuery, function(err, result){
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, function(err){
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, function(err, result){
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};