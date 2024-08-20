import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, FlatList, Button, Pressable, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedInput';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView } from 'react-native';
import EditContactModal from '../edit-contact-modal';
import TeamsModal from '../teams-modal';
import TeamsMade from '../teamsMade';
import { addPlayer, removePlayer } from '../data/Action';
import { ChevronRight, XLg } from 'react-bootstrap-icons';

export default function TabTwoScreen() {
  const contacts = useSelector((state: any)=>state.myContacts)
  const madeTeams = useSelector((state)=> state.teams)
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('')
  const [unassigned, setUnassigned] = useState([])
  const [teams, setTeams] = useState([[8]])
  const [switched, setSwitched] = useState(true)


  // Overlay for making teams
  const Overlay = (props: any) => {
    return(
      <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <ThemedView style={styles.centeredView2}>
        <ThemedView style={styles.modalView}>
          {props.children}
        </ThemedView>
      </ThemedView>
    </Modal>
    )
  } 

  useEffect(() => {
    let oldTeams = [];
    madeTeams.map(e=> oldTeams = oldTeams.concat(e));
    setUnassigned(oldTeams)
  },[madeTeams])

  // If item in unassigned, take it out; else, put it in
  const inArray = (theId: string) => {
    let temp = [...unassigned]
    if (unassigned.includes(theId)) {
      // remove it
      temp = unassigned.filter(elem=>elem!==theId);
      dispatch(removePlayer(theId))
    }
    else {
      // add it
      temp.push(theId);
      dispatch(addPlayer(theId, 0))
    }
    // setUnassigned(temp)
  }
  // Sorts by first name and then last name if needed
  let sortCons = contacts.toSorted((a,b)=>{
    let y = a['first'].toLowerCase().trim().localeCompare(b['first'].toLowerCase().trim())
    if (y === 0 ) {
      y = a['last'].toLowerCase().trim().localeCompare(b['last'].toLowerCase().trim())
    }

    return(y)
  })

  // Used in the search bar to find contacts by first name
  // ** TODO, could also make it search last name
  const filtered = sortCons
  .map((item) => item)
  .filter((person) => person.first.toLowerCase().startsWith(search.toLowerCase()))

  if (switched) {
    return (
      <ThemedView style={styles.titleContainer}>
        {/*  Header  */}
      <ThemedView style={{padding:12, flexDirection:'row',justifyContent:'space-between'}} darkColor='#333' lightColor={'#5bb'}>
        <ThemedText type="title">Player Selection</ThemedText>
        {/* Switch Button */}
        <Pressable style={({ pressed }) => [
      { opacity: pressed ? 0.5 : 1.0 }
    ]} onPress={()=> setSwitched(!switched)}>
        <View style={{padding:8, borderRadius: 12, borderColor:"#000",borderWidth:2, display:'flex', flexDirection:'row'}}>
          <ThemedText style={{color:'#000', fontSize:22,lineHeight:20}}>Generate Teams </ThemedText>
          <ChevronRight style={{color:'#000', fontSize:22,}}></ChevronRight>
        </View>
      </Pressable>
        <Overlay>
          <TeamsModal setVis={setModalVisible}/>
        </Overlay>
      </ThemedView>


        {/*  Buttons Container  */}
      <View style={styles.cont}>

        {/* Search Bar */}
        <ThemedView style={styles.inputCont}>
          <ThemedTextInput darkColor={'#000'} style={styles.input} value={search} onChangeText={setSearch}/>
          {/* Clear Search */}
          <Pressable style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1.0 }
            ]} onPress={()=> setSearch('')}>
              <XLg style={{fontSize:26, lineHeight:40, height:40, color:'#808080', padding:"0 5px"}}/>
          </Pressable>
        </ThemedView>
      
    
        {/* Clear Button */}
        <Pressable style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1.0 }
        ]} onPress={()=> setModalVisible(!modalVisible)}>
          <ThemedText style={{color:'#0070E0', fontSize:19, textDecorationLine:'underline'}}>Clear All</ThemedText>
        </Pressable>
      </View>
      {/* --- End of Buttons --- */}
    
      {/*  List of Contacts */}
      <ThemedView style={{paddingHorizontal:18,paddingBottom:15,flex:1}}>
      <ThemedText>Total Players: {unassigned.length}</ThemedText>
      <ThemedView style={{display:'flex',flexDirection:'row',paddingHorizontal:13,gap:5,borderBottomColor:'#000',borderBottomWidth:2}}>
        <ThemedView style={{width:62}}></ThemedView>
        <ThemedText style={{width:'100%'}}>Name</ThemedText>
        <ThemedText style={{width:56}}>Rating</ThemedText>
      </ThemedView>
        <FlatList
          data={filtered}
          ListEmptyComponent={<ThemedView><ThemedText>No contacts yet. Add someone.</ThemedText></ThemedView>}
          renderItem={({item,index})=>{
            return(
              <ThemedView style={{padding:8}}>
              <Pressable
              key={item.id}
              style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1.0 }
              ]}
              onPress={()=> (
                inArray(item.id)
              )
              }>
              <ThemedView style={[{padding:5,borderRadius:8, display:'flex',flexDirection:'row'}, (unassigned.includes(item.id)? {backgroundColor:'#059'}:{})]} darkColor='#666' lightColor='#1cc'>
                <ThemedView style={{width:62, backgroundColor:'transparent'}}><input style={{width:20, height:20, backgroundColor:'transparent'}} type="checkbox" checked={unassigned.includes(item.id)} /></ThemedView>
                <ThemedText style={[{margin:2, width:'100%'},(unassigned.includes(item.id)? {color:'#eee'}:{})]}>{item.first} {item.last}</ThemedText>
                <ThemedText style={[{margin:2, width:56},(unassigned.includes(item.id)? {color:'#eee'}:{})]}>{item.skill}</ThemedText>
              </ThemedView>
              </Pressable>
              </ThemedView>)
          }}
        />
      </ThemedView>
      </ThemedView>
  )} else {
    return (
      <TeamsMade switched={switched} setSwitched={setSwitched} playerCount={unassigned.length}/>
    )
  }
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
    flexDirection:'column',
    gap: 10,
    paddingHorizontal:15,
    width:'100%',
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
   backgroundColor:'rgba(76, 154, 175, 0.3)',
 },
 textStyle: {
  color:'white',
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
    height:250,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputCont:{
    borderWidth: 1,
    borderColor: '#000',
    borderStyle:'solid',
    borderRadius: 5,
    backgroundColor:'#fcfcfc',
    height: 44,
    padding: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    backgroundColor:'#fcfcfc',
    height: 40,
    width:'100%',
    marginHorizontal: 12,
    borderWidth: 0,
    borderRadius:1,
    padding: 10,
  },
  
});