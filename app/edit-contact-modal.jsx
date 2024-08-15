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
import { deleteContact, updateContact } from './data/Action.js'
// import { FlatList } from 'react-native-gesture-handler';


export default function EditContactModal(props) {
  // const contacts = useSelector((state)=>state.myContacts)
  // const { navigation, route } = props;
  // const {firstName, lastName, skill, id} = useLocalSearchParams();
  const [cons, setCons] = useState([{}])
  const [first, setFirst] = useState(props.firstName)
  const [second, setSecond] = useState(props.lastName)
  const [skills, setSkill] = useState(props.skill)
  const id = props.id
  const dispatch = useDispatch()
  
  useEffect(() => {
    // let async temp = await JSON.parse(myGames)
    // setWord(temp)
    // console.log('Opened the modal')
  },[])


  return ( 
    <ThemedView style={styles.cont}>
        <View style={styles.bcont}>
        <Pressable onPress={()=> {dispatch(deleteContact({first:first, last:second, skill:skills, id:id}))
          props.setVis(false)}}>
          <View style={{padding:8, backgroundColor:'#d22', borderRadius: 12}}>
            <ThemedText style={{color:'white', fontSize:22}}>DELETE</ThemedText>
          </View>
        </Pressable>
        
        <Pressable onPress={()=> {
          if (Number(skills)!== NaN && Number(skills) > 0 && Number(skills) < 6) {
          dispatch(updateContact({first:first, last:second, skill:skills, id:id}))
          props.setVis(false) }
        }}>
          <View style={{padding:8, backgroundColor:'green', borderRadius: 12}}>
            <ThemedText style={{color:'white', fontSize:22}}>Save</ThemedText>
          </View>
        </Pressable>

        </View>
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
