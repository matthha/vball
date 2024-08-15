import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADD_CONTACT, ADD_PLAYER, CLEAR_PLAYERS, DECREASE_TEAMS, DELETE_CONTACT, INCREASE_TEAMS, LOAD_CONTACTS, LOAD_DATA, REMOVE_PLAYER, RESET_TEAMS, UPDATE_CONTACT } from "../../Reducer";

// ** Action.js is where we do the Async stuff.
// ** Then we use the data to dispatch what we
// ** want the new state object to be in Reducer.js


const storeData = async (value, keyName) => {
  try {
    // console.log('value is', value)
    const jsonValue = JSON.stringify(value);
    // console.log('json string is', jsonValue)
    await AsyncStorage.setItem(keyName, jsonValue);
  } catch (e) {
    // saving error
    // console.log(e)
    // console.log('failed setting data')
  }
};

const loadData = async () => {
  // Use initData to load the data with [0] being for myContacts and [1] being for teams.
  let initData = [[
    {first: 'Sarah', last: 'Mosz', skill: '4', id:'0'},
  ],[[]]]
  // console.log('in Load Data')
  try {
    // console.log('LD`s try')
    const value = await AsyncStorage.getItem('contacts');
    // console.log(value)
    if (value !== null) {
      // value previously stored
      newer = JSON.parse(value)
      // console.log('storage value is',value)
      // return 
      initData[0]=newer
    } else {
      // console.log('value was null')
      AsyncStorage.setItem('contacts', JSON.stringify(initData[0]))
      
    }
  } catch (e) {
    // error reading value
    // console.log('running the set')
    await storeData(initData[0], 'contacts')
  }
  // For loading the teams
  try {
    const value = await AsyncStorage.getItem('teams');
    if (value !== null) {
      newer = JSON.parse(value)
      initData[1]=newer
    } else {
      AsyncStorage.setItem('teams', JSON.stringify(initData[1]))
      
    }
  } catch (e) {
    await storeData(initData[1], 'teams')
  }
  console.log('initData is',initData)
  return initData
};



const gettingData = () => {
  return async (dispatch) => {
    let mycons = await loadData();
    // console.log('data is', mycons)
    // console.log('function', loadData())
    dispatch({type: LOAD_DATA, payload: {data: mycons}});
  }
}


// const loadContacts = () => {
//    return async (dispatch) => {
//       if (localStorage.myContacts) {
//          dispatch({
//             type: LOAD_CONTACTS,
//             payload: {
//               newGames: localStorage.myContacts
//             }
//           });
//       } else {
         
//       }

//    }
// }

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
const deleteContact = (contact) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: {
        contact: contact
      }
    })
  } 
}
const addContact = (contact) => {
  return (dispatch) => {
    dispatch({
      type: ADD_CONTACT,
      payload: {
        contact: contact
      }
    })
  } 
}

const addPlayer = (id, team) => {
  return (dispatch) => {
    dispatch({
      type: ADD_PLAYER,
      payload: {
        theId: id,
        theTeam: team
      }
    })
  } 
}
const removePlayer = (id) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_PLAYER,
      payload: {
        theId: id
      }
    })
  }
}
const clearPlayers = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_PLAYERS
    })
  }
}

const increaseTeams = () => {
  return (dispatch) => {
    dispatch({
      type: INCREASE_TEAMS
    })
  }
}
const decreaseTeams = () => {
  return (dispatch) => {
    dispatch({
      type: DECREASE_TEAMS
    })
  }
}
const resetTeams = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_TEAMS
    })
  }
}
export { updateContact, gettingData, addContact, deleteContact, addPlayer, removePlayer, clearPlayers, increaseTeams, decreaseTeams, resetTeams }