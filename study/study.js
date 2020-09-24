// var orders = [
//   { amount : 250 },
//   { amount : 250 },
//   { amount : 250 },
//   { amount : 250 },
//   { amount : 250 }
// ]

// // var totalAmount = orders.reduce(function(sum, order){
// //   return sum + order.amount
// // }, 0)

// var totalAmount = orders.reduce((sum, order) => sum + order.amount , 0)

// console.log(totalAmount)


let arr = [1, 2, 3, 4, 5, 5]
const maxNumber = arr.reduce((pre, curr) => pre > curr ? pre:curr, 0)      // 得到15

console.log(maxNumber)