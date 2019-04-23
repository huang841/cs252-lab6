const db = firebase.firestore();

function* entries(obj) {
    for (let key of Object.keys(obj)) {
      yield [key, obj[key]];
    }
 }

firebase.auth().onAuthStateChanged(function(user) {
    if(user != null) { 
        var docRef = db.collection("users").doc(user.uid); 
        docRef.get().then(function(doc) {
            if (doc.exists) {
                var wrongA = doc.data().wrongAnswer; 
                console.log(wrongA);
                var i = 1;
                for (let [question, answer] of entries(wrongA)) {
                    document.getElementById(`i${i}`).innerHTML = `${i}`;
                    document.getElementById(`Q${i}`).innerHTML = question;
                    document.getElementById(`A${i}`).innerHTML = answer;
                    i += 1;
                    if (i > 5) {
                        break;
                    }
                }
                console.log("Document data:", doc.data());
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });                       
    }
});