import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, FlatList, Button, Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
// import { FlatList } from 'react-native-gesture-handler';


export default function Contact() {
  const contacts = useSelector((state)=>state.myContacts)
  const [cons, setCons] = useState([{}])
  useEffect(() => {
    // let async temp = await JSON.parse(myGames)
    // setWord(temp)
    console.log('contacts' ,contacts)
    
  },[contacts])


  return ( 
    // Page 
    <ThemedView style={styles.titleContainer} >
      {/*  Header  */}
    <ThemedView style={{padding:12}} darkColor='#333' lightColor={'#5bb'}>
      <ThemedText type="title">Contacts</ThemedText>
    </ThemedView>
      {/*  Buttons  */}
    <View style={styles.cont}>
      {/* <Button
        title="nothing"
        onPress={() => console.log('hi')}
      /> */}

    {/* https://reactnative.dev/docs/pressable */}
  
    {/* <ThemedView > */}
    <Pressable style={({ pressed }) => [
    { opacity: pressed ? 0.5 : 1.0 }
  ]} onPress={()=> router.navigate('/edit-contact')}>
      <View style={{paddingHorizontal:5, backgroundColor:'green', borderRadius: 5}}>
        <ThemedText>New +</ThemedText>
      </View>
    </Pressable>

    {/* <Pressable style={({ pressed }) => [
    { opacity: pressed ? 0.5 : 1.0 }
  ]} onPress={()=> console.log('h')}>
      <View style={{paddingHorizontal:5, backgroundColor:'green',}}>
        <ThemedText>check</ThemedText>
      </View>
    </Pressable> */}
    </View>  
  
    {/*  List  */}
    <ThemedView style={{padding:16}}>
      <FlatList
        data={contacts}
        renderItem={({item,index})=>{
          return(
            <Pressable 
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1.0 }
            ]} 
            onPress={()=> router.navigate({pathname:'/edit-contact', params: {
              firstName: item.first, 
              lastName: item.last,
              skill: item.skill,
              id: item.id}})
            }>
            <ThemedView darkColor='#666' lightColor='#7bd'>
            <ThemedText key={index} style={{textDecoration:'none'}}>{item.first} {item.last}, {item.skill}</ThemedText>
            </ThemedView>
            </Pressable>
          )
        }}

      />
    </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingTop: 32,
    gap: 16,
    overflow: 'hidden',
  },
  cont: {
    display:'flex',
    flexDirection:'row',
    gap: 10,
    justifyContent:'flex-end',
    marginHorizontal: 15,
  },
  button: {
    backgroundColor:'blue',
    width: "auto",
    // margin: 'auto',
    paddingHorizontal: '.5em',
    border: '2px solid #009',
    borderRadius: '1.5em'
  }
});
