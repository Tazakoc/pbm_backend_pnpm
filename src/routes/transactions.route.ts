import express from 'express'
import validate from '../middlewares/validate'

const router = express.Router()

// router
//   .route('/')
//   .get(validate(transactionsValidation.getTransactions), transactionsController.getTransactions)
//   .post(
//     validate(transactionsValidation.updateTransactions),
//     transactionsController.createTransactions
//   )

// router
//   .route('/:transactionsId')
//   .put(
//     validate(transactionsValidation.updateTransactions),
//     transactionsController.updateTransactions
//   )
//   .delete(
//     validate(transactionsValidation.deleteTransactions),
//     transactionsController.deleteTransactions
//   )

export default router
