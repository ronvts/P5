let carts = document.querySelectorAll('.add-cart');
let nbItems = document.querySelectorAll('.nb-items');
let quantity = 0;
let panierItem = localStorage.getItem("panier");
let panierTemp = panierItem == null?[]:JSON.parse(panierItem);

for (line of panierTemp) {
    quantity += Number(line.quantity)
}
document.querySelector('.nb-items').textContent = quantity;
