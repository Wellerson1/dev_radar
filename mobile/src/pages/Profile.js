import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
 
function Profile(){
    return <WebView style={{flex:1}} source={{uri: 'https://www.instagram.com/wellerson_fer/'}}/>
}

export default Profile;