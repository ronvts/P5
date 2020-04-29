//Fonction sélection élements
const selectElement = (s) => document.querySelector(s);

//Ouvrir le menu au clic
selectElement('.open').addEventListener('click', () => {
    selectElement('.nav-list').classList.add('active');
});

//Fermer le menu au clic
selectElement('.close').addEventListener('click', () => {
    selectElement('.nav-list').classList.remove('active');
});
