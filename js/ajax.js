//GET request
const ajaxGet = function (url) { // La fonction a en parametre un url
    return new Promise(function (resolve, reject) { // Retourne une promesse
        const httpRequest = new XMLHttpRequest() // Création de la requête
        httpRequest.onreadystatechange = function () { //Traitement de la réponse
            if (httpRequest.readyState === 4) { 
                if (httpRequest.status === 200) { //Si la requête réussie 
                    resolve(JSON.parse(httpRequest.responseText)) //Promesse résolue : fonction JSON.parse pour analyser l'objet et le transformer en réponse texte
                } else {
                    reject(httpRequest) // La promesse échoue : erreur d'accès à l'API
                    console.log("Erreur de chargement")
                }
            }
        }
        httpRequest.open("GET", url, true) // Lance la requete avec la Méthode GET, l'URL en paramètre et asynchrone
        httpRequest.send() //Envoi de la requête au serveur
    })
}