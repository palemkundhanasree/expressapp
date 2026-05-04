var express = require("express");
var app = express();
var fs = require("fs");
app.use(express.urlencoded({ extended: true }));

const { parse } = require("path");
app.get("/", function (req, res) {
  res.send("hello request recieved");
});

app.get("/abc", function (req, res) {
  res.send("You requested abc! em kavali");
});

app.get("/xyz", function (req, res) {
  res.send("haa request vachindhi");
});

app.get("/products/getProductsById/:id",(req,res)=>{
  var id = req.params.id;
  var data = fs.readFileSync("products.txt");
  var details = JSON.parse(data.toString());
  console.log(details)
  var selectedProduct = details.products.find(p=>{
    console.log(p.id)
    console.log(id)
    return p.id==id
  })
  res.send(selectedProduct);
})
app.get("/products/getRange/:x/:y",(req,res)=>{
  var x = +req.params.x;
  var y = +req.params.y;
  var data = fs.readFileSync("products.txt");
  var details = JSON.parse(data.toString());
  console.log(details)
  var selectedProducts = details.products.filter((pr)=>{
    if(pr.id>x && pr.id<=y){
      return true
    }
  })
  res.send(selectedProducts);
})

app.get("/add/:x/:y", function (req, res) {
  console.log(req.params);
  res.send(+req.params.x + +req.params.y);
});

app.get("/sub/:x/:z", (req, res) => {
  res.send(req.params.x - req.params.z);
});

app.get("/products", (req, res) => {
  var data = fs.readFileSync("products.txt");
  var k = JSON.parse(data.toString());
  res.send(k);
});

app.post("/add_enquire",(req,res)=>{
  console.log(req.body);//express.js can't read form data directly so we have to import "app.use(express.urlencoded({ extended: true }));""
  var data = JSON.parse(fs.readFileSync("enquires.txt").toString())
  data.push(req.body);
  fs.writeFileSync(__dirname+"/enquires.txt",JSON.stringify(data));
  res.send("completed");
});

app.get("/get_enquries",(req,res)=>{
  const data=JSON.parse(fs.readFileSync("enquires.txt").toString())
  var ui=`<table border="1">
      <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Course</th>
      </tr>`

    data.forEach((obj)=>{
      ui+=`<tr>
        <td>${obj.name}</td>
        <td>${obj.phnumber}</td>
        <td>${obj.course}</td>
      </tr>`
    })
  ui+="</table>"
  res.send(ui);
});

app.listen(8080, () => {
  console.log("Server uriking on 8080");
});