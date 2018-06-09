import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TextInput,Image,ScrollView,SafeAreaView,Icon } from 'react-native';

export default class ProfileScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          indiceActual: 0,
          telefonoActual:'??????'
          
    
        };

        //Bindings
    }

    render() {
        const { navigate } = this.props.navigation;
      return (
        <SafeAreaView style={styles.container}>
            <Text>My Profile</Text>
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
  

