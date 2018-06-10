import React from 'react';
import {
   View,
   ListView,
   Image,
   Text,
   TouchableOpacity,
   StyleSheet,
 } from 'react-native';


 const MessageRecivied = props => (

  <View style={{ flexDirection:'row', alignItems:'flex-end', margin:5 }}>
      <View style={{ width:220, borderRadius:10, backgroundColor:'#f4f4f4', padding:10 }}>
        <Text style={{ fontSize:15, color:'#555', fontWeight:'600' }}>{props.message}
        </Text>
      </View>
</View>
  );
  
export default MessageRecivied;
 