const array = [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]];

const arrayColumn = (array, column) => array.map(e => e[column]);

console.log(arrayColumn(array, 1));