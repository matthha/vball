import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, FlatList, Button, Pressable, View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { Modal, Text } from 'react-native-web';

export default function Tourny() {
//    return (
//       <ScrollView style={[styles.titleContainer,{backgroundColor:'black'}]}>
//       <ThemedView style={styles.titleContainer}></ThemedView>
//       </ScrollView>
//    )
// }
// const styles = StyleSheet.create({
// titleContainer: {
//    flex: 1,
//    paddingTop: 32,
//    gap: 16,
//    // overflow: 'hidden',
//  },  
//  reactLogo: {
//    height: 178,
//    width: 290,
//    bottom: 0,
//    left: 0,
//    position: 'absolute',
//  },
// })
const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView2}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor:'#499'
  },
  centeredView2: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: 22,
   backgroundColor:'rgba(76, 175, 80, 0.3)',
 },
  modalView: {
    margin: 20,
    opacity:10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});