import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, FlatList, Button, Pressable, View, Modal, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText as TT} from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput as TTInput } from '@/components/ThemedInput';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addPlayer, decreaseTeams, increaseTeams, removePlayer, resetTeams } from './data/Action';

export default function TeamsMade(props) {

   const teams = useSelector((state)=>state.teams)
   const contacts = useSelector((state)=>state.myContacts)
   const dispatch = useDispatch()
   const [teamModalVisible, setTeamModalVisible] = useState(false);
   const [moveVisible, setMoveVisible] = useState(false);
   const [teamSizeVisible, setTeamSizeVisible] = useState(false);
   const [resetVisible, setResetVisible] = useState(false);
   const [theTeam, setTheTeam] = useState(0);
   const [thePlayer, setThePlayer] = useState(0);


   const arrangedTeams = teams.map((x,y)=>{
      z = x.map((idNum)=> {
         const b = contacts.filter(e=> e.id===idNum )
         return b[0]
      })
      return z
   })
   // console.log('teams are', arrangedTeams)
   // Overlay for making teams



   const CalculateAverage = (team) => {
      let score = 0
      team.forEach((x)=>{
         score += Number(x.skill)
      })
      score/=team.length
      let scoreShort = JSON.stringify(score).slice(0,4)
      return scoreShort
   }
   const CheckValidTeam = (x) => {
      if (Number(x)>= 0 && Number(x) <= arrangedTeams.length-1) {
         return true
      } else {
         return false
      }
   }

   const OverlayTeamSize = () => {
      return(
            <Modal
            animationType="none"
            transparent={true}
            visible={teamSizeVisible}
            onRequestClose={() => {
               setTeamModalVisible(!teamSizeVisible);
            }}>
            
            <ThemedView style={styles.centeredView2}>
               <ThemedView style={styles.modalView}>
                  <TT type='defaultSemiBold'>You have {props.playerCount} players total.</TT>
                  <TT>4/team ≈ {Math.floor(props.playerCount/4)} teams
                     <TT type='subdued'>   {props.playerCount%4} extra</TT>
                  </TT>
                  <TT>6/team ≈ {Math.floor(props.playerCount/6)} teams<TT type='subdued'>   {props.playerCount%6} extra</TT></TT>
                  <TT>8/team ≈ {Math.floor(props.playerCount/8)} teams<TT type='subdued'>   {props.playerCount%8} extra</TT></TT>
                  <TT>How many teams do you want?</TT>

                  {/* Buttons to Change Team Size */}

                  <ThemedView style={{flexDirection:'row', alignItems:'center' }}>
                  <Pressable
                  style={[styles.button1]}
                  onPress={() => {teams.length > 1 ? dispatch(decreaseTeams()):[]}}>
                  <TT style={styles.textStyle}><Ionicons name='arrow-down' size={24}/></TT>
                  </Pressable>

                  <TT>{teams.length-1} teams</TT>

                  <Pressable
                  style={[styles.button1]}
                  onPress={() => dispatch(increaseTeams())}>
                  <TT style={styles.textStyle}><Ionicons name='arrow-up' size={24}/></TT>
                  </Pressable>
                  </ThemedView>
                  <TT type='subdued'>Makes {Math.floor(props.playerCount/(teams.length-1))} per team + ({props.playerCount%(teams.length-1)} extra)</TT>
                  {/* Close Button */}
                  <Pressable
                  style={[styles.button]}
                  onPress={() => setTeamSizeVisible(!teamSizeVisible)}>
                  <TT style={styles.textStyle}>Close</TT>
                  </Pressable>
               </ThemedView>
            </ThemedView>
            </Modal>
      )
   }
   const OverlayResetTeams = () => {
      return(
            <Modal
            animationType="none"
            transparent={true}
            visible={resetVisible}
            onRequestClose={() => {
               setResetVisible(!resetVisible);
            }}>
            
            <ThemedView style={styles.centeredView2}>
               <ThemedView style={styles.modalView}>
                  <TT>Do you want to unassign all players and start with 0 teams?<TT type='subdued'> To clear players go back to Players screen </TT></TT>
                  <Pressable style={({ pressed }) => [
                     { opacity: pressed ? 0.5 : 1.0 }
                     ]} onPress={()=> {dispatch(resetTeams()); setResetVisible(!resetVisible)}}>
                     <ThemedView style={{padding:8, backgroundColor:'red', borderRadius: 12}}>
                        <TT style={{color:'white', fontSize:22}}>Reset Teams</TT>
                     </ThemedView>
                  </Pressable>  
                  {/* Close Button */}
                  <Pressable
                  style={[styles.button]}
                  onPress={() => setResetVisible(!resetVisible)}>
                  <TT style={styles.textStyle}>Close</TT>
                  </Pressable>
               </ThemedView>
            </ThemedView>
            </Modal>
      )
   }
   const OverlayTeam = (props) => {
      
      return(
      <Modal
      animationType="none"
      transparent={true}
      visible={teamModalVisible}
      onRequestClose={() => {
         setTeamModalVisible(!teamModalVisible);
      }}>
      
      <ThemedView style={styles.centeredView2}>
         
         <ThemedView style={styles.modalView}>
            <TT>Team {theTeam}</TT>
            {/* <ThemedView style={{flex:1}}> */}
            <ScrollView >
            <FlatList
            data={arrangedTeams[theTeam]}
            renderItem={({item,index})=>{
               return (
                  <ThemedView style={[styles.teamBox,{borderColor:'orange'}]}>
                  <Pressable onPress={() => {setThePlayer(index); setMoveVisible(!moveVisible); setTeamModalVisible(!teamModalVisible)}}>
                     <TT>{item?.first} {item?.last} ({item?.skill})</TT>
                  </Pressable>
                  {/* <TTInput></TTInput> */}
                  </ThemedView>
               )
            }}
            />
                  </ScrollView>
            {/* </ThemedView> */}
            <Pressable
            style={[styles.button]}
            onPress={() => setTeamModalVisible(!teamModalVisible)}>
            <TT style={styles.textStyle}>Close</TT>
            </Pressable>
         </ThemedView>
      </ThemedView>

      </Modal>
      )
   } 
   const OverlayMove = (props) => {
      const [toTeam, setToTeam] = useState('0');

      return(
      <Modal
      animationType='none'
      transparent={true}
      visible={moveVisible}
      onRequestClose={() => {
         setMoveVisible(!moveVisible);
      }}>
      <ThemedView style={styles.centeredView2}>
         <ThemedView style={styles.modalView}>
            <TT>Select a team </TT><TT>to move {arrangedTeams[theTeam][thePlayer]?.first} {arrangedTeams[theTeam][thePlayer]?.last}.</TT>
            {/* <TTInput inputMode='numeric' darkColor={'#998'} style={styles.input} value={toTeam} onChangeText={setToTeam}/>
            {CheckValidTeam(toTeam)? <TT> </TT>:<TT style={{color:'red'}}>Enter a value between 0 and {arrangedTeams.length-1}</TT> }
            <Pressable
            style={[styles.button, {backgroundColor:'green'}]}
            onPress={() => {
               if (CheckValidTeam(toTeam)){dispatch(removePlayer(arrangedTeams[theTeam][thePlayer]?.id)); dispatch(addPlayer(arrangedTeams[theTeam][thePlayer]?.id,toTeam));setThePlayer(0); setMoveVisible(!moveVisible)}}}>
            <TT style={styles.textStyle}>Save</TT>
            </Pressable> */}
            <ThemedView style={{flexDirection:'row',}}>
            {teams.map((x,index) => {
               return(
               <ThemedView><Pressable
               style={[styles.button1, {backgroundColor:'lightblue'}]}
               onPress={() => {
                  dispatch(removePlayer(arrangedTeams[theTeam][thePlayer]?.id)); dispatch(addPlayer(arrangedTeams[theTeam][thePlayer]?.id,index));setThePlayer(0); setMoveVisible(!moveVisible)}}>
                     <TT style={{color:'black'}}>{index}</TT></Pressable></ThemedView>)
            })}
            </ThemedView>

            <Pressable
            style={[styles.button]}
            onPress={() => {setThePlayer(0); setMoveVisible(!moveVisible)}}>
            <TT style={styles.textStyle}>Close</TT>
            </Pressable>
         </ThemedView>
      </ThemedView>
      </Modal>
      )
   } 

   return (
      <ThemedView style={{flex:1, flexDirection:'column'}}>
         {/* Overlays */}
        <OverlayTeam></OverlayTeam>
        <OverlayMove></OverlayMove>
        <OverlayTeamSize></OverlayTeamSize>
        <OverlayResetTeams></OverlayResetTeams>

         <ThemedView style={styles.titleContainer} >
      {/*  Header  */}
      <ThemedView style={{padding:12, flexDirection:'row',justifyContent:'space-between'}} darkColor='#333' lightColor={'#5bb'}>
         <TT type="title">Teams</TT>
         {/* Switch Button */}
         <Pressable style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1.0 }
            ]} onPress={()=> props.setSwitched(!props.switched)}>
            <ThemedView style={{padding:8, backgroundColor:'#11c', borderRadius: 12}}>
               <TT style={{color:'white', fontSize:22}}>Go to Players</TT>
            </ThemedView>
         </Pressable>      
      </ThemedView>
      {/*  Buttons Container  */}
      <ThemedView style={styles.cont}>
      {/* Reset Teams? */}
      <Pressable style={({ pressed }) => [
      { opacity: pressed ? 0.5 : 1.0 }
         ]} onPress={()=> setResetVisible(!resetVisible)}>
        <ThemedView style={{padding:8, backgroundColor:'#950000', borderRadius: 12}}>
          <TT style={{color:'white', fontSize:19}}>RESET Teams?</TT>
        </ThemedView>
      </Pressable>
      {/* Shuffle Button */}
      <Pressable style={({ pressed }) => [
      { opacity: pressed ? 0.5 : 1.0 }
         ]} onPress={()=> []}>
        <ThemedView style={{padding:8, backgroundColor:'#ffca7d', borderRadius: 12}}>
          <TT style={{color:'black', fontSize:19}}>Shuffle</TT>
        </ThemedView>
      </Pressable>
      {/* Team Sizing */}
      <Pressable style={({ pressed }) => [
      { opacity: pressed ? 0.5 : 1.0 }
         ]} onPress={()=> setTeamSizeVisible(!teamSizeVisible)}>
        <ThemedView style={{padding:8, backgroundColor: '#ff91d9', borderRadius: 12}}>
          <TT style={{color:'black', fontSize:19}}>Resize Teams</TT>
        </ThemedView>
      </Pressable>
      </ThemedView>
         {/* Teams */}
      <FlatList
         data={arrangedTeams}
         renderItem={({item,index})=>{
         if (item.length > 0) {
            let thisTeam = item.map((x)=>{
               return (`჻ ${x.first +  ' ' + x.last + ' (' + x.skill + '), '}`)
            })

         return(
         <ThemedView style={{padding:5}}>
            <Pressable onPress={()=>{
               setTheTeam(index)
               setTeamModalVisible(!teamModalVisible); 
               
            }}>
            <TT style={styles.teamBox}>
            <ThemedView>
               <TT><TT type="defaultSemiBold" >{(index===0?'Unassigned':'Team ' + index)}</TT>
               <TT> (<TT type='subdued'>score </TT>{CalculateAverage(item)}), 
               <TT style={{fontFamily:'Gotham'}}> {item.length} players</TT>:</TT></TT>
               <TT>{thisTeam}</TT></ThemedView>
            </TT>
            </Pressable>
         </ThemedView>
            )} else {
               return(
                  <ThemedView>
                  <TT style={{backgroundColor:'gray', margin:5,padding:2}}>
                  {(index===0?'Unassigned':'Team ' + index)} : No one yet</TT>
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
   button1: {
   backgroundColor:'#3333ee',
   width: "auto",
   margin: '.5em',
   padding: '.5em',
   // border: '5px solid #000',
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
   // alignContent: 'flex-end',
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: 12,
   backgroundColor:'rgba(76, 154, 175, 0.3)',
   },
   textStyle: {
      color:'white',
   },
   teamBox: {
      // backgroundColor:'#1945a3', 
      margin:5, 
      padding:4, 
      borderRadius:5, 
      border: '5px solid #059'
      // borderColor:'blue', 
      // borderWidth:5
   },
   modalView: {
      // flex:.8,
      // flexWrap:'nowrap',
      // flexDirection:'column',
      // justifyContent:'flex-start',
      margin: 10,
      opacity:10,
      gap:12,
      // backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
      justifyContent:'center',
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
      height: 50,
      // marginHorizontal: 12,
      borderWidth: .5,
      borderRadius:1,
      padding: 10,
   },

 });