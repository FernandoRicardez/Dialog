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
    ImageBackground,
    KeyboardAvoidingView
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
          messagesHeight:height-100,
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
       var msgArray;
      chatsRef.orderByChild(friendId+firebaseUser).equalTo(true).limitToFirst(1).on('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot){
      usr = childSnapshot.key;
      msgArray = [];
          if(usr != undefined)
          {
            //TODO: load messsages in array ;D
            childSnapshot.child('messages').forEach(function(messageFB){
              var msg = messageFB.val();
              
              var msgTxt = msg.text;
              var sender = msg.sender
              var message = {
                sender:sender,
                text:msg.text,
                key:messageFB.key
              }
              msgArray.push(message)
            });
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
          this.setState({messages:msgArray});
        }
  
      });  
    }


    submitThis()
    {
      const friendId = this.props.navigation.getParam('friendId','');
      var friendMail = this.props.navigation.getParam('friendMail',''); 
      var friendName = this.props.navigation.getParam('friendName',''); 
      var myMail = this.props.navigation.getParam('myMail',''); 
      var myName = this.props.navigation.getParam('myName',''); 

      
      if(this.state.messageText=='')
        return;
      const firebaseChat = this.state.chatID;
       var firebaseUser = this.props.navigation.getParam('firebaseUser',''); 
       var db = firebase.database();
       var chatsRef = db.ref("chats");
       var text = this.state.messageText;
       var usr;

      // firebase.database().ref('users/'+firebaseUser+'/friends/'+friendId).set({
      //   lastMessage: text,
      //   name:friendName,
      //   friendId:friendId,
      //   mail:friendMail

      // });

      // firebase.database().ref('users/'+friendId+'/friends/'+firebaseUser).set({
      //   lastMessage: text,
      //   name:myName,
      //   friendId:firebaseUser,
      //   mail:myMail
      // });

       firebase.database().ref('chats/'+firebaseChat+'/messages/').push({
        sender: firebaseUser,
        text: text
        
      });


          this.setState({messageText:''});
    }

    render() {
        const { navigate } = this.props.navigation;
        const { messageText } = this.state;
        var firebaseUser = this.props.navigation.getParam('firebaseUser',''); 
       
        const messagesList = this.state.messages.map( message => {
          if(message.sender == firebaseUser)
          return(
            
            <MessageS key={message.key} message={message.text}/>
          )
          else
          return(
            
            <MessageR key={message.key} message={message.text}/>
          )
          
      })
      
      return (
        <SafeAreaView  style={{flex:1}}> 
           <KeyboardAvoidingView
              behavior="padding"
              style={{flex:1}}
            >
            <ScrollView 
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{        
                this.scrollView.scrollToEnd({animated: true});
            }}>
            {messagesList}
    

            </ScrollView>
            <View style={{ flexDirection:'flex-end', padding:10, height:60, width:width, borderTopWidth:1, borderColor:'#f3f3f3', backgroundColor:'#fff' }}>
          <TextInput
            style={{ flex:1, width:width }}
            value={messageText}
            onChangeText={(messageText) => this.setState({ messageText })}
            onSubmitEditing={() => this.submitThis()}
            //  onFocus={() => this.setState({messagesHeight:300})}
            // onBlur={() => this.setState({messagesHeight:height-60})}
            
            placeholder="Escribe aqui"
            autoComplete="false"
          />
        </View>
      
        </KeyboardAvoidingView>
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