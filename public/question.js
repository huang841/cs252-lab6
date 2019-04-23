const db = firebase.firestore();

var min=0;
var max=2;
var randNum = Math.round(Math.random() * (max-min)) + min;
var question = `q${randNum}`;

var docRef = db.collection("questionBank").doc(question);

docRef.get().then(function(doc) {
    if (doc.exists) {
        document.getElementById("question").innerHTML = doc.data().question;
        document.getElementById("choiceA").innerHTML = doc.data().choice["a"];
        document.getElementById("choiceB").innerHTML = doc.data().choice["b"];
        document.getElementById("choiceC").innerHTML = doc.data().choice["c"];
        console.log(randNum, "Document data:", doc.data());
    } else {
        document.getElementById("question").innerHTML = "Who is the smartest guy?";
        document.getElementById("choiceA").innerHTML = "Gustavo";
        document.getElementById("choiceB").innerHTML = "Trump";
        document.getElementById("choiceC").innerHTML = "John Snow";
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


