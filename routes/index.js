module.exports = {
    getHomePage: function(req, res){
        let query = "SELECT * FROM `Products` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to CBTool | View Products",
                products: result
            });
        });
    },
};