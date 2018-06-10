import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TextInput,Image,ScrollView,SafeAreaView,Icon,TouchableOpacity } from 'react-native';

import * as firebase from 'firebase';
import ChatItem from './components/chats'
import Header from './components/header'


export default class ChatList extends React.Component {

  static navigationOptions = {
    title: 'Home',
  };
  constructor(props){
    super(props);
    this.state = {
       friends:[ ],
      index: 0
      

    };

 

  
  }

  componentWillMount()
  {
    
    firebase.database().ref('users/'+this.props.firebaseUser+'/friends').on('value', (snapshot) => {
      const res = snapshot.val();
        const friends = [];
        snapshot.forEach(function (childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var name ="";

          name += childSnapshot.friendId;
          firebase.database().ref('users/'+childSnapshot.friendId).on('value', (snapshot) => {
              name= snapshot.val();
          });
          var key = childSnapshot.key;
          //console.log(key);
          // childData will be the actual contents of the child
    
          friend = {
            name: name,
            message: "state",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png",
            id: key,
            key: key
          };

      friends.push(friend);
        });
      this.setState({friends:friends});
    });
    
  }
  
  render() {
    //   const { navigate } = this.props.navigation;
   
    const chatLists = this.state.friends.map( friend => {
        return(
          <ChatItem key={friend.key} id={friend.id} name={friend.name} time="2:00" message="Socket.io state..." image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"
          />
        )
    })
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <View  >
          <Header/>
        </View>
      
        <ScrollView>
        <TouchableOpacity
    // onPress={() => {
    //   props.navigator.push({
    //     id: props.id,
    //     name: props.name,
    //     image: props.image,
    //   });
    // }}
    onPress={() => {
       this.props.navigation.navigate('Chat');
      }}
  >
        <ChatItem id="1" name="Fer" time="2:00" message="Socket.io state..." image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"
          on
        />
        </TouchableOpacity>
        {chatLists}
        
        </ScrollView>
        </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }

});

