let products = JSON.parse(localStorage.getItem("products")) || [];
let trucks = JSON.parse(localStorage.getItem("trucks")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let currentUser = localStorage.getItem("user") || "";

showProducts(products);
showTrucks();
showFavorites();
showUser();

function register(){

let u = document.getElementById("username").value;
let p = document.getElementById("password").value;

localStorage.setItem("user_"+u,p);

alert("Ro'yxatdan o'tdingiz");

}

function login(){

let u = document.getElementById("username").value;
let p = document.getElementById("password").value;

let saved = localStorage.getItem("user_"+u);

if(saved === p){

currentUser = u;

localStorage.setItem("user",u);

showUser();

}else{

alert("xato login");

}

}

function showUser(){

if(currentUser){

document.getElementById("user").innerText = "👤 "+currentUser;

}

}

function addProduct(){

let file = document.getElementById("image").files[0];

let reader = new FileReader();

reader.onload = function(){

let product = {

name:document.getElementById("name").value,

amount:document.getElementById("amount").value,

price:document.getElementById("price").value,

phone:document.getElementById("phone").value,

region:document.getElementById("region").value,

image:reader.result,

rating:0,

votes:0

};

products.push(product);

localStorage.setItem("products",JSON.stringify(products));

showProducts(products);

}

if(file) reader.readAsDataURL(file);

}

function showProducts(list){

let container = document.getElementById("products");

container.innerHTML="";

list.forEach((p,i)=>{

container.innerHTML +=`

<div class="product">

<img src="${p.image}">

<h3>${p.name}</h3>

<p>${p.amount} tonna</p>

<p>${p.price} so'm/kg</p>

<p>${p.region}</p>

<p>⭐ ${(p.rating/(p.votes||1)).toFixed(1)}</p>

<button onclick="rate(${i},5)">⭐5</button>

<button onclick="favorite(${i})">❤️</button>

<a href="tel:${p.phone}">📞</a>

</div>

`;

});

}

function rate(i,val){

products[i].rating += val;

products[i].votes++;

localStorage.setItem("products",JSON.stringify(products));

showProducts(products);

}

function favorite(i){

favorites.push(products[i]);

localStorage.setItem("favorites",JSON.stringify(favorites));

showFavorites();

}

function showFavorites(){

let c = document.getElementById("favorites");

c.innerHTML="";

favorites.forEach(f=>{

c.innerHTML += `<div>${f.name} ❤️</div>`;

});

}

function filterRegion(){

let r = document.getElementById("regionFilter").value;

if(!r){

showProducts(products);

return;

}

let filtered = products.filter(p=>p.region===r);

showProducts(filtered);

}

function addTruck(){

let t = {

from:document.getElementById("truckFrom").value,

to:document.getElementById("truckTo").value,

phone:document.getElementById("truckPhone").value

};

trucks.push(t);

localStorage.setItem("trucks",JSON.stringify(trucks));

showTrucks();

}

function showTrucks(){

let c = document.getElementById("trucks");

c.innerHTML="";

trucks.forEach(t=>{

c.innerHTML += `

<div class="truck">

🚛 ${t.from} → ${t.to}

<a href="tel:${t.phone}">📞</a>

</div>

`;

});

}