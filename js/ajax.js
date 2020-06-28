//GET request
const ajaxGet = function (url) { // La fonction a en paramètre un url
    return new Promise(function (resolve, reject) { // Elle retourne une promesse
        const httpRequest = new XMLHttpRequest() // Création d'une nouvelle requête XML
        httpRequest.onreadystatechange = function () { //Traitement de la réponse
            if (httpRequest.readyState === 4) { 
                if (httpRequest.status === 200) { // Si la requête est réussie et qu'elle obtient un status HTTP de 200
                    resolve(JSON.parse(httpRequest.responseText)) //Promesse résolue : JSON.parse pour analyser l'objet et le transformer en réponse texte
                } else {
                    reject(httpRequest) // La promesse échoue : erreur d'accès à l'API
                    console.log("Erreur de chargement")
                }
            }
        }
        httpRequest.open("GET", url, true) // Lance la requête avec la méthode GET, l'URL en paramètre et de façon asynchrone
        httpRequest.send() //Envoie la requête au serveur
    })
}