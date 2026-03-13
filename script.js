  const firebaseConfig = {
    apiKey: "AIzaSyBiJPApf9nzoQtG5ekkYhjLrpOH7gGwE0Q",
    authDomain: "hosil-57245.firebaseapp.com",
    projectId: "hosil-57245",
    storageBucket: "hosil-57245.firebasestorage.app",
    messagingSenderId: "310834999012",
    appId: "1:310834999012:web:2acc6cfae4b2b59d5386f1",
    measurementId: "G-J0P0HCB99Q"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
function addProduct(){

let product={

name:document.getElementById("name").value,
amount:document.getElementById("amount").value,
price:document.getElementById("price").value,
phone:document.getElementById("phone").value,
region:document.getElementById("region").value

};

db.collection("products").add(product);

}
db.collection("products").onSnapshot(snapshot=>{

let list=[];

snapshot.forEach(doc=>{

list.push(doc.data());

});

showProducts(list);

});

let products = JSON.parse(localStorage.getItem("products")) || [];
let trucks = JSON.parse(localStorage.getItem("trucks")) || [];

let currentUser = localStorage.getItem("user") || "";

showProducts(products);
showTrucks();
showUser();

function openLogin(){
document.getElementById("loginModal").style.display="flex";
}

function openRegister(){
document.getElementById("registerModal").style.display="flex";
}

function openAdd(){
document.getElementById("addModal").style.display="flex";
}

function openAdmin(){

document.getElementById("adminModal").style.display="flex";

let c=document.getElementById("adminProducts");

c.innerHTML="<h4>Mahsulotlar</h4>";

products.forEach((p,i)=>{

c.innerHTML+=`
<div>
${p.name}
<button onclick="deleteProduct(${i})">❌</button>
</div>
`;

});

c.innerHTML+="<h4>Transport</h4>";

trucks.forEach((t,i)=>{

c.innerHTML+=`
<div>
🚛 ${t.from} → ${t.to}
<button onclick="deleteTruck(${i})">❌</button>
</div>
`;

});

}

function deleteTruck(i){

trucks.splice(i,1);

localStorage.setItem("trucks",JSON.stringify(trucks));

showTrucks();

openAdmin();

}

function closeModal(){

document.querySelectorAll(".modal").forEach(m=>m.style.display="none");

}

function register(){

let u=document.getElementById("regUser").value;
let p=document.getElementById("regPass").value;

localStorage.setItem("user_"+u,p);

alert("Ro'yxatdan o'tdingiz");

closeModal();

}

function login(){

let u=document.getElementById("loginUser").value;
let p=document.getElementById("loginPass").value;

if(u==="admin" && p==="12345"){

currentUser="admin";

}else{

let saved=localStorage.getItem("user_"+u);

if(saved!==p){

alert("login xato");
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

currentUser="";

location.reload();

}

function showUser(){

if(currentUser){

document.getElementById("user").innerText="👤 "+currentUser;

document.getElementById("loginBtn").style.display="none";
document.getElementById("registerBtn").style.display="none";

document.getElementById("logoutBtn").style.display="inline-block";

}

if(currentUser==="admin"){

document.getElementById("adminBtn").style.display="inline-block";

}

}

function addProduct(){

let product={

name:document.getElementById("name").value,
amount:document.getElementById("amount").value,
price:document.getElementById("price").value,
phone:document.getElementById("phone").value,
region:document.getElementById("region").value

};

products.push(product);

localStorage.setItem("products",JSON.stringify(products));

showProducts(products);

closeModal();

}

function deleteProduct(i){

products.splice(i,1);

localStorage.setItem("products",JSON.stringify(products));

showProducts(products);

openAdmin();

}

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

<a href="tel:${p.phone}">📞</a>

</div>

`;

});

}

function filterRegion(){

let r=document.getElementById("regionFilter").value;

if(!r){

showProducts(products);
return;

}

let filtered=products.filter(p=>p.region===r);

showProducts(filtered);

}

function addTruck(){

let t={

from:document.getElementById("from").value,
to:document.getElementById("to").value,
phone:document.getElementById("truckPhone").value

};

trucks.push(t);

localStorage.setItem("trucks",JSON.stringify(trucks));

showTrucks();

}

function showTrucks(){

let c=document.getElementById("trucks");

c.innerHTML="";

trucks.forEach(t=>{

c.innerHTML+=`

<div class="truck">

🚛 ${t.from} → ${t.to}

<a href="tel:${t.phone}">📞</a>

</div>

`;

});

}