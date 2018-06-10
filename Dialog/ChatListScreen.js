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
      firebaseUser:''
      

    };

 

  
  }

  componentWillMount()
  {
    const userId = this.props.navigation.getParam('firebaseUser','');
    this.setState({firebaseUser:userId});
  
   
    
    firebase.database().ref('users/'+userId+'/friends').on('value', (snapshot) => {
      const res = snapshot.val();
        var friends = [];
        
        snapshot.forEach(function (childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var childData =childSnapshot.val();
          var key = childData.friendId;
          var name ='';
          name = childData.name;
          var friend = {};
          firebase.database().ref('users/'+name).on('value', (snapshot) => {
            var  usr= snapshot.val();
            
            
          });
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
          <TouchableOpacity key={friend.key}
          // onPress={() => {
          //   props.navigator.push({
          //     id: props.id,
          //     name: props.name,
          //     image: props.image,
          //   });
          // }}
          onPress={() => {
             this.props.navigation.navigate('Chat',{
               name:'Chat con '+friend.name,
               friendId:friend.id
            
            });
            }}
        >
          <ChatItem key={friend.key} id={friend.id} name={friend.name} time="2:00" message={friend.state} image={friend.image}
          />
          </TouchableOpacity>
        )
    })
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <View  >
          <Header/>
        </View>
        
      
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

