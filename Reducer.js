import AsyncStorage from "@react-native-async-storage/async-storage";

const UPDATE_CONTACT = 'UPDATE_CONTACT';
const LOAD_DATA = 'LOAD_DATA';
const ADD_CONTACT = 'ADD_CONTACT';

 const updateContact = (state, contact) => {
  let {myContacts} = state;
  let newContacts = myContacts.map(elem=>elem.id===contact.id?contact:elem);
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
  console.log('newcontacts is',newContacts)
  // AsyncStorage.setItem('contacts')
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

const loadData = (state, data) => {
  // console.log('hi')
  // console.log('length is ', data.length)
  let num = Number(data[data.length-1].id) + 1
  // console.log('nextKey is ',num)
  let {myContacts} = state;
  let newContacts = data;
  return {
    ...state,
    myContacts:newContacts,
    nextKey:num
  }
};


//  I thought about using a key tracker but our contacts should not ever get out of order from their array. Meaning that the [-1] should be the highest @id and we can just add one to that for new contacts and push them to the array at the end.
 const initLastKey = 0;

 const initialState = {
   myContacts: initContacts,
   nextKey: initLastKey

 }

 function rootReducer(state=initialState, action) {
   switch (action.type) {
      case UPDATE_CONTACT:
        return updateContact(state, action.payload.contact);
      case ADD_CONTACT:
        return addContact(state, action.payload.contact);
      case LOAD_DATA:
        return loadData(state, action.payload.data);
      default: 
        return state;
   }
 }

 export { rootReducer, LOAD_DATA, UPDATE_CONTACT, ADD_CONTACT}