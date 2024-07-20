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
import { Modal } from 'react-native-web';
import EditContactModal from '../edit-contact-modal';
// import { FlatList } from 'react-native-gesture-handler';


export default function Contact() {
  const contacts = useSelector((state)=>state.myContacts)
  const [cons, setCons] = useState([{}])
  const [editing, setEditing] = useState('Nancy')
  const [modalVisible, setModalVisible] = useState(false);
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const [skills, setSkills] = useState('')
  const [id, setId] = useState('')
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

  useEffect(() => {
    
  },[contacts])


  return ( 
    // Page 
    <ThemedView style={styles.titleContainer} >
      {/*  Header  */}
    <ThemedView style={{padding:12}} darkColor='#333' lightColor={'#5bb'}>
      <ThemedText type="title">Contacts</ThemedText>

      <Overlay>
        <EditContactModal firstName={first} lastName={second} skill={skills} id={id} setVis={setModalVisible} />
      </Overlay>


    </ThemedView>
      {/*  Buttons Container  */}
    <View style={styles.cont}>
      {/* Show Modal Button */}
    <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1.0 }
        ]}
        onPress={() => setModalVisible(true)}>
        <View style={{padding:8, backgroundColor:'#14b', borderRadius: 12}}>
        <ThemedText style={{color:'white', fontSize:22}}>Show Modal</ThemedText>
      </View>
      </Pressable>

    {/* https://reactnative.dev/docs/pressable */}
  
    {/* New Contact Button */}
    <Pressable style={({ pressed }) => [
    { opacity: pressed ? 0.5 : 1.0 }
  ]} onPress={()=> router.navigate('/add-contact')}>
      <View style={{padding:8, backgroundColor:'green', borderRadius: 12}}>
        <ThemedText style={{color:'white', fontSize:22}}>New +</ThemedText>
      </View>
    </Pressable>
    </View>  
  
    {/*  List of Contacts */}
    <ThemedView style={{paddingHorizontal:18}}>
      <FlatList
        data={contacts}
        renderItem={({item,index})=>{
          return(
            <Pressable 
            style={[{margin:9},({ pressed }) => [
              { opacity: pressed ? 0.5 : 1.0 }
            ]]} 
            onPress={()=> (
              setFirst(item.first), 
              setSecond(item.last),
              setSkills(item.skill),
              setId(item.id),
              setModalVisible(!modalVisible)
            )
            }>
            <ThemedView style={{marginVertical:2, padding:5,borderRadius:8}} darkColor='#666' lightColor='#7bd'>
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
});
