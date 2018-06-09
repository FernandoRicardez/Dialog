import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TextInput,Image,ScrollView,SafeAreaView,Icon } from 'react-native';

import ChatItem from './components/chats'
import Header from './components/header'

export default class ChatList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
       personas:[

       {id:1,nombre:'Maria',edad:20,telefono:'4771729273',gustos:["Agua","Perros","Rojo"],foto:'https://media.istockphoto.com/photos/beautiful-woman-posing-against-dark-background-picture-id638756792?k=6&m=638756792&w=0&h=VzoXQCFui1tibTCHg886_AnoEOp30edbU8AH4LT5fcQ='},
       {id:2,nombre:'Karla',edad:20,telefono:'4771729273',gustos:["Cafe","Gatos","Azul"],foto:'https://orig00.deviantart.net/b893/f/2011/227/f/6/profile_picture_by_aehireiel_stock-d46o5ls.jpg'},
       {id:3,nombre:'Sofia',edad:20,telefono:'4771729273',gustos:["Cerveza","Caballos","Verde"],foto:'http://78.media.tumblr.com/15cbb69b67484df2e0e8976d04b98895/tumblr_nad09wBN9w1tnevs1o1_500.jpg'},
       {id:4,nombre:'Mariana',edad:20,telefono:'4771729273',gustos:["Mezcal","Tortugas","Negro"],foto:'data:image/jpeg;base64,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'}
      
       ],
      indiceActual: 0,
      telefonoActual:'??????'
      

    };

    this.siguiente=this.siguiente.bind(this);
    this.previo = this.previo.bind(this);
    this.adivinar = this.adivinar.bind(this);
 

  
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
       
       {/* <Image source={{uri:this.state.personas[this.state.indiceActual].foto}} style={{width:300,height:200}}/>
       

       <Text>{this.state.personas[this.state.indiceActual].nombre}</Text>  
       <Text>{this.state.telefonoActual}</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 100}}
        onChangeText={(text) => this.adivinar(text)}
        placeHolder="Adivina sus gustos"
        />

      
  
        <Button onPress={this.previo}
        title='prev'/>
        <Button onPress={this.siguiente}
        title='next'/>
        <Button onPress={this.login}
        title='login'/> */}

        <View  >
          <Header/>
        </View>
      
        <ScrollView>
        <ChatItem id="1" name="Fer" time="2:00" message="Socket.io state..." image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/About_icon_%28The_Noun_Project%29.svg/2000px-About_icon_%28The_Noun_Project%29.svg.png"/>
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
