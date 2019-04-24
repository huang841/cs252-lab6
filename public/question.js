const db = firebase.firestore();

var min=0;
var max=3;
var randNum = Math.round(Math.random() * (max-min)) + min;
var questionNum = `q${randNum}`;
var correctAnswer;

var docRef = db.collection("questionBank").doc(questionNum);

var question;
var choiceA, choiceB, choiceC;

docRef.get().then(function(doc) {
    if (doc.exists) {
        question = doc.data().question;
        choiceA = doc.data().choice["a"];
        choiceB = doc.data().choice["b"];
        choiceC = doc.data().choice["c"];
        correctAnswer = doc.data().answer;
        console.log(randNum, "Document data:", doc.data());
    } else {
        question = "Who is the smartest guy?";
        choiceA = "Gustavo";
        choiceB = "Trump";
        choiceC = "John Snow";
        correctAnswer = "a";
        console.log("No such document!");
    }
    document.getElementById("question").innerHTML = question;
    document.getElementById("choiceA").innerHTML = choiceA;
    document.getElementById("choiceB").innerHTML = choiceB;
    document.getElementById("choiceC").innerHTML = choiceC;
}).catch(function(error) {
    console.log("Error getting document:", error);
});

function test(){
    var radios = document.getElementsByName("loan");
    var value = 0;
    var answer;
    var map;
    for(var i=0;i<radios.length;i++){
        if(radios[i].checked == true){
            value = radios[i].value;
        }
    }
    if(value == correctAnswer){
        //document.getElementById('popup').style.display='none';
        window.location.href="mygame.html";
    }else {
        if (correctAnswer == "a") 
            answer = choiceA;
        if (correctAnswer == "b") 
            answer = choiceB;
        if (correctAnswer == "c") 
            answer = choiceC; 
 
        firebase.auth().onAuthStateChanged(function(user) {
            if(user) {
                console.log(user);
                db.collection("users").doc(user.uid).get().then(function(doc) {
                    if (doc.exists) {
                        map = doc.data().wrongAnswer;
                        console.log(map);
                        map[`${question}`] = answer;
                        console.log(map);

                        db.collection("users").doc(user.uid).update({
                            wrongAnswer: map
                        }).then(function(){
                            window.location.href="index.html";
                            console.log("Document successfully updated");
                        }).catch(function(error) {
                            console.error("Error updating score: ", error);
                        });
                    } else {
                        console.log("No map there!");
                    }
                });
            } else {
                window.location.href="index.html";
                console.log('not logged in');
            }
        });
    }
}
window.onload=function () {
    //document.getElementById('btn').onclick=function () {
        //document.getElementById('popup').style.display='block';
    //}
}
