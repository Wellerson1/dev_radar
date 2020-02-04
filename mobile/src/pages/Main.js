import React, {useEffect, useState} from 'react';

import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import {MaterialIcons} from '@expo/vector-icons'

import api from '../services/api'

function Main({navigation}){
    //variaveis de estado
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    useEffect(() => {
        //metodo para carregar a posição inicial no mapa
        async function loadInitialPosition() {
          //retorna um objeto com varias informações sobre a permissão do usuário 
          const { granted } = await requestPermissionsAsync();
            //testa se o acesso a localização for aceito
          if(granted){
              //pega apenas a latitude e longitude
              const {coords} = await getCurrentPositionAsync({
                  //para usar via gps
                enableHighAccuracy: true
              });
              console.log(coords)
            
              //atribuindo
              const {latitude, longitude} = coords;

              setCurrentRegion({
                  latitude,
                  longitude,
                  //calculos navais para obter o zoom no mapa
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,

              })
          }
        }
        loadInitialPosition()
    }, []);

    //metodo para atualizar o estado toda vez que o usuario altera o a vizu do mapa
    async function handleRegionChange(region){
        setCurrentRegion(region);
    }
    //metodo para carregar os usuários no mapa
    async function loadDevs(){
        
        //atribuindo a latitude e lingitude capturada
        const {latitude, longitude} = currentRegion;
        //buscando dev no backend
        const response = await api.get('/search', {
            params:{
                latitude,
                longitude,
                techs: 'ReactJS'
            }
        });
        setDevs(response.data.devs);
    }

    if (!currentRegion){
        return null;
    }

    return (
    //exibição do mapa
    <>
    <MapView 
        onRegionChange={handleRegionChange} 
        initialRegion={currentRegion} 
        style={styles.map}>
           {devs.map(dev=>( 
            <Marker coordinate={{latitude: dev.localtion.coordinates[1], 
                longitude: dev.localtion.coordinates[0]}}/>
           ))}
        {/*marcação da localização do usuário no mapa */}
       {devs.map(dev=>( 
       <Marker 
        key={dev._id}
        coordinate={{
           latitude: dev.localtion.coordinates[1], 
           longitude: dev.localtion.coordinates[0]
           }}>
            <Image 
                style={styles.avatar} 
                source={{uri: dev.avatar_url}}/>
        {/*balao com as informações do usuario e navegação para outra page*/}    
        <Callout onPress={()=>{
            navigation.navigate('Profile', {github_username: dev.github_username});
        }}>
            <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
            </View>
        </Callout>
        </Marker>
    ))}</MapView>

    {/*Input para a busca*/} 
    <View style={styles.searchForm}>
        <TextInput 
            style={styles.searchInput} 
            placeholder="Buscar devs por techs..."
            placeholderTextColor="#999" 
            autoCapitalize="words"   
            autoCorrect={false}
        />
    <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
        <MaterialIcons name="my-location" size={20} color="#FFF"/>
    </TouchableOpacity>
    </View>

    </>
    );
}

const styles = StyleSheet.create({
    map:{
        flex: 1
    },
    avatar:{
        width: 54,
        height: 54,
        borderRadius: 8,
        borderWidth:3,
        borderColor: '#FFF'
    },
    callout:{
        width: 260
    },
    devName:{
        fontWeight:'bold',
        fontSize: 16,

    },
    devBio:{
        color: '#666',
        marginTop: 5,
    },
    devTechs:{
        marginTop: 5,
    },
    searchForm:{
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection:'row'
    },

    searchInput:{
        flex: 1,
        height: 47,
        backgroundColor:'#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor:'#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        //sombra no android
        elevation: 2,
    },
    loadButton:{
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems:'center',
        marginLeft: 15
    }
})


export default Main;