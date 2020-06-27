let panierJSON = localStorage.getItem("panier");
let panier = panierJSON == null?[]:JSON.parse(panierJSON);

const container = document.getElementById('tbody-cart');

for(let key in panier) { //Pour chaque objet présent dans la catégorie panier du localStorage
	// let line = panier[key];
	createCart(panier[key], key)
	showTotal(panier)
}

function createCart(line, key) {
	let tr = document.createElement("tr");
	let itemName = document.createElement("td");
	let itemLense = document.createElement("td");
	let itemQty = document.createElement("td");
	let itemPrice = document.createElement("td");
	let removeItem = document.createElement("td");

	container.appendChild(tr)
	tr.appendChild(itemName)
	tr.appendChild(itemLense)
	tr.appendChild(itemPrice)
	tr.appendChild(itemQty)
	tr.appendChild(removeItem)

	itemName.innerText = line.name
	itemLense.innerText = line.lense
	itemPrice.innerText = line.price 
	itemQty.innerText = line.quantity
	removeItem.innerHTML = '<button data-index="'+key+'" class="btn-remove">x</button>'
}

//Calcul du total panier
function showTotal(panier) {
	let calculTotal = 0;
	for (let j in panier) {
		calculTotal += parseInt(panier[j].price) * parseInt(panier[j].quantity);
		}
	let totalOrder = document.getElementById('total-cart')
	totalOrder.innerText = calculTotal + ' €'
}

// Suppression d'un article du panier
let removeCartItem = document.getElementsByClassName('btn-remove')
	for (let i = 0; i < removeCartItem.length; i++) {
		let button = removeCartItem[i]
		button.addEventListener('click', function(event) {
		let buttonClicked = event.target
		let index = buttonClicked.getAttribute("data-index")
		buttonClicked.parentElement.parentElement.remove()
		panier.splice(index, 1)
		localStorage.setItem('panier', JSON.stringify(panier))
	})
}

// Envoi du formulaire

const form = document.getElementById('form');
const cartItems = JSON.parse(localStorage.getItem('panier')) || []; 
const postUrlAPI = "http://localhost:3000/api/cameras/order";
const totalCartCost = document.getElementById('total-cart');
function sendData() {
	event.preventDefault();
	let lastName = document.getElementById('lastName').value;
	let firstName = document.getElementById('firstName').value;
	let address = document.getElementById('address').value;
	let city = document.getElementById('city').value;
	let email = document.getElementById('email').value;

	let contact = { lastName, firstName, address, city, email }; //Objet contenant les inputs du formulaire

	let products = []; //Array contenant les informations du panier

	cartItems.forEach(item => {
		products.push(item.id);
	})

	const request = new Request(postUrlAPI, {
		method: 'POST',
		body: JSON.stringify({contact, products}),
		headers: new Headers ({
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		})
	});
	fetch(request)
	.then(response => response.json())
	.then( (response) => {
		if (form.checkValidity() === false) { //Si le formulaire n'est pas valide
			const contact = document.getElementById('contact')
			const alert = contact.appendChild(document.createElement('div'))
			alert.classList.add('error') // Traitement CSS du message d'erreur
			alert.innerText = 'Veuillez vérifier les champs du formulaire !'
		} else if (form.checkValidity() === true) {
			let getOrderId = response.orderId;
			let getTotalCost = totalCartCost.innerHTML;
			localStorage.clear();
			let orderRecap = { getOrderId, getTotalCost };

			localStorage.setItem("orderConfirmed", JSON.stringify(orderRecap));
			setTimeout(function() {
				window.location = "confirmation.html";
			}, 3000)
		}
	})
}
