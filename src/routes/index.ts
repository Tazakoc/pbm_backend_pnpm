import express from 'express'
// import config from '../config/config'
import transactions from './transactions.route'
import incomes from './incomes.route'
import expenses from './expenses.route'
import savings from './savings.route'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/api/transactions',
    route: transactions,
  },
  {
    path: '/api/incomes',
    route: incomes,
  },
  {
    path: '/api/expenses',
    route: expenses,
  },
  {
    path: '/api/savings',
    route: savings,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ]

// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route)
//   })
// }

export default router
