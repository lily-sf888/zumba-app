//exercise for spread operator
var arr = [1,2,3]

const myFunc = function(one, two, three, four, five) {
  console.log(five)
}

const obj = {
  lily: "lily",
  paul: "paul"
}

var { lily, paul } = obj

myFunc(lily, ...arr, paul)
