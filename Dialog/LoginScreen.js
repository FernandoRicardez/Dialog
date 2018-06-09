import React from 'react';
import { View, Text,Image,TextInput,Button } from 'react-native';



export default class LoginScreen extends React.Component {
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
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('./images/logo.png')} style={{width: 240, height: 80}}/>
        <Text>Login LoginScreen </Text>
        <TextInput style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(user) => this.setState({user})}
              value={this.state.user}
        />
        <TextInput  style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}} secureTextEntry={true}
              onChangeText={(pass) => this.setState({pass})}
              value={this.state.pass}
        />
        
        <Button title="Sing in"
         onPress={() => this.props.navigation.navigate('Chats')}
        />
        <Button title="Register?"
         onPress={() => this.props.navigation.navigate('Register')}
         />
      </View>
    );
  }
}