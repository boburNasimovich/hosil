// LOCAL DATA

let products = [];
let trucks = JSON.parse(localStorage.getItem("trucks")) || [];
let currentUser = localStorage.getItem("user") || "";


// FIREBASE CONFIG

const firebaseConfig = {
apiKey: "AIzaSyBiJPApf9nzoQtG5ekkYhjLrpOH7gGwE0Q",
authDomain: "hosil-57245.firebaseapp.com",
projectId: "hosil-57245",
storageBucket: "hosil-57245.appspot.com",
messagingSenderId: "310834999012",
appId: "1:310834999012:web:2acc6cfae4b2b59d5386f1"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// REAL TIME PRODUCTS

db.collection("products").onSnapshot(snapshot=>{

products = [];

snapshot.forEach(doc=>{

products.push({
id:doc.id,
...doc.data()
});

});

showProducts(products);

});


// AUTH

function register(){

let u=document.getElementById("regUser").value;
let p=document.getElementById("regPass").value;

localStorage.setItem("user_"+u,p);

alert("Ro'yxatdan o'tdingiz");

closeModal();

}
db.collection("trucks").onSnapshot(snapshot=>{

trucks = [];

snapshot.forEach(doc=>{

trucks.push({
id:doc.id,
...doc.data()
});

});

showTrucks();

});
function login(){

let u=document.getElementById("loginUser").value;
let p=document.getElementById("loginPass").value;

if(u==="admin" && p==="12345"){
currentUser="admin";
}else{

let saved=localStorage.getItem("user_"+u);

if(saved!==p){
alert("Login xato");
return;
}

currentUser=u;

}

localStorage.setItem("user",currentUser);

showUser();
closeModal();

}

function logout(){

localStorage.removeItem("user");
location.reload();

}

function showUser(){

if(currentUser){

document.getElementById("user").innerHTML='<i class="fa-solid fa-user"></i> '+currentUser;

document.getElementById("loginBtn").style.display="none";
document.getElementById("registerBtn").style.display="none";

document.getElementById("logoutBtn").style.display="inline-block";

}

if(currentUser==="admin"){
document.getElementById("adminBtn").style.display="inline-block";
}

}


// MODALS

function openLogin(){
document.getElementById("loginModal").style.display="flex";
}

function openRegister(){
document.getElementById("registerModal").style.display="flex";
}

function openAdd(){
document.getElementById("addModal").style.display="flex";
}

function closeModal(){
document.querySelectorAll(".modal").forEach(m=>m.style.display="none");
}


// PRODUCT ADD WITH IMAGE

function addProduct(){

let name=capitalize(normalizeText(document.getElementById("name").value));

let amount=document.getElementById("amount").value;

let price=document.getElementById("price").value;

let phone=formatPhone(document.getElementById("phone").value);

let region=capitalize(normalizeText(document.getElementById("region").value));

if(!name || !amount || !price){

alert("Barcha maydonlarni to'ldiring");
return;

}

db.collection("products").add({

name:name,
amount:amount,
price:price,
phone:phone,
region:region

}).then(()=>{

alert("Mahsulot qo'shildi");

closeModal();

});

}


// DELETE PRODUCT

function deleteProduct(id){
db.collection("products").doc(id).delete();
}


// ADMIN PANEL

function openAdmin(){

document.getElementById("adminModal").style.display="flex";

let c=document.getElementById("adminProducts");

c.innerHTML="<h4>Mahsulotlar</h4>";

products.forEach(p=>{

c.innerHTML+=`
<div>
${p.name}
<button onclick="deleteProduct('${p.id}')">❌</button>
</div>
`;

});

c.innerHTML+="<h4>Transport</h4>";

trucks.forEach((t,i)=>{

c.innerHTML+=`
<div>
<i class="fa-solid fa-truck"></i> ${t.from} → ${t.to}
<button onclick="deleteTruck(${i})">❌</button>
</div>
`;

});

}


// SHOW PRODUCTS

function showProducts(list){

let c=document.getElementById("products");

c.innerHTML="";

list.forEach(p=>{

c.innerHTML+=`

<div class="product">

<h3>${p.name}</h3>

<p>${p.amount} tonna</p>

<p>${p.price} so'm/kg</p>

<p>${p.region}</p>

<a href="tel:${p.phone}"><i class="fa-solid fa-phone"> Bog'lanish</i></a>
</div>

`;

});

}

// FILTER REGION

function filterRegion(){

let r=normalizeText(document.getElementById("regionFilter").value);

if(!r){

showProducts(products);
return;

}

let filtered=products.filter(p=>normalizeText(p.region)===r);

showProducts(filtered);

}

function normalizeText(text){

return text
.trim()
.toLowerCase()
.replace(/\s+/g," ");

}
function capitalize(text){

return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

}
function formatPhone(phone){

phone = phone.replace(/\D/g,"");

if(phone.startsWith("998")==false){

phone="998"+phone;

}

return phone;

}
// TRANSPORT

function addTruck(){

let from=document.getElementById("from").value;
let to=document.getElementById("to").value;
let phone=document.getElementById("truckPhone").value;

if(!from || !to){

alert("Ma'lumotlarni to'ldiring");
return;

}

db.collection("trucks").add({

from:from,
to:to,
phone:phone

}).then(()=>{

alert("Transport qo'shildi");

});

}
showTrucks();
function deleteTruck(id){

db.collection("trucks").doc(id).delete();

}

function showTrucks(){

let c=document.getElementById("trucks");

c.innerHTML="";

trucks.forEach(t=>{

c.innerHTML+=`

<div class="truck">

<i class="fa-solid fa-truck"></i>
${t.from} → ${t.to}

<a href="tel:${t.phone}">
<i class="fa-solid fa-phone"></i>
</a>

</div>

`;

});

}
function calculatePriceStats(){

let stats = {};

products.forEach(p=>{

if(!stats[p.name]){

stats[p.name]={
total:0,
count:0
};

}

stats[p.name].total += Number(p.price);
stats[p.name].count++;

});

let html="";

for(let name in stats){

let avg = Math.round(stats[name].total / stats[name].count);

html += `
<div class="priceStat">
${name} o'rtacha narxi: <b>${avg} so'm</b>
</div>
`;

}

document.getElementById("priceStats").innerHTML = html;

}
function searchProduct(){

let text=document.getElementById("searchInput").value.toLowerCase();

let filtered=products.filter(p=>
p.name.toLowerCase().includes(text)
);

showProducts(filtered);

}
function filterCategory(cat){

if(!cat){
showProducts(products);
return;
}

let filtered=products.filter(p=>p.name===cat);

showProducts(filtered);

}
// INIT

showUser();
showTrucks();