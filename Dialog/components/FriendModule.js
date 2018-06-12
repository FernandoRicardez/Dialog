import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TextInput,Image,ScrollView,SafeAreaView,Icon } from 'react-native';
import * as firebase from 'firebase';

export default class FriendModule extends React.Component {
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
        this.setState({email:''})
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
       const name = this.props.nombre;
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
            name: usr.name,
            mail:usr.mail
            
          });
          firebase.database().ref('users/'+usr.id+'/friends/'+firebaseUser+'/').set({
            friendId: firebaseUser,
            name: name
            
          });
          
          this.setState({editmode:false});
    });
        
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