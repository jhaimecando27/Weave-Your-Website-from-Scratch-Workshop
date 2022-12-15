/* References
 *************************/
// Ref1 (Original Repo): https://github.com/GDSC-PLM/Weave-Your-Website-from-Scratch-Workshop
// Ref2 (Firebase Setup Sample): https://github.com/GDSC-PLM/Spark-Firebase-Hosting/tree/main/src
// Ref2 (Multiple ID): https://stackoverflow.com/questions/14408891/getelementbyid-multiple-ids
// Ref3 (addEventListener in Multiple ID): https://stackoverflow.com/questions/50643302/addeventlistener-on-a-queryselectorall-with-classlist


/* Firebase Configurations
 *************************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsmaDQngFZ4Q2qeRJhgMMXuc6PGulw3oo",
  authDomain: "back-to-basics-jhaime.firebaseapp.com",
  projectId: "back-to-basics-jhaime",
  storageBucket: "back-to-basics-jhaime.appspot.com",
  messagingSenderId: "489435478190",
  appId: "1:489435478190:web:c2f72420c7e278b818553f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
console.log("Firebase initialized");


/* The G-Spot - Where the magic happens :)
 *****************************************/

// Get all the birdies :)
const birdBtns = document.querySelectorAll('#birdBtn');


// Put 1 stalker on each birdy and record if someone tickled it
for (let i = 0; i < birdBtns.length; i++) {
    birdBtns[i].addEventListener('click', () => {
        let participantObject = {
            bot: birdBtns[i].innerHTML,
        };

        try {
            addDoc(collection(db, "tickles"), participantObject);
        } catch (error) {
            window.alert("Register error");
        }

        // Update if tickled (For some reason its needed)
        getNumberParticipants(birdBtns[i].innerHTML);
    });

    // Update the tickle counts
    getNumberParticipants(birdBtns[i].innerHTML);
}

/* Tickle counters
 *      In the previous loop it able to identify what bird is tickled by
 *      knowing the content of the div. With that said, it can be used to
 *      update the specific count of the bird, which is why the ids of the
 *      element that contains the counters is in pascal case. But, if you want
 *      to follow te best practice which is the camel case, just make use of 
 *      `toLowerCase()` before concatinating with "Count".
 */
async function getNumberParticipants(bird) {
    let tickleQuery = query(collection(db, "tickles"), where("bot", "==", bird));
    let firebaseResponse = await getDocs(tickleQuery);
    let numberTickleElement = document.getElementById(bird.concat("Count"));

    console.log(firebaseResponse);

    let nParticipants = firebaseResponse.docs.length;

    numberTickleElement.innerHTML = nParticipants;
}

