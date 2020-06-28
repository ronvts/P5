// Récupération du localStorage
const checkoutItems = JSON.parse(localStorage.getItem('orderConfirmed')) || []; 

let textZone = document.getElementById('confirmation');

// Création du contenu HTML et intégration du contenu du localStorage
textZone.innerHTML += 
`
<h3 class="recap-header">Voici le récapitulatif</h3>
<h3 class="recap-content">Identifiant de commande : <br /><span class="recap-info">${checkoutItems.getOrderId}</span></h3>
<h3 class="recap-content">Prix total de la commande : <br /><span class="recap-info">${checkoutItems.getTotalCost}</span></h3>
<h3 class="recap-footer">Merci pour votre commande. Nous vous enverrons un mail dès que celle-ci sera traitée.</h2>
`;