// Using typescript (son no need for babel to get import/export syntax)

import myCity, { message, name, getGreeting } from './myModule'
import addFunc, { subtract } from './math'

console.log(message)
console.log(name)
console.log(myCity)
console.log(getGreeting(name))

console.log(addFunc(10,7))
console.log(subtract(20, 10))