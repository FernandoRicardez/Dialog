import React from 'react';
import { View, Text,Image,TextInput,Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';


import ChatsScreen from './ChatListScreen'
import RegisterScreen from './RegisterScreen'
import ChatScreen from './ChatScreen'
import LoginScreen from './LoginScreen'

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: '',
      pass:'',
      isLoggedIn:false

    };
    this.login = this.login.bind(this);

  }
  login()
  {

  }

  render() {
    if(this.state.isLoggedIn)
    return(<ChatsScreen navigation={this.props.navigation}/>)
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
          onPress={()=> this.setState({isLoggedIn:true})}
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
    Chat:ChatScreen
    
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