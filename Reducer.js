import AsyncStorage from "@react-native-async-storage/async-storage";

const UPDATE_CONTACT = 'UPDATE_CONTACT';
const LOAD_DATA = 'LOAD_DATA';
const ADD_CONTACT = 'ADD_CONTACT';
const DELETE_CONTACT = 'DELETE_CONTACT';
const ADD_PLAYER = 'ADD_PLAYER';
const REMOVE_PLAYER = 'REMOVE_PLAYER';
const CLEAR_PLAYERS = 'CLEAR_PLAYERS';
const INCREASE_TEAMS = 'INCREASE_TEAMS';
const DECREASE_TEAMS = 'DECREASE_TEAMS';
const RESET_TEAMS = 'RESET_TEAMS';
const SHUFFLE_TEAMS = 'SHUFFLE_TEAMS';

 const updateContact = (state, contact) => {
  let {myContacts} = state;
  let newContacts = myContacts.map(elem=>elem.id===contact.id?contact:elem);
  AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
  return {
    ...state,
    myContacts: newContacts
  };
 }

 const addPlayer = (state, theId, theTeam) => {
  const {teams} = state;
  let newTeams = [...teams];
  let editedTeam = [...newTeams[theTeam]]
  editedTeam.push(theId)
  newTeams[theTeam]=editedTeam;
  AsyncStorage.setItem('teams', JSON.stringify(newTeams));

  return {
    ...state,
    teams: newTeams
  }
 }

 const removePlayer = (state, theId) => {
  let {teams} = state;
  let editedTeams= []
  // map through the teams and filter through each team to remove player and push each filtered team into editedTeams
  teams.map(team=>{editedTeams.push(team.filter(player=>{return (player!==theId)}))});

  AsyncStorage.setItem('teams', JSON.stringify(editedTeams));
  return {
    ...state,
    teams: editedTeams
  }
 }

 const clearPlayers = (state) => {
  let {teams} = state;
  let newTeams = teams.map(elem=> [])
  AsyncStorage.setItem('teams', JSON.stringify(newTeams))
  return {
    ...state,
    teams: newTeams
  }
 }

 const increaseTeams = (state) => {
  let {teams} = state;
  let newTeams = [...teams];
  newTeams.push([]);
  AsyncStorage.setItem('teams',JSON.stringify(newTeams))
  return {
    ...state, 
    teams: newTeams
  }
 }

 const decreaseTeams = (state) => {
  let {teams} = state;
  let newTeams = [...teams];
  let removed = newTeams.pop();
  newTeams[0] = newTeams[0].concat(removed);
  AsyncStorage.setItem('teams',JSON.stringify(newTeams));
  return {
    ...state, 
    teams: newTeams
  }
 }

 const resetTeams = (state) => {
  let {teams} = state;
  let newTeams = teams.flat();
  AsyncStorage.setItem('teams',JSON.stringify([newTeams]))
  return{
    ...state,
    teams: [newTeams]
  }

 }

 const shuffleTeams = (state) => {

 }

 const deleteContact = (state, contact) => {
  let {myContacts} = state;
  let newContacts = myContacts.filter(elem=>elem.id!==contact.id);
  // AsyncStorage.setItem('contacts')
  AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
  return {
    ...state,
    myContacts: newContacts
  };
 }

 const addContact = (state, newcontact) => {
  let {myContacts, nextKey} = state;
  const conID = {...newcontact, id: nextKey.toString()}
  let newContacts = [...myContacts];
  newContacts.push(conID)
  AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
  let newNextKey = nextKey + 1
  return {
    ...state,
    myContacts: newContacts,
    nextKey: newNextKey
  };
 }

 const initContacts = [
  { first: 'Kyle', last: 'Mosz', skill: '4', id:'0'},
];
const initTeams = [[]]

const loadData = (state, data) => {
  let teams = data[0]
  let num = Number(teams[teams.length-1].id) + 1

  let newContacts = data[0];
  let previousTeams = data[1]
  return {
    ...state,
    myContacts:newContacts,
    nextKey:num,
    teams: previousTeams
  }
};


//  I thought about using a key tracker but our contacts should not ever get out of order from their array. Meaning that the [-1] should be the highest @id and we can just add one to that for new contacts and push them to the array at the end.
 const initLastKey = 0;

 const initialState = {
   myContacts: initContacts,
   nextKey: initLastKey,
   teams: initTeams

 }

 function rootReducer(state=initialState, action) {
   switch (action.type) {
      case UPDATE_CONTACT:
        return updateContact(state, action.payload.contact);
      case DELETE_CONTACT:
        return deleteContact(state, action.payload.contact);
      case ADD_CONTACT:
        return addContact(state, action.payload.contact);
      case ADD_PLAYER:
        return addPlayer(state, action.payload.theId, action.payload.theTeam);
      case REMOVE_PLAYER:
        return removePlayer(state, action.payload.theId);
      case CLEAR_PLAYERS:
        return clearPlayers(state);
      case INCREASE_TEAMS:
        return increaseTeams(state);
      case DECREASE_TEAMS:
        return decreaseTeams(state);
      case RESET_TEAMS:
        return resetTeams(state);
      case LOAD_DATA:
        return loadData(state, action.payload.data);
      default: 
        return state;
   }
 }

 export { rootReducer, LOAD_DATA, UPDATE_CONTACT, ADD_CONTACT, DELETE_CONTACT, ADD_PLAYER, REMOVE_PLAYER, CLEAR_PLAYERS, INCREASE_TEAMS, DECREASE_TEAMS, RESET_TEAMS}