import React from 'react';
import * as firebase from 'firebase';
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

var titleName;
const { width, height } = Dimensions.get('window');
export default class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'Chat con Anonimo'),
    };
  };

    constructor(props){
        super(props);
        this.state = {
          indiceActual: 0,
          name:'??????',
          messageText:'',
          messagesHeight:height-125,
          chatID:'',
          messages:[]

        };

        //Bindings

    this.submitThis = this.submitThis.bind(this);
    this.getMessages = this.getMessages.bind(this);
    }

    componentWillMount()
    {
      this.getMessages()
    }
    getMessages()
    {

      const firebaseUser = this.props.navigation.getParam('firebaseUser','');
      const friendId = this.props.navigation.getParam('friendId','');
      
          
       var db = firebase.database();
       var chatsRef = db.ref("chats");
       var usr;
      chatsRef.orderByChild(friendId+firebaseUser).equalTo(true).limitToFirst(1).on('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot){
      usr = childSnapshot.key
          if(usr != undefined)
          {
            //TODO: load messsages in array
            childSnapshot.forEach(function(messageFB){
              var msg = messageFB
            })
          }
        }); 
        if(usr == undefined)
        {
            chatsRef.push({
                [friendId+firebaseUser]:true,
                [firebaseUser+friendId]:true,
              });
            return;
        }
        else
        {
          this.setState({chatID:usr})
        }
  
      });  
    }


    submitThis()
    {
      if(this.state.messageText=='')
        return;
      const firebaseUser = this.props.navigation.getParam('firebaseUser','');
      const friendId = this.props.navigation.getParam('friendId','');
      
          
       var db = firebase.database();
       var chatsRef = db.ref("chats");
       var usr;
      chatsRef.orderByChild(friendId+firebaseUser).equalTo(true).limitToFirst(1).on('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot){
      usr = childSnapshot.val()
        }); 
       
      });



          this.setState({messageText:''});
    }

    render() {
        const { navigate } = this.props.navigation;
        const { messageText } = this.state;
  
      
      return (
        <SafeAreaView >
            <ScrollView style={{height:this.state.messagesHeight}}>
            
           <MessageR message="hola"/>
            <MessageS message={this.state.chatID}/>
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