import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TextInput,Image,ScrollView,SafeAreaView,Icon } from 'react-native';
import * as firebase from 'firebase';

import ChatItem from './components/chats';
import FriendModule from './components/FriendModule'

    

export default class ProfileScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          indiceActual: 0,
          telefonoActual:'??????',
          nombre:'',
          correo:'',
          editmode:true,
          firebaseUser:'',
    
        };

        //Bindings
        this.acutalizaLista = this.acutalizaLista.bind(this);
    }

    
    componentWillMount()
    {
      const userId = this.props.navigation.getParam('firebaseUser','');
      this.setState({firebaseUser:userId});
    
      
      firebase.database().ref('users/'+userId).on('value', (snapshot) => {
        var usr = snapshot.val();
        this.setState({nombre:usr.name});
        this.setState({correo:usr.mail});
        
    });
    this.acutalizaLista();
    }  
    
    
    acutalizaLista()
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
        const { navigate } = this.props.navigation;
        const {editmode} = this.state.editmode;
    //     const chatLists = this.state.friends.map( friend => {
    //   return(
    //           <ChatItem key={friend.key} id={friend.id} name={friend.name} time="2:00" message={friend.state} image={friend.image}
    //           />
    //         )});
      return (
            <SafeAreaView >
                <Text>Nombre: {this.state.nombre}</Text>
                <Text>Correo: {this.state.correo}</Text>
                <ScrollView>
                <FriendModule isEditing={this.state.editmode} nombre={this.state.nombre} firebaseUser={this.props.navigation.getParam('firebaseUser','')}/>
                 </ScrollView>
            </SafeAreaView>
        );
    }  
}

