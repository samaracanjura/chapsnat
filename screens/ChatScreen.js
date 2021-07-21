
import React, { Image,useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../firebase";
import firebase from "firebase/app";

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  //<Image> source ={require('./assets/crying_kiki.png')}>

  useEffect(() => {
    let unsubscribeFromNewSnapshots = db
      .collection("Chats")
      .doc(route.params.chatname)
      .onSnapshot((snapshot) => {
        console.log("New Snapshot!");
        let newMessages = snapshot.data().messages.map((singleMessage)=>{
            singleMessage.createdAt = singleMessage.createdAt.seconds*1000;
            return singleMessage;
        })
        setMessages(newMessages);
      });

    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    db.collection("Chats")
      .doc(route.params.chatname)
      .update({
        // arrayUnion appends the message to the existing array
        messages: firebase.firestore.FieldValue.arrayUnion(messages[0]),
      });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        // current "blue bubble" user
        _id: "myidnumber",
        name: "Samara",
        avatar: "https://assets.teenvogue.com/photos/58cc073934fff6436cff0a42/master/pass/kim-kardashian.jpg",
        //avatar: require ("../assets/crying_kiki.png"),
      }}
      inverted={false}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}

