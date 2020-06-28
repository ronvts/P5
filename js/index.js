const urlAPI = 'http://localhost:3000/api/cameras'; //URL de l'API 

class List { // Création d'une class
  constructor(element, urlAPI) { // Avec en constructeur un élément et l'url de l'API
    this.ul = document.getElementById(element); //Sélection de la balise ul 
    ajaxGet(urlAPI).then ((products) => { // Appel de la fonction ajax et retourne une promesse
      products.forEach(product => { //Pour chaque produit, on fait appel a la fonction renderHTML
        this.ul.appendChild(this.renderHTML(product)); // si elle réussie elle utilise la méthode appendChild
      })
    }).catch(function (error) { //Si la requête échoue
    console.error("Erreur lors de la requête", error); //Affichage de l'erreur dans la console
    const grid = document.getElementById('all-products'); // On accède à la balise d'affichage des produits
    const alert = grid.appendChild(document.createElement('div')) // On y créer une balise div
    alert.classList.add('error') // Traitement CSS du message d'erreur
    alert.innerText =
      "Une erreur s'est produite lors du chargement des articles."
  })
  } 
  renderHTML(product) { //La fonction s'éxécute pour chaque produit
    let li = document.createElement('li'); //Création du bloc d'affichage 
    li.innerHTML = `
    <div class="product-info">
      <div class="product-image">
        <img class="img-index" src="${product.imageUrl}" alt="Caméra"/>
      </div>
      <div class="product-name">
        <h3>${product.name}</h3>
      </div>
      <div class="product-description">
        <p>${product.description}</p>
      </div>
      <div class="product-price">${product.price/100} €</div>
      <button id="buttonProduct${product._id}" class="btn" onclick='location.href="produit.html?idProduct=${product._id}"'role="button">Voir le produit</a>
    `; 
    return li // Retourne l'élément de création du bloc d'affichage
  }
}
const list = new List('grid-products', urlAPI)
