document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    console.log(app);
});

function writeUserData(userID, name, email) {
    const db = firebase.firestore();
    var docRef = db.collection("users").doc(userID);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            docRef.set({
                userName: name,
                Email: email,
                score: 0,
                wrongAnswer: {}
            }).then(function() {
                console.log("Document successfull written!");
            }).catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }
    }).then(function() {
        window.location.href="index.html";
    }).catch(function(error) {
        console.error("Error writing document: ", error);
    });
} 

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
            .then(result => {
                console.log("In googleLogin");
                const user = result.user;
                const userID = user.uid;
                const name = user.displayName;
                const Email = user.email;
                writeUserData(userID, name, Email);
            })
            .catch(function(error) {
                console.log(error);
            });
}

function signUp(){
    const username = document.getElementById("txtusername").value;
    const email = document.getElementById("txtemail").value;
    const password = document.getElementById("txtpassword").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            user.updateProfile({
                displayName: username
            }).then(function() {
                const user = result.user;
                const userID = user.uid;
                const name = user.displayName;
                const Email = user.email;
                writeUserData(userID, name, Email);
            }).catch(function(error) {
                console.log(error);
            });
            
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
}

function signIn(){
    const email = document.getElementById("txtemailin").value;
    const password = document.getElementById("txtpasswordin").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(result => {
            const user = result.user;
            window.location.href="index.html";
            console.log(user);  
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/wrong-password') {
                alert('Wrong password');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
}

function facebookLogin(){
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                const userID = user.uid;
                const name = user.displayName;
                const Email = user.email;
                writeUserData(userID, name, Email);
                console.log(user);
            })
            .catch(function(error) {
                const email = error.email;
                const credential = error.credential;
                if (error.code === 'auth/account-exists-with-different-credential') {
                    auth.fetchProvidersForEmail(email).then(function(provider){});
                }
            });
}

function logOut(){
    firebase.auth().signOut()
        .then(function() {
            window.location.href="index.html";
        }).catch(function(error) {
            console.log(error);
        });
}