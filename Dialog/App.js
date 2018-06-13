import React from 'react';
import { View, Text,Image,TextInput,Button,ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';


import ChatsScreen from './ChatListScreen'
import RegisterScreen from './RegisterScreen'
import ChatScreen from './ChatScreen'
import LoginScreen from './LoginScreen'
import ProfileSCreen from './ProfileScreen'

import * as firebase from 'firebase';

console.disableYellowBox = true; 


var config = {
  apiKey: "AIzaSyCilEABgS-phAlDsQXa_Yuy8usnHTE68o0",
  authDomain: "htmlproyecto-454b2.firebaseapp.com",
  databaseURL: "https://htmlproyecto-454b2.firebaseio.com",
  projectId: "htmlproyecto-454b2",
  storageBucket: "htmlproyecto-454b2.appspot.com",
  messagingSenderId: "605804403726"
};

firebase.initializeApp(config);



class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: '',
      pass:'',
      isLoggedIn:false,
      firebaseUser:''

    };
    this.login = this.login.bind(this);

  }
  login()
  { 
    
    firebase.auth().signOut();
   
    firebase.auth().signInWithEmailAndPassword(this.state.user, this.state.pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // ...
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({firebaseUser:user.uid})
        // this.setState({isLoggedIn:true})
  
         this.props.navigation.navigate('Chats',{firebaseUser:this.state.firebaseUser,name:"Dialog"});
      }
    
      // Do other things
    });
    

  
  }

  componentWillMount()
  {
  }

  render() {
    if(this.state.isLoggedIn)
    
    return(<ChatsScreen navigation={this.props.navigation} firebaseUser={this.state.firebaseUser}/>)
    else
    return (
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('./images/logo.png')} style={{width: 240, height: 80}}/>
        <Text>Home Screen App.js </Text>
        <TextInput style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(user) => this.setState({user})}
              value={this.state.user}
        />
        <TextInput  style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}} secureTextEntry={true}
              onChangeText={(pass) => this.setState({pass})}
              value={this.state.pass}
        />
        
        <Button title="Sing in FB"
          onPress={()=> this.login()}
        />
        <Button title="Register?"
         onPress={() => this.props.navigation.navigate('Register')}
         />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Register: RegisterScreen,
    LoginScreen:LoginScreen,
    Chats:ChatsScreen,
    Chat:ChatScreen,
    Profile:ProfileSCreen,
    
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

        // onPress={() => this.props.navigation.navigate('Details')}