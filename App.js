// import { StatusBar } from 'expo-status-bar';
// import { separateMessageFromStack } from 'jest-message-util';
// import React, {useState, useCallback, useEffect} from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import {GiftedChat} from 'react-native-gifted-chat';
// import db from "./firebase"; 

// export default function App() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     db.collection("Chats")
//       .doc("myfirstchat")
//       .get()
//       .then((snapshot) => {
//         console.log(snapshot.id);
//         console.log(snapshot.data());
//       });
//   }, [])

//   const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
//   }, [])

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       showUserAvatar 
//       user={{ 
//         _id: 1,
//         name: "Samara", 
//         avatar: require("./assets/crying_kiki.png"),
//       }}
//       placeholder={"Hello"} //default is 'Type a message...'
//       alwaysShowSend={true}
//       renderUsernameOnMessage = {true}
//     />
//   )
// }


//App.js
// import React, { useState, useCallback, useEffect } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import db from "./firebase";
// import firebase from "firebase/app";

// export default function App() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     let unsubscribeFromNewSnapshots = db
//       .collection("Chats")
//       .doc("myfirstchat")
//       .onSnapshot((snapshot) => {
//         console.log("New Snapshot!");
//         setMessages(snapshot.data().messages);
//       });

//     return function cleanupBeforeUnmounting() {
//       unsubscribeFromNewSnapshots();
//     };
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     db.collection("Chats")
//       .doc("myfirstchat")
//       .update({
//         // arrayUnion appends the message to the existing array
//         messages: firebase.firestore.FieldValue.arrayUnion(messages[0]),
//       });
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, messages)
//     );
//   }, []);

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(messages) => onSend(messages)}
//       user={{
//         // current "blue bubble" user
//         _id: 1,
//         name: "Samara",
//         avatar: "https://placeimg.com/140/140/any",
//       }}
//       inverted={true}
//       showUserAvatar={true}
//       renderUsernameOnMessage={true}
//     />
//   );
// }

import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;
