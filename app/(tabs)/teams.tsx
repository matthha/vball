import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, FlatList, Button, Pressable, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedInput';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Modal, ScrollView } from 'react-native';
import EditContactModal from '../edit-contact-modal';
import TeamsModal from '../teams-modal';
import TeamsMade from '../teamsMade';
import { addPlayer, removePlayer } from '../data/Action';

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
        <View style={{padding:8, backgroundColor:'#11c', borderRadius: 12}}>
          <ThemedText style={{color:'white', fontSize:22}}>Go to Teams</ThemedText>
        </View>
      </Pressable>
        <Overlay>
          <TeamsModal setVis={setModalVisible}/>
        </Overlay>
      </ThemedView>
        {/*  Buttons Container  */}
      <View style={styles.cont}>
      {/* Search Bar */}
      <View style={{flex:1, flexDirection:'row',flexWrap:'wrap',}}>
      <ThemedTextInput darkColor={'#000'} style={styles.input} value={search} onChangeText={setSearch}/>
      {/* Clear Button */}
      <Pressable style={({ pressed }) => [
      { opacity: pressed ? 0.5 : 1.0 }
    ]} onPress={()=> setSearch('')}>
        <View style={{padding:8,marginRight:22, backgroundColor:'gray', borderRadius: 12}}>
          <ThemedText style={{color:'black', fontSize:22}}>X</ThemedText>
        </View>
      </Pressable>
      
    
      {/* Clear Button */}
      <Pressable style={({ pressed }) => [
      { opacity: pressed ? 0.5 : 1.0 }
    ]} onPress={()=> setModalVisible(!modalVisible)}>
        <ThemedView style={{padding:8, backgroundColor:'#950000', borderRadius: 12,alignItems:'center'}}>
          <ThemedText style={{color:'white', fontSize:19}}>CLEAR</ThemedText><ThemedText style={{color:'white', fontSize:19}}>Players?</ThemedText>
        </ThemedView>
      </Pressable>
      </View>
      </View>  
      {/* --- End of Buttons --- */}
    
      {/*  List of Contacts */}
      <ThemedView style={{paddingHorizontal:18,paddingBottom:15,flex:1}}>
      <ThemedText>Total Players: {unassigned.length}</ThemedText>
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
              <ThemedView style={[{padding:5,borderRadius:8}, (unassigned.includes(item.id)? {backgroundColor:'#059'}:{})]} darkColor='#666' lightColor='#1cc'>
              <ThemedText style={[{margin:2},(unassigned.includes(item.id)? {color:'#eee'}:{})]}>{item.first} {item.last}, {item.skill}</ThemedText>
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
    // flex:1,
    flexDirection:'row',
    gap: 10,
    // justifyContent:'flex-end',
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    backgroundColor:'#cef',
    height: 40,
    marginHorizontal: 12,
    borderWidth: .5,
    borderRadius:1,
    padding: 10,
  },
  
});