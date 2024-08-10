
const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('../jwt.js');
const adminController = require('../controller/admin.controller.js');


router.post("/addbook", jwtAuthMiddleware, adminController.addBooks );
router.put("/update/books/:id", jwtAuthMiddleware, adminController.updateBook );
router.delete("/delete/books/:id", jwtAuthMiddleware, adminController.deleteBook )
router.get("/allbooks", adminController.getAllBooks );
router.get("/recentbooks", adminController.getRecentBooks );
router.get("/book/:id", adminController.getBookById );

    

module.exports = router;