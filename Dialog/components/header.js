import React from 'react';
import {
   View,
   ListView,
   Image,
   Text,
   TouchableOpacity,
   StyleSheet,
 } from 'react-native';


 const Header = props => (
    <View styles ={styles.header}>  
        <View >
        <Text>Dialog</Text>
        <Text>Profile... </Text>
        </View>
    </View>
  );
  
export default Header;
 
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'stretch',
        borderColor: '#f7f7f7',
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: '#000'
      },
    leftHeaderContainer: {
      alignItems: "flex-start",
      flexDirection: "row"
   },
   rightHeaderContainer: {
      alignItems: "flex-end",
      flexDirection: "row"
   }
  
  });