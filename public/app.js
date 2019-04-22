document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    console.log(app);

    const db = firebase.firestore();

    const myPost = db.collection('posts').doc('firstpost');

});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
            .then(result => {
                console.log("In googleLogin");
                const user = result.user;
                window.location.href="index.html";
                console.log(user);
            })
            .catch(function(error) {
                console.log
            });
}

function signUp(){
    const username = document.getElementById("txtusername").value;
    const email = document.getElementById("txtemail").value;
    const password = document.getElementById("txtpassword").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
            const user = result.user;
            user.updateProfile({
                displayName: username
            });
            window.location.href="index.html";
            console.log(user);  
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
                window.location.href="index.html";
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

function updatePost(e) {
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update({title: e.target.value})
}

function createAEmail(e) {
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update({Email: e.target.value})
}