const express = require('express');
const router = express.Router();
const {createExpense,getAll,get,updateExpense,deleteExpense} = require('../controllers/expense')


router.post('/create',createExpense);
router.get('/getAll',getAll)
router.get('/get',get)
router.put('/update',updateExpense)
router.delete('/delete',deleteExpense)

module.exports = router;