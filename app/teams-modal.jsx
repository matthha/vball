import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, FlatList, TextInput, Button, Pressable, View } from 'react-native';
import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ThemedTextInput } from '@/components/ThemedInput';
import { clearPlayers, deleteContact, updateContact } from './data/Action.js'
// import { FlatList } from 'react-native-gesture-handler';


export default function TeamsModal(props) {
  // const contacts = useSelector((state)=>state.myContacts)
  // const { navigation, route } = props;
  // const {firstName, lastName, skill, id} = useLocalSearchParams();
  const [amountTeams, setAmountTeams] = useState('');
  const [amountPlayers, setAmountPlayers] = useState('');
  const [cons, setCons] = useState([{}])
  const dispatch = useDispatch()
  
  useEffect(() => {
    // let async temp = await JSON.parse(myGames)
    // setWord(temp)
    // console.log('Opened the modal')
  },[])


  return ( 
    <ThemedView style={styles.cont}>
        <View style={styles.bcont}>
        
        
        {/* <Pressable onPress={()=> {
          dispatch(updateContact({}))
          props.setVis(false) 
        }}>
          <View style={{padding:8, backgroundColor:'green', borderRadius: 12}}>
            <ThemedText style={{color:'white', fontSize:22}}>Save</ThemedText>
          </View>
        </Pressable> */}

        </View>
    <ThemedView>
    <Pressable onPress={()=> {
      dispatch(clearPlayers())
      props.setVis(false)}
      }>
      <View style={{padding:8, backgroundColor:'#d22', borderRadius: 12}}>
        <ThemedText style={{color:'white', fontSize:22, textAlign:'center'}}>
          CLEAR ALL
        </ThemedText>
      </View>
    </Pressable>
      <ThemedText>Are you sure you want to clear all players?</ThemedText>
      {/* <ThemedText>You have xx players</ThemedText>
         <ThemedText>How many teams do you want?</ThemedText>
         <ThemedTextInput darkColor={'#998'} style={styles.input} value={amountTeams} onChangeText={setAmountTeams}></ThemedTextInput>
      <ThemedText>How players do you want on a team</ThemedText>
      <ThemedTextInput darkColor={'#998'} style={styles.input} value={amountPlayers} onChangeText={setAmountPlayers}></ThemedTextInput> */}
    </ThemedView>
   </ThemedView>
  );
}

const styles = StyleSheet.create({
    titleContainer: {
      flex: 1,
      paddingTop: 32,
      gap: 16,
      // overflow: 'hidden',
    },
    cont: {
      display:'flex',
      flex:1,
      flexDirection:'column',
      gap: 18,
      justifyContent:'flex-end',
      // marginHorizontal: 15,
      // borderWidth: .5,
      // borderColor:'red'
    },
    bcont: {
      display:'flex',
      flexDirection:'row',
      gap: 18,
      justifyContent:'space-between',
      marginHorizontal: 15,
    },
    input: {
      height: 40,
      marginHorizontal: 12,
      borderWidth: .5,
      borderRadius:1,
      padding: 10,
    },
    desc: {
      marginTop: 10,
      paddingLeft: 10,
      flex:0,
    },
    button: {
      // alignSelf:'c'
      // backgroundColor:'blue',
      // width: 'auto',
      // paddingHorizontal: .5,
      // borderRadius: 1.5,
      // padding:2,
      // margin:2,
    }
});
