let panierJSON = localStorage.getItem("panier");
let panier = panierJSON == null?[]:JSON.parse(panierJSON);

const container = document.getElementById('tbody-cart'); //Sélection de l'élément parent

for(let key in panier) { //Pour chaque objet présent dans la catégorie panier du localStorage
	// let line = panier[key];
	createCart(panier[key], key)
	showTotal(panier)
}

function createCart(line, key) { // La fonction prend en paramètre la ligne et la clé de l'objet panier du localStorage
	let tr = document.createElement("tr"); // Déclare les variables créant les balises d'affichage du tableau
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
function showTotal(panier) { // La fonction prend en paramètre le panier
	let calculTotal = 0; // Le total du panier est initialisé à zéro
	for (let j in panier) { // La boucle ajoute à cette variable le prix et la quantité de chaque produit du panier avec la méthode .parseInt
		calculTotal += parseInt(panier[j].price) * parseInt(panier[j].quantity);
		}
	let totalOrder = document.getElementById('total-cart') // Sélection de la balise d'affichage du total panier
	totalOrder.innerText = calculTotal + ' €'
}

// Suppression d'un article du panier
let removeCartItem = document.getElementsByClassName('btn-remove') // Sélectionne le bouton de suppression d'un article, stocké dans une variable
	for (let i = 0; i < removeCartItem.length; i++) { // La boucle parcoure tous les boutons correspondants au nombre de produits affichés
		let button = removeCartItem[i]
		button.addEventListener('click', function(event) { // Méthode addEventListener au click sur le bouton supprimer appelant une fonction avec en paramètre un évènement
		let buttonClicked = event.target
		let index = buttonClicked.getAttribute("data-index")
		buttonClicked.parentElement.parentElement.remove()
		panier.splice(index, 1) // Supprime la ligne du panier
		localStorage.setItem('panier', JSON.stringify(panier)) // Actualise l'objet panier du localStorage
	})
}

// Envoi du formulaire

const form = document.getElementById('form');
const cartItems = JSON.parse(localStorage.getItem('panier')) || []; 
const postUrlAPI = "http://localhost:3000/api/cameras/order";
const totalCartCost = document.getElementById('total-cart');
function sendData() {
	event.preventDefault();
	let lastName = document.getElementById('lastName').value; // Valeur des inputs du formulaire
	let firstName = document.getElementById('firstName').value;
	let address = document.getElementById('address').value;
	let city = document.getElementById('city').value;
	let email = document.getElementById('email').value;

	let contact = { lastName, firstName, address, city, email }; // Objet contenant les inputs du formulaire

	let products = []; // Array contenant les informations du panier

	cartItems.forEach(item => {
		products.push(item.id); // Utilise la méthode .push pour chaque item du panier
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
	.then(response => response.json()) // Utilisation de fetch qui renvoie une promesse avec en paramètre la réponse en JSON
	.then( (response) => {
		if (form.checkValidity() === false) { // La fonction checkValidity vérifie si le formulaire est valide
			const contact = document.getElementById('contact')
			const alert = contact.appendChild(document.createElement('div')) // Crée un bloc d'affichage
			alert.classList.add('error') // Traitement CSS du message d'erreur
			alert.innerText = 'Veuillez vérifier les champs du formulaire.' // Message pour l'utilisateur
		} else if (form.checkValidity() === true) { //Si le formulaire est valide
			let getOrderId = response.orderId; //On obient un id de la commande
			let getTotalCost = totalCartCost.innerHTML;
			localStorage.clear(); // Le localStorage est vidé
			let orderRecap = { getOrderId, getTotalCost }; // Un objet récapitulatif de la commande est crée

			localStorage.setItem("orderConfirmed", JSON.stringify(orderRecap)); //Stock l'objet recapitulatif dans le localStorage pour l'afficher dans la page de confirmation
			setTimeout(function() {
				window.location = "confirmation.html"; //Redirection vers la page de confirmation
			}, 3000)
		}
	})
}
