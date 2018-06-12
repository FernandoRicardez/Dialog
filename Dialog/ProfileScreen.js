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
            var mail = childData.mail;
            name = childData.name;
            var friend = {};
            firebase.database().ref('users/'+name).on('value', (snapshot) => {
              var  usr= snapshot.val();
              
              
            });
            //console.log(key);
            // childData will be the actual contents of the child
            friend = {
              name: name,
              id: key,
              key: key,
              mail:mail
            };
        friends.push(friend);
          });
          this.setState({friends:friends});  
      });
      
    }
      
    render() {
        const { navigate } = this.props.navigation;
        const {editmode} = this.state.editmode;
        const chatLists = this.state.friends.map( friend => {
      return(
              <ChatItem key={friend.key} id={friend.id} name={friend.name}  message={friend.mail}
              />
            )});
      return (
            <SafeAreaView >
                <Text>Nombre: {this.state.nombre}</Text>
                <Text>Correo: {this.state.correo}</Text>
                <ScrollView>
                <FriendModule isEditing={this.state.editmode} nombre={this.state.nombre} mail={this.state.correo} firebaseUser={this.props.navigation.getParam('firebaseUser','')}/>
                 {chatLists}
                 
                 </ScrollView>
            </SafeAreaView>
        );
    }  
}

