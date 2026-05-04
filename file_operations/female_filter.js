const fs=require("fs");

//to read a file
var raw_data=fs.readFileSync("students.txt");
console.log(raw_data);//data returns as buffer 
var data=JSON.parse(raw_data.toString());//data is converted from buffer to string and sring to parse
console.log(data);

//to write a file
var females=data.filter(d=> d.gender=="Female")
console.log(females);
fs.writeFileSync(__dirname+"/female_students.txt",JSON.stringify(females));