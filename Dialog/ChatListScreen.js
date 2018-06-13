import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TextInput,Image,ScrollView,SafeAreaView,Icon,TouchableOpacity } from 'react-native';

import * as firebase from 'firebase';
import ChatItem from './components/chats'
import Header from './components/header'


export default class ChatList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'Anonimo'),
      headerRight: (
        <Button
          onPress={() => navigation.navigate('Profile',{firebaseUser:navigation.getParam('firebaseUser', 'Anonimo'),name:"Dialog"})}
          title="Mi perfil"
          color="#000"
        />
      ),
   
    };
  };
  constructor(props){
    super(props);
    this.state = {
       friends:[ ],
      index: 0,
      firebaseUser:'',
      first:false

    };

 

  
  }

  componentWillMount()
  {
    const userId = this.props.navigation.getParam('firebaseUser','');
    this.setState({firebaseUser:userId});
    var doif = this.state.first;
   
    firebase.database().ref('users/'+userId+'/friends').on('value', (snapshot) => {
     
     
      const res = snapshot.val();
        var friends = [];
        
        snapshot.forEach(function (childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var childData =childSnapshot.val();
          var key = childData.friendId;
          var name ='';
          name = childData.name;
          var mail = childData.mail;
          var lastMessage = childData.lastMessage;
         
          var friend = {};
          //console.log(key);
          // childData will be the actual contents of the child
          friend = {
            name: name,
            message: "state",
            image: "https://scontent.fgdl4-1.fna.fbcdn.net/v/t1.15752-9/35297836_1064934710325183_590673997381763072_n.png?_nc_cat=0&oh=caf0f17b7de4717e74acbd01d8400fab&oe=5BA5383F",
            id: key,
            key: key,
            lastMessage:lastMessage,
            mail:mail
          };
      friends.push(friend);
        });
      
        this.setState({friends:friends});  
        this.setState({first:true});
    });
    
  }
  
  render() {
    //   const { navigate } = this.props.navigation;
    const myName = this.props.navigation.getParam('myName','');
    const myMail = this.props.navigation.getParam('myMail','');
    
    const chatLists = this.state.friends.map( friend => {
        return(
          <TouchableOpacity key={friend.key}
          onPress={() => {
             this.props.navigation.navigate('Chat',{
               name:'Chat con '+friend.name,
               friendId:friend.id,
               firebaseUser:this.state.firebaseUser,
               friendName:friend.name,
               friendMail:friend.mail,
               myName:myName,
               myMail:myMail
            
            });
            }}
        >
          <ChatItem key={friend.key} id={friend.id} name={friend.name} time="" message={friend.lastMessage} image={friend.image}
          />
          </TouchableOpacity>
        )
    })
    return (
      <SafeAreaView style={styles.SafeAreaView}>
      
      
        <ScrollView>
   
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

