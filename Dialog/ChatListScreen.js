import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TextInput,Image,ScrollView,SafeAreaView,Icon,TouchableOpacity } from 'react-native';

import ChatItem from './components/chats'
import Header from './components/header'


export default class ChatList extends React.Component {

  static navigationOptions = {
    title: 'Home',
  };
  constructor(props){
    super(props);
    this.state = {
       contacts:[

        {id:1, name:"Luis", time:"2:00", message:"Socket.io state...", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"},
        {id:2, name:"Fer", time:"2:00", message:"Socket.io state...", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"},
        {id:3, name:"Maria", time:"2:00", message:"Socket.io state...", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"},
        {id:4, name:"Carlos", time:"2:00", message:"Socket.io state...", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"},
        {id:5, name:"Luis", time:"2:00", message:"Socket.io state...", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"}
       
      ],
      index: 0
      

    };

 

  
  }

  siguiente(){
    
    let i = this.state.indiceActual;
    if (i == this.state.personas.length-1) {i=-1}
    this.setState({indiceActual:i+1})

    this.setState({telefonoActual:'??????'})

  }

  previo()
  {
      let sig = this.state.indiceActual-1;
      if (sig == -1) sig = this.state.personas.length-1;
      this.setState({indiceActual:sig})
      this.setState({telefonoActual:'??????'})
  }

  adivinar(text)
  {
    let a = text;
    for(let i=0; i < this.state.personas[this.state.indiceActual].gustos.length;i++ )
    {
      if(a == this.state.personas[this.state.indiceActual].gustos[i])
      {
        this.setState({telefonoActual:this.state.personas[this.state.indiceActual].telefono})
        break;
      }
      else
      {
        this.setState({telefonoActual:this.state.personas[this.state.indiceActual].gustos[i]});
      }
    }

  }
  login()
  {

  }

  render() {
    //   const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <View  >
          <Header/>
        </View>
      
        <ScrollView>
        <TouchableOpacity
    // onPress={() => {
    //   props.navigator.push({
    //     id: props.id,
    //     name: props.name,
    //     image: props.image,
    //   });
    // }}
    onPress={() => {
       this.props.navigation.navigate('Chat');
      }}
  >
        <ChatItem id="1" name="Fer" time="2:00" message="Socket.io state..." image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"
          on
        />
        </TouchableOpacity>
        <ChatItem id="2" name="Luis" time="2:00" message="Socket.io state..." image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"/>
        <ChatItem id="3" name="Carlos" time="2:00" message="Socket.io state..." image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"/>
        <ChatItem id="4" name="Fer" time="2:00" message="Socket.io state..." image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"/>
        <ChatItem id="5" name="Fer" time="2:00" message="Socket.io state..." image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"/>
        <ChatItem id="6" name="Fer" time="2:00" message="Socket.io state..." image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"/>
        <ChatItem id="7" name="Fer" time="2:00" message="Socket.io state..." image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"/>
        </ScrollView>
        </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }

});

