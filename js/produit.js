const urlAPI = 'http://localhost:3000/api/cameras/';
let panierJSON = localStorage.getItem("panier"); // Contenu du panier en JSON dans le localStorage
let panier = panierJSON == null?[]:JSON.parse(panierJSON); // On obient un objet du panier

const getProduct = function () { //Fonction pour la page produit
    let params = (new URL(document.location)).searchParams; //Retourne un objet URLSearchParams
    let id = params.get('idProduct'); // Extrait le paramètre idProduct de l'API
    let url = urlAPI + id // url de l'id du produit

    ajaxGet(url).then(function (response){ //Elle retourne une promesse avec l'url du produit en paramètre
        const item = response // La réponse de la promesse contient les informations du produit
                const h3 = document.querySelector(".item-name") //Sélection des balises html pouir l'affichage
                const id = document.querySelector('.item-id')
                const img = document.querySelector(".item-image img")
                const desc = document.querySelector(".item-description")
                const select = document.querySelector("#customize")
                const price = document.querySelector(".item-price")
                const itemPrice = ((item.price) / 100)
                h3.innerText = item.name 
                id.innerText = item._id //
                img.setAttribute("src", item.imageUrl)
                img.setAttribute("alt", item.name)
                desc.innerText = item.description
                price.innerText = itemPrice + " €"
                for (let i = 0; i < item.lenses.length; i++) { // Affiche les options du produit
                        const lense = item.lenses[i]
                        const option = select.appendChild(document.createElement("option"))
                        option.setAttribute("value", lense)
                        option.innerText = lense
                }

        }).catch(function (error) {
                console.error("Erreur lors de la requête", error)
                const article = document.querySelector(".view-product")
                const alert = article.appendChild(document.createElement("div")) 
                alert.classList.add("error") 
                alert.innerText = "Le visionnement de l'article est indisponible"
        })
}
    getProduct() // Appel de la fonction

//Ajout au panier 
const id = document.querySelector('.item-id')
const button = document.querySelector('.add-cart')
const lense = document.getElementById('customize')
const qty = document.getElementById('qty')
const name = document.querySelector('.item-name')
const price = document.querySelector(".item-price")

button.addEventListener('click', function (event) { //Évènement au click sur le bouton 
        const order = { //Création d'un objet order au click sur le bouton 'ajouter au panier'
                name: name.innerText,
                id: id.innerText,
                lense: lense.value, 
                quantity: qty.value,
                price: price.innerText
        }
        panier.push(order) // Envoie l'objet de commande
        const stringOrder = JSON.stringify(panier) //Transforme l'objet order en chaine de caractères
        localStorage.setItem('panier', stringOrder) //Stock la réponse dans le localStorage dans une catégorie 'panier'
})

