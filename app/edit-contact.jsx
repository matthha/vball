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
import { updateContact } from './data/Action.js'
// import { FlatList } from 'react-native-gesture-handler';


export default function EditContact() {
  // const contacts = useSelector((state)=>state.myContacts)
  // const { navigation, route } = props;
  const {firstName, lastName, skill, id} = useLocalSearchParams();
  const [cons, setCons] = useState([{}])
  const [first, setFirst] = useState(firstName)
  const [second, setSecond] = useState(lastName)
  const [skills, setSkill] = useState(skill)
  const dispatch = useDispatch()
  
  useEffect(() => {
    // let async temp = await JSON.parse(myGames)
    // setWord(temp)
    console.log('There are other screens?', router.state)
    console.log('person is', firstName)
    console.log(router)
  },[])


  return ( 
       // Page 
    <ThemedView style={styles.titleContainer} >
      {/*  Header  */}
    <ThemedView style={{padding:12}} darkColor='#333' lightColor={'#5bb'}>
      <ThemedText type="title">Edit Contact</ThemedText>
    </ThemedView>

      {/*  Button Row  */}
    <View style={styles.cont}>
    <Pressable onPress={()=> router.back()}>
      <View style={{paddingHorizontal:5, backgroundColor:'gray',}}>
        <ThemedText userSelect='none'>Back</ThemedText>
      </View>
    </Pressable>
    <Pressable onPress={()=> {
      dispatch(updateContact({first:first, last:second, skill:skills, id:id}))
      
      router.back()
    }}>
      <View style={{paddingHorizontal:5, backgroundColor:'green',}}>
        <ThemedText>Save</ThemedText>
      </View>
    </Pressable>
      <Button color='#292' title='Save'/>
    </View>

    {/*  Fields  */}
    <ThemedView>
    <ThemedText style={styles.desc}>First Name</ThemedText>
    <ThemedTextInput darkColor={'#998'} style={styles.input} value={first} onChangeText={setFirst}/>
    </ThemedView>
    <ThemedView>
    <ThemedText style={styles.desc}>Last Name</ThemedText>
    <ThemedTextInput darkColor={'#998'} style={styles.input} value={second} onChangeText={setSecond}/>
    </ThemedView>
    <ThemedView>
    <ThemedText style={styles.desc}>Skill Level</ThemedText>
    <ThemedTextInput darkColor={'#998'} inputMode='numeric' style={styles.input} value={skills} onChangeText={setSkill}/>
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
      flexDirection:'row',
      gap: 10,
      justifyContent:'flex-end',
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
