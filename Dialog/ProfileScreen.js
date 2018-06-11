import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TextInput,Image,ScrollView,SafeAreaView,Icon } from 'react-native';
import * as firebase from 'firebase';

import ChatItem from './components/chats';

class FriendModule extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          nombre:'',
          email:'',
          editmode:false,
          firebaseUser:'',
          friendFirebaseUser:'',
     
          
    
        };

        //Bindings
        this.showForm = this.showForm.bind(this);
        this.validarCorreo = this.validarCorreo.bind(this);

    }

    componentWillMount()
    {
        this.setState({firebaseUser:this.props.firebaseUser});
        this.setState({nombre:this.props.nombre});
        
    }
    showForm()
    {
        this.setState({editmode:true});
    }   
    validarCorreo()
    {
        return true;
    }
    addFriend()
    {
        if(this.state.email=='')
        {
            alert('Ingrese un correo');
            return;
        }
        var correoValidado = this.validarCorreo()
        if(!correoValidado)
        {
            alert('validarCorreo');
            return;
        }
        
       const firebaseUser = this.state.firebaseUser;
       const name = this.state.nombre;
        const friendMail = this.state.email;
        var db = firebase.database();
        var usersRef = db.ref("users");
        var usr;
       usersRef.orderByChild("mail").equalTo(friendMail).limitToFirst(1).on('value', (snapshot) => {
       snapshot.forEach(function (childSnapshot){
       usr = childSnapshot.val()
         }); 
         if(usr == undefined)
         {
             alert('Usuario no encontrado comprueba que el correo sea correcto.');
             return;
         }
         this.setState({nombre:usr.name});
        this.setState({correo:usr});
         
         firebase.database().ref('users/'+firebaseUser+'/friends/'+usr.id+'/').set({
            friendId: usr.id,
            name: usr.name
            
          });
          firebase.database().ref('users/'+usr.id+'/friends'+firebaseUser+'/').set({
            friendId: firebaseUser,
            name: name
            
          });
          
    });
       // this.setState({editmode:false});
    }
    
    render ()  {
  if(!this.state.editmode)
    return  <Button
    title="Agregar amigo"
    onPress={()=> this.showForm()}
    />;
  else
    return  (
        <View>
    <Text>Agrega un amigo con su correo electronico {this.state.nombre} </Text>
    <TextInput style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(email) => this.setState({email})}
              value={this.state.mail}
            />
     <Button
    title="Buscar"
    onPress={()=> this.addFriend()}
    />
    </View>
    );
}   
    
}
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

