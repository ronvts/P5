const urlAPI = 'http://localhost:3000/api/cameras/';
let panierJSON = localStorage.getItem("panier");
let panier = panierJSON == null?[]:JSON.parse(panierJSON);

const getProduct = function () { //Fonction pour la page produit
    let params = (new URL(document.location)).searchParams;
    let id = params.get('idProduct');
    let url = urlAPI + id 

    ajaxGet(url).then(function (response){
        const item = response //La réponse de la promesse contient les informations du produit
                const h3 = document.querySelector(".item-name")
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
                for (let i = 0; i < item.lenses.length; i++) {
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
    getProduct()

//Ajout au panier 
const id = document.querySelector('.item-id')
const button = document.querySelector('.add-cart')
const lense = document.getElementById('customize')
const qty = document.getElementById('qty')
const name = document.querySelector('.item-name')
const price = document.querySelector(".item-price")

button.addEventListener('click', function (event) {
        const order = { //Création d'un objet order au click sur le bouton 'ajouter au panier'
                name: name.innerText,
                id: id.innerText,
                lense: lense.value, 
                quantity: qty.value,
                price: price.innerText
        }
        panier.push(order)
        const stringOrder = JSON.stringify(panier) //Transforme l'objet order en chaine de caractères
        localStorage.setItem('panier', stringOrder) //Stock la réponse dans le localStorage dans une catégorie 'panier'
})

