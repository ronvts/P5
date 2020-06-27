let carts = document.querySelectorAll('.add-cart');
let nbItems = document.querySelectorAll('.nb-items');
let panierTemp = JSON.parse(localStorage.getItem("panier"));
let quantity = 0;

for (line of panierTemp) {
    quantity += Number(line.quantity)
}
document.querySelector('.nb-items').textContent = quantity;
