import React from 'react';
import {
   View,
   ListView,
   Image,
   Text,
   TouchableOpacity,
   StyleSheet,
 } from 'react-native';

 const MessageSent = props => (

   <View style={{ flexDirection:'row', alignSelf:'flex-end', alignItems:'flex-end', margin:5 }}>
      <View style={{ width:220, borderRadius:10, backgroundColor:'#00D', padding:10 }}>
        <Text style={{ fontSize:15, color:'#fff', fontWeight:'600' }}>{props.message}
        </Text>
    </View>
  </View>
);
  
export default MessageSent;
 