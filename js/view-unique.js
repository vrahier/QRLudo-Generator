var facade = new FacadeController();
var tabQRCode = [];
var typeQR; // rens le type de qrcode

typeQR = 'atomique';

$(document).ready(function() {

  //document.getElementById('preview').addEventListener('click', preview); // prévisualiser le qr-code
  $('#nameQRCode').keypress(function(e){
    var key = e.keyCode;
    if (!(key >= 65 && key <= 90) && !(key >= 97 && key <= 122)) {
      e.preventDefault();
    }
  });

});


// Générer un champ pour de la musique
function createMusicBox () {
  try {
    // Load client secrets from a local file.
    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
      if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
      }
      // Authorize a client with the loaded credentials, then call the Drive API.
      authorize(JSON.parse(content), listFiles);
    });
  } catch (e) {
    alert('Erreur : ' + e.stack);
  }
}

// créer le contenu d'un item à partir de l'id renseigné.
function createItemContent (idActive, data) {
  try {
    var form;

    if (typeQR == 'atomique') { form = $('form#myFormActive'); }


    // ajouter un eventlistener sur playChamp pour lire le champ sur click du bouton
    $('img.playChamp').click(function(event){
      console.log(event.target);
      var texte = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].value;
      getForm(texte);
    });

    // activer/desactiver les boutons
    $('#read').attr('disabled', false);

  } catch (e) {
    alert('Erreur : ' + e.stack);
  }
}


// fonction pour prévisualiser un qrcode
function preview () {
  try {
    console.log('---- ETAPE 1: view-unique.js : function preview');
    // pour qrcode atomique, pas de famille
    if (typeQR == 'atomique') { previewQRCode(false); }
  } catch (e) {
    alert('Erreur : ' + e.stack);
  }
}

// fonction appelée pour faire le view du qrcode atomique
function drawQRCodeAtomique (qrcode) {
  try {

<<<<<<< HEAD
    baseViewQRCodeAtomique(null);

    $('input#colorQR').val(qrcode.getColorQRCode()); // restaurer la couleur du qrcode
    //$('textarea#LegendeQR').val(qrcode.getTexte(0)); //test

    for (var i=0; i<qrcode.getTailleContenu(); i++){

      if (qrcode.getTypeContenu(i) == DictionnaireXml.getTagTexte()){
        createItemContent(null, qrcode.getTexte(i));
      }

    }

  } catch (e) {
    alert('Erreur : ' + e.stack);
  }
}


// retourne l'architecture html de base pour un qrcode atomique
function baseViewQRCodeAtomique (callback) {
  typeQR = 'atomique';

  try {
    // activer / désactiver les bouton
    //$('#preview, #read').css('disabled', false);
    //$('#creer, #import').css('disabled', true);

    if (callback) { callback(null, null); }
=======
    $('input#colorQR').val(qrcode.getColorQRCode()); // restaurer la couleur du qrcode
>>>>>>> ec68ad49a3b386a106054a6fabf7114c9921ae0b

  } catch (e) {
    alert('Erreur : ' + e.stack);
  }
}

<<<<<<< HEAD
//creer+sauvegarder le fichier json correspond à un qrcode qui depasse la taille 500
function sauvegarderFichierJsonUnique(nomQR,contenuQR,colorQR){

  var qrUniqueJson = {
      type: typeQR,
      nom_qrcode: nomQR,
      contenu: contenuQR,
      qrColor: colorQR
  };

  var now = new Date();
  var path = "./JSON-QRCode-Atomique/QR-Atomique-"+now.getDay()+"-"+now.getMonth()+"-"+now.getFullYear()+"-"+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+".json";
  fs.writeFile(path, JSON.stringify(qrUniqueJson), (err) => {
      if (err) {
          console.error(err);
          return;
      };
      console.log("fichier .json bien sauvegardé");
  });
}

=======
>>>>>>> ec68ad49a3b386a106054a6fabf7114c9921ae0b

/**
 * Copyright © 12/02/2018, Corentin TALARMAIN, Thomas CALATAYUD, Rahmatou Walet MOHAMEDOUN, Jules LEGUY, David DEMBELE, Alassane DIOP
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * The Software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders X be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the Software.
 * Except as contained in this notice, the name of the Corentin TALARMAIN, Thomas CALATAYUD, Rahmatou Walet MOHAMEDOUN, Jules LEGUY, David DEMBELE, Alassane DIOP shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from the Corentin TALARMAIN, Thomas CALATAYUD, Rahmatou Walet MOHAMEDOUN, Jules LEGUY, David DEMBELE, Alassane DIOP
*/
