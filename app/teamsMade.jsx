import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, FlatList, Button, Pressable, View, Modal } from 'react-native';
import { router } from 'expo-router';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedInput';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
export default function TeamsMade(props) {
   const teams = useSelector((state)=>state.teams)
   const contacts = useSelector((state)=>state.myContacts)
   const dispatch = useDispatch()
   const [modalVisible, setModalVisible] = useState(false);
   const arrangedTeams = teams.map((x,y)=>{
      z = x.map((idNum)=> {
         const b = contacts.filter(e=> e.id===idNum )
         return b[0]
      })
      return z
   })
  // Overlay for making teams
  const Overlay = (props) => {
   return(
     <Modal
     animationType="fade"
     transparent={true}
     visible={modalVisible}
     onRequestClose={() => {
       setModalVisible(!modalVisible);
     }}>
     <ThemedView style={styles.centeredView2}>
       <ThemedView style={styles.modalView}>
         {props.children}
         <Pressable
           style={[styles.button]}
           onPress={() => setModalVisible(!modalVisible)}>
           <ThemedText style={styles.textStyle}>Close</ThemedText>
         </Pressable>
       </ThemedView>
     </ThemedView>
   </Modal>
   )
 } 
   return (
      <ThemedView style={{flex:1, flexDirection:'column'}}>
         <ThemedView style={styles.titleContainer} >
      {/*  Header  */}
      <ThemedView style={{padding:12, flexDirection:'row',justifyContent:'space-between'}} darkColor='#333' lightColor={'#5bb'}>
         <ThemedText type="title">Players</ThemedText>
         {/* Switch Button */}
         <Pressable style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1.0 }
            ]} onPress={()=> props.setSwitched(!props.switched)}>
            <ThemedView style={{padding:8, backgroundColor:'#11c', borderRadius: 12}}>
               <ThemedText style={{color:'white', fontSize:22}}>Go to Players</ThemedText>
            </ThemedView>
         </Pressable>
        {/* <Overlay>
          <TeamsModal setVis={setModalVisible}/>
        </Overlay> */}


      </ThemedView>
         <ThemedText>In the Teams Component</ThemedText>
{/* I think the rednerItem below is what's causing the text node Issue. I could make a new function that checks the score first and have it render to see if it fixes the issue. */}
         <FlatList
            data={arrangedTeams}
            renderItem={({item,index})=>{
            if (item.length > 0) { 
               let score = 0
               item.forEach((x)=>{
                  score += Number(x.skill)
               })
               let thisTeam = item.map((x)=>{
                  return (`${x.first +  ' ' + x.last + ' (' + x.skill + '), '}`)
               })
               score/=item.length
            let scoreShort = JSON.stringify(score).slice(0,4)
            return(
            <ThemedView>
               <ThemedText style={styles.teamBox} >Team {index +1} avg-{scoreShort} : {thisTeam}</ThemedText>
            </ThemedView>
               )} else {
                  return(
                     <ThemedView>
                     <ThemedText style={{backgroundColor:'gray', margin:5}}>Team {index +1} : No one yet</ThemedText>
                  </ThemedView>
                  )
               }}}
         />

         </ThemedView>

      </ThemedView>
      
   )
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
     backgroundColor:'#333',
     width: "auto",
     margin: '.5em',
     padding: '.5em',
     border: '5px solid #000',
     borderRadius: '1.5em'
   },
   centeredView: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: 22,
     // backgroundColor:'#499'
   },
   centeredView2: {
    flex: 1,
    gap:18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor:'rgba(76, 175, 80, 0.3)',
  },
  textStyle: {
   color:'white',
  },
  teamBox: {
   // backgroundColor:'#1945a3', 
   margin:5, 
   padding:4, 
   borderRadius:5, 
   border: '5px solid blue'
   // borderColor:'blue', 
   // borderWidth:5
  },
   modalView: {
     margin: 10,
     opacity:10,
     gap:12,
     // backgroundColor: 'white',
     borderRadius: 20,
     padding: 15,
     alignItems: 'center',
     shadowColor: '#999',
     shadowOffset: {
       width: 0,
       height: 2,
     },
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 5,
   },
   input: {
     height: 40,
     marginHorizontal: 12,
     borderWidth: .5,
     borderRadius:1,
     padding: 10,
   },
   
 });