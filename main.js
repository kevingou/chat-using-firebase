//import firebase from "firebase/app";
//import "firebase/database";
  const firebaseConfig = {
    apiKey: "AIzaSyB5mILO_23Z8oLmuuzjBNKtpQ7d-l61TC0",
    authDomain: "chatting-c6476.firebaseapp.com",
    databaseURL: "https://chatting-c6476-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chatting-c6476",
    storageBucket: "chatting-c6476.appspot.com",
    messagingSenderId: "120478043539",
    appId: "1:120478043539:web:88a594d00418252fb2ac66"
  };
  // specify the firebase information used in this project

  firebase.initializeApp(firebaseConfig);
  // initialize the database and copy it locally to be used later

  const db = firebase.database();
  //get a reference to the database
  const username = prompt("Please Tell Us Your Name");
// fetch information from the user input
  document.getElementById("message-form").addEventListener("submit", sendMessage);
// when the form is submitted,  execute the function to update the database

  function sendMessage(e) {
    e.preventDefault();
  // prevent the page to be reloaded

    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
    // get the user input directly using dom tree
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
    .getElementById("messages")
     .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + username).set({
      
      message,
    });
  }
  //document.getElementById("message-form").addEventListener("submit", sendMessage);

  const fetchChat = db.ref("messages/");
  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  });