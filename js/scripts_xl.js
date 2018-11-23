/*!
 * @Author: SALIM Youssef
 * @Date:   2018-Nov
 */

 $().ready(function() {

     // desactiver les boutons s'il y a rien à lire ou generer
     $('#saveQRCode, #listenField, #stop, #preview, #annuler').attr('disabled', true);

     //caché le button stop
     document.getElementById("stop").style.display = "none";

     //exporter le QR
     $('#saveQRCode').click(function(){ saveQRCodeImage(); });

     //btn annuler -> reinitialiser l'affichage
     $('#annuler').click(function(){
       document.getElementById('myFormActive').reset();
       document.getElementById('errorMessage').style.display = "none";
       document.getElementById('successMessage').style.display = "none";


       //supprimer l'image du QR
       var divImgQr = document.getElementById('qrView');
       divImgQr.removeChild(divImgQr.firstChild);

       //supprimer les textarea, inputs ..
       var divChamps = document.getElementById('cible');
        while (divChamps.firstChild) {
          divChamps.removeChild(divChamps.firstChild);
        }

        //desactiver les buttons
       $('#saveQRCode, #listenField, #stop, #preview, #annuler').attr('disabled', true);
     });


       // sur clic du bouton Lire pour ecouter les textes saisis
       $('button#listenField').click(function(){
         document.getElementById("listenField").style.display = "none";
         document.getElementById("stop").style.display = "";
         // getForm(null);
       });

       // sur clic du bouton Stop
       $('button#stop').click(function(){
         document.getElementById("stop").style.display = "none";
         document.getElementById("listenField").style.display = "";
         stopLecture();
       });

       // sur clic du bouton sauvegarderQRcode
       $('button#sauvegarderQRcode').click(function(){
         var nomQR = document.getElementById("nameQRCode").value;
         var contenuQR = document.getElementById("LegendeQR").value;
         var colorQR = document.getElementById("colorQR").value;

         sauvegarderFichierJsonUnique(nomQR,contenuQR,colorQR);

         $('#sauvegarderFichierJson').modal('hide');
         document.getElementById("nameQRCode").value = "";
         document.getElementById("LegendeQR").value = "";
       });


       // fonction pour dispatcher
       // document.addEventListener('click', function() {
       //   recognizeFunction(event);
       // });

       remplirListeMusic();



 });

 //verifier les champs du formulaire myFormActive puis activer le button generer
 function activer_button(){
     if (document.getElementById('qrName').value.length > 0)
     {
         $('#preview').attr('disabled', false);
     }
   }

   //pour ajouter une nvlle legende (textarea) a chaque click sur button Texte
   function ajouterChampLegende(){
     var textareaLegende = document.createElement('div');
     textareaLegende.innerHTML = "<textarea class='form-control qrData' rows='3' name='' placeholder='Mettre la légende'></textarea>"
                       +"<button type='button' class='btn btn-outline-success legendeQR-close-btn' onclick='supprimerChampLegende(this);'>"
                       +"<i class='fa fa-trash-alt'></i>"
                       +"</button>"
                       +"<button type='button' class='btn btn-outline-success legendeQR-close-btn'>"
                       +"<i class='fa fa-play'></i>"
                       +"</button>";
     textareaLegende.setAttribute("class", "d-flex align-items-start legendeQR");
     textareaLegende.setAttribute("id", "legendeTexarea");
     document.getElementById('cible').appendChild(textareaLegende);
   }

   function supprimerChampLegende(e){
       $(e).parents('div#legendeTexarea').remove();
     }

     //generer un input 'pour un fichier audio' -> nom de fichier + url
     function ajouterChampSon(nom,url){

       console.log("-- ajouterChampSon --");

       var inputSon = document.createElement('div');
       inputSon.innerHTML = "<input type='text' id='sonName' name='sonName' class='form-control' value='"+nom+"' readonly>"
                         + "<input id='sonUrl' name='sonUrl' type='hidden' value='"+url+"'>"
                         +"<button type='button' class='btn btn-outline-success legendeQR-close-btn' onclick='supprimerChampSon(this);'>"
                         +"<i class='fa fa-trash-alt'></i>"
                         +"</button>"
                         +"<button type='button' class='btn btn-outline-success legendeQR-close-btn'>"
                         +"<i class='fa fa-play'></i>"
                         +"</button>";
       inputSon.setAttribute("class", "d-flex align-items-start legendeQR");
       inputSon.setAttribute("id", "inputSon");
       document.getElementById('cible').appendChild(inputSon);

       $('#listeMusic .close').click();

     }

     function supprimerChampSon(e){
         $(e).parents('div#inputSon').remove();
       }


    //remplir le Modal 'listeMusic' par des fichiers audio depuis le drive
    function remplirListeMusic(){

      console.log(TOKEN_PATH);

      try {
        // Load client secrets from a local file.
        fs.readFile('client_secret.json', function processClientSecrets(err, content) {
          if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
          }
          // Authorize a client with the loaded credentials, then call the Drive API.
          authorize(JSON.parse(content), listFiles);
        //  console.log(listFiles);
        });
      } catch (e) {
        alert('Erreur : ' + e.stack);
      }

    }


     //creer+sauvegarder le fichier json correspond à un qrcode qui depasse la taille 500
     function sauvegarderFichierJsonUnique(qrcode){
       console.log("-- sauvegarderFichierJsonUnique -- taille: "+qrcode.getDataString().length);

       let now = new Date();
       let nomFichier = now.getDay()+"-"+now.getMonth()+"-"+now.getFullYear()+"-"+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
       let path = "./QR-Unique/json/"+nomFichier+".json";
       fs.writeFile(path, JSON.stringify(qrcode), (err) => {
           if (err) {
               console.error(err);
               return;
           };
           console.log("fichier .json bien sauvegardé");
       });
     }