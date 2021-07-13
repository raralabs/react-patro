// // experimental
// const dateParser = (format = "dd-mm-yyyy") => {
//   const d = { date: 3, month: 4, year: 2055 };
//   if (format.length > 10) {
//     throw new Error(
//       "Format not Identified please use the combination of m,d and y with separators. Maximum possible occurrence of y is 4,d is2 and m is2"
//     );
//   }
//   let regex =
//     /((d|m){1,2}|(y){1,4})([^d,m,y])((d|m){1,2}|(y){1,4})([^d,m,y])((d|m){1,2}|(y){1,4})/;
//   const data = format.match(regex);
//   const _1 = data[1];
//   const _2 = data[5];
//   const _3 = data[9];

//   const _1seprator = data[4];
//   const _2separator = data[8];
// };
