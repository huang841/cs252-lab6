const db = firebase.firestore();

var usersRef = db.collection("users");

usersRef.orderBy("maxscore", "desc").limit(5)
    .get()
    .then(function(querySnapshot) {
        var nameArray = [];
        var scoreArray = [];
        var i = 0;
        querySnapshot.forEach(function(doc) {
            nameArray[i] = doc.data().userName;
            scoreArray[i] = doc.data().maxscore;
            i = i + 1;
            console.log(i, doc.id, " => ", doc.data());
        });
        document.getElementById("firstName").innerHTML = nameArray[0];
        document.getElementById("secondName").innerHTML = nameArray[1];
        document.getElementById("thirdName").innerHTML = nameArray[2];
        document.getElementById("fourthName").innerHTML = nameArray[3];
        document.getElementById("fifthName").innerHTML = nameArray[4];

        document.getElementById("firstScore").innerHTML = scoreArray[0];
        document.getElementById("secondScore").innerHTML = scoreArray[1];
        document.getElementById("thirdScore").innerHTML = scoreArray[2];
        document.getElementById("fourthScore").innerHTML = scoreArray[3];
        document.getElementById("fifthScore").innerHTML = scoreArray[4];
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });