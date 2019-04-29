document.addEventListener("DOMContentLoaded", event => {
    const db = firebase.firestore()

    db.collection("events").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
})
