import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TextInput,Image,ScrollView,SafeAreaView,Icon } from 'react-native';
import * as firebase from 'firebase'
export default class ProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Registrarse',
        };
      };

    constructor(props){
        super(props);
        this.state = {
          email:'',
          pass1:'',
          pass2:'',
          nombre:'',
          ready:true
          
    
        };

        // //Bindings
        // this.register = this.register.bind(this);
    }

    registrarse()
    {
        this.setState({ready:true})
        var name = this.state.nombre;
        var email = this.state.email;
      firebase.auth().signOut();  
      firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass1).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('La contraseña debe contener 6 caracteres');
          return;
        }
        else if (errorCode == 'auth/invalid-email') {
            alert('La dirección de correo debe ser válida');
            return;
        }
        else {
          alert(errorMessage);
          return;
        }
        console.log(error);
      });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
      var newId =user.uid

        firebase.database().ref('users/'+newId).set({
           name: name,
           mail: email,
           id: newId
            
           });
        } else {
            // No user is signed in.
          }
        });
     
    

    }
    render() {
        const { navigate } = this.props.navigation;
      return (

        <SafeAreaView >
            
            <Text>Nombre</Text>
            <TextInput style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(nombre) => {
                this.setState({nombre});
                if(this.state.nombre!='')
                    this.setState({ready:false});
                else
                this.setState({ready:true});
                
                }}
              value={this.state.nombre}
            />
            <Text>Correo</Text>
            <TextInput style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />

            <Text>Contraseña</Text>
            <TextInput  style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}} secureTextEntry={true}
                
                keyboardType="email-address"
                onChangeText={(pass1) => {
                    this.setState({pass1})
                    if(pass1==this.state.pass2 && this.state.nombre != '')
                    {
                        this.setState({ready:false})
                 
                    }
                    else
                    {

                        this.setState({ready:true})
                    }
                    
                
                }
            }
                value={this.state.pass1}
            />

            <Text>Confirmar Contraseña</Text>
            <TextInput  style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}} secureTextEntry={true}
                onChangeText={(pass2) =>  {  
                    this.setState({pass2});
                  
                    if(this.state.pass1==pass2 && this.state.nombre !='')
                    {
                        this.setState({ready:false})
                    }
                    else
                    {

                        this.setState({ready:true})
                    }
                }
            }
                value={this.state.pass2}
            />
            <Button
            disabled={this.state.ready}
            onPress={()=>{this.registrarse()}}
            title='Registrar'
            />

        </SafeAreaView>
    );
    }  
}

