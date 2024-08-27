import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, FlatList, Button, Pressable, View, Modal, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText, ThemedText as TT} from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput as TTInput } from '@/components/ThemedInput';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addPlayer, decreaseTeams, increaseTeams, removePlayer, resetTeams, shuffleTeams } from './data/Action';
import { ThemedChevron } from '@/components/ThemedChevron';

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

   const shuffle = (q) => {
      function shuffler(array) {
         let currentIndex = array.length;
       
         // While there remain elements to shuffle...
         while (currentIndex != 0) {
       
           // Pick a remaining element...
           let randomIndex = Math.floor(Math.random() * currentIndex);
           currentIndex--;
       
           // And swap it with the current element.
           [array[currentIndex], array[randomIndex]] = [
             array[randomIndex], array[currentIndex]];
         }
       }

      // sort arrangedTeams
      let tempTeams = arrangedTeams.flat()

      // make skilled teams
      let skillTeams = [[],[],[],[],[]]

      // map through teams and push to skilled teams
      tempTeams.map((player) => {
         // first, last, skill, id
         skillTeams[Number(player.skill)-1].push(player.id)
      })

      // teams.map(  (x,index) => {}   )

      // randomize skilled teams
      for (let p=0; p < skillTeams.length; p++) {
         shuffler(skillTeams[p])
      }

      // slice through the top x (arrangedTeams.length-1) (how many teams we have 10teams= grab top 10)
      
      // initialize final home for our players in their teams
      let finalTeams = []
      arrangedTeams.map((x,i)=>{
         if (i!==0) {
            finalTeams.push([])
         }
      })
      skillTeams=skillTeams.flat()

      // Starting the slicing loop
      for (let i=0; i < (Math.floor(props.playerCount/(arrangedTeams.length-1))); i++) 
      {
         // The above for makes them do however many loops of x players are needed.
         // console.log('player Count is: ',props.playerCount, 'arranged team length is: ', arrangedTeams.length, 'skill Teams flattened length is', skillTeams.length, '; times through slice loop is: ', Math.floor(props.playerCount/(arrangedTeams.length-1)), '; finalTeams length is: ',finalTeams.length)

         let tempPlayers = []
         // switch between conditions everyother time
         if (i%2 === 0) {
      
           let ii = (skillTeams.splice(0, (finalTeams.length)))

            tempPlayers.push(ii)
            // slice the bottom x and Repeat until no more players
            for (let y=0; y < tempPlayers[0].length; y++) {
               finalTeams[y].push(tempPlayers[0][y])
            }
         } else {
            tempPlayers.push(skillTeams.splice(skillTeams.length-finalTeams.length, finalTeams.length))
            let reversed = []
            for (let y=tempPlayers[0].length-1; y >=0 ; y--) {
               reversed.push(tempPlayers[0][y])
            }
            for (let y=0; y < tempPlayers[0].length; y++) {
               finalTeams[y].push(reversed[y])
            }
            

         }
         // map through the splice and push to the teams




      }
      finalTeams.unshift([...skillTeams])
      return(finalTeams)
   }


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
            <ThemedView style={{flexDirection:'row', alignItems:'center'}}>
            <Pressable
               style={[styles.button1]}
               onPress={() => {theTeam === 0 ? setTheTeam(teams.length-1):setTheTeam(theTeam-1)}}>
               <TT style={styles.textStyle}><Ionicons name='arrow-back' size={24}/></TT>
            </Pressable>
            <TT>Team {theTeam}</TT>
            <Pressable
               style={[styles.button1]}
               onPress={() => {theTeam === teams.length-1 ? setTheTeam(0):setTheTeam(theTeam+1)}}>
               <TT style={styles.textStyle}><Ionicons name='arrow-forward' size={24}/></TT>
            </Pressable>
            </ThemedView>
            {/* <ThemedView style={{flex:1}}> */}
            <ScrollView >
            <FlatList
            data={arrangedTeams[theTeam]}
            ListEmptyComponent={<ThemedView><ThemedText>No one here.</ThemedText></ThemedView>}
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
               <ThemedView key={index}><Pressable
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
            <ThemedView style={{padding:8, borderRadius: 12, borderColor:"#000",borderWidth:2, display:'flex', flexDirection:'row'}}>
          <ThemedText style={{fontSize:22, lineHeight:20}} darkColor='white'>Select Players </ThemedText>
          {/* <ChevronRight style={{fontSize:22,}}></ChevronRight> */}
          {/* Made this Themed component, but couldn't figure out how to make it accept the style that's being written here so put it into the component. */}
          <ThemedChevron style={{fontSize:22,}}></ThemedChevron>
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
         ]} onPress={()=> dispatch(shuffleTeams(shuffle()))}>
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