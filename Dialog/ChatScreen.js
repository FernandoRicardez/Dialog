import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    ListView,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Image,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    ImageBackground
  } 
  from 'react-native';
  import MessageR from './components/messageRecieved'  
  import MessageS from './components/messageSent'  

const { width, height } = Dimensions.get('window');
export default class ChatScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          indiceActual: 0,
          telefonoActual:'??????',
          messageText:'',
          messagesHeight:height-125
            
        };

        //Bindings
    }

    render() {
        const { navigate } = this.props.navigation;
        const { messageText } = this.state;
      return (
        <SafeAreaView >
            <ScrollView style={{height:this.state.messagesHeight}}>
            
           <MessageR message="hola"/>
            <MessageS message="ab"/>
            </ScrollView>

            <View style={{ alignSelf:'flex-end', padding:10, height:60, width:width, borderTopWidth:1, borderColor:'#f3f3f3', backgroundColor:'#fff' }}>
          <TextInput
            style={{ flex:1, }}
            value={messageText}
            onChangeText={(messageText) => this.setState({ messageText })}
            onSubmitEditing={() => this.submitThis()}
            onFocus={() => this.setState({messagesHeight:300})}
            onBlur={() => this.setState({messagesHeight:height-125})}
            
            placeholder="Enter Your message here"
          />
        </View>
        </SafeAreaView>
    );
    }  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:null,
      height:null,
      justifyContent:'space-between',
      backgroundColor: '#fff',
    }
     
   
  });