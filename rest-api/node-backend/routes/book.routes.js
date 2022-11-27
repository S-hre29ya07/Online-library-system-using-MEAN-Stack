const express = require("express");
const app = express();
const bookRoute = express.Router();
let Book = require("../model/Book");


// create books to the database
bookRoute.route('/add-book').post((req, res, next)=>{
    Book.create(req.body,(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    });
});

// get all books from Store
bookRoute.route('/').get((req,res)=>{
    Book.find((error,data)=>{
        if(error){
            return next (error)
        }else{
            res.json(data)
        }
    });
});

// same as above all
// get book by id
bookRoute.route('/read-book/:id').get((req,res)=>{
    Book.findById(req.params.id,(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    });
});

// Update Book Store
bookRoute.route('/update-book/:id').put((req,res,next)=>{
    Book.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },(error,data) => {
        if(error){
            return next(error);
            console.log(error)
        }else{
            res.json(data)
            console.log('Book updated successfully!')
        }
    });
});

// Delete book store
 bookRoute.route('/delete-book/:id').delete((req,res,next)=>{
    Book.findByIdAndRemove(req.params.id,(error,data)=>{
        if (error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
 })


//  Dont forget to export module
 module.exports = bookRoute;
