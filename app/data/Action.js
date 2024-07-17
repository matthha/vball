import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOAD_CONTACTS, LOAD_DATA, UPDATE_CONTACT } from "../../Reducer";

// ** Action.js is where we do the Async stuff.
// ** Then we use the data to dispatch what we
// ** want the new state object to be in Reducer.js


const storeData = async (value) => {
  try {
    console.log('value is', value)
    const jsonValue = JSON.stringify(value);
    console.log('json string is', jsonValue)
    await AsyncStorage.setItem('contacts', jsonValue);
  } catch (e) {
    // saving error
    console.log(e)
    console.log('failed setting data')
  }
};

const loadData = async () => {
  const initData = [
    {first: 'Sarah', last: 'Mosz', skill: '4', id:'0'},
  ]
  // console.log('in Load Data')
  try {
    console.log('LD`s try')
    const value = await AsyncStorage.getItem('contacts');
    console.log(value)
    if (value !== null) {
      // value previously stored
      newer = JSON.parse(value)
      console.log('storage value is',value)
      // return 
      return newer
    } else {
      console.log('value was null')
      AsyncStorage.setItem('contacts', JSON.stringify(initData))
      return initData
    }
  } catch (e) {
    // error reading value
    console.log('running the set')
    await storeData(initData)
    return initData
  }
};



const gettingData = () => {
  return async (dispatch) => {
    let mycons = await loadData();
    console.log('data is', mycons)
    // console.log('function', loadData())
    dispatch({type: LOAD_DATA, payload: {data: mycons}});
  }
}



const loadGames = (myUser) => {
   return async (dispatch) => {
     let q = query(collection(db, 'games'), where('players', 'array-contains', `${myUser}`));
     
     let querySnapshot = await getDocs(q)
     // console.log((querySnapshot.docs).length)
     let newGamesList = querySnapshot.docs.map(docSnap => {
       return {
         ...docSnap.data(),
         key: docSnap.id
       }
     })
     dispatch({
       type: LOAD_GAMES,
       payload: {
         newGames: newGamesList
       }
     });
   }
 }

const loadContacts = () => {
   return async (dispatch) => {
      if (localStorage.myContacts) {
         dispatch({
            type: LOAD_CONTACTS,
            payload: {
              newGames: localStorage.myContacts
            }
          });
      } else {
         
      }

   }
}



// const updateContact = (state, contact) => {
//   let {myContacts} = state;
//   let newContacts = myContacts.map(elem=>elem.id===contact.id?contact:elem);
//   return {
//     ...state,
//     myContacts: newContacts
//   };
//  }

const updateContact = (contact) => {



  return (dispatch) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: {
        contact: contact
      }
    })
  } 
}
const updateGame = (game) => {
  return async (dispatch) => {
    setDoc(doc(db, 'games', game.key), game)
    dispatch({
      type: UPDATE_GAME,
      payload: {
        newGame: game
      }
    });    
  }
}

export {loadContacts, updateContact, gettingData}