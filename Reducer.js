import AsyncStorage from "@react-native-async-storage/async-storage";

const LOAD_CONTACTS = 'LOAD_CONTACTS';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const LOAD_DATA = 'LOAD_DATA';

const loadContacts = (state, contacts) => {
   return {
     ...state, 
     myContacts: contacts
   }
 }

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

 const initContacts = [
  { first: 'Kyle', last: 'Mosz', skill: '4', id:'0'},
];


const loadData = (state, data) => {
  let {myContacts} = state;
  let newContacts = data;
  return {
    ...state,
    myContacts:newContacts
  }
};


//  I thought about using a key tracker but our contacts should not ever get out of order from their array. Meaning that the [-1] should be the highest @id and we can just add one to that for new contacts and push them to the array at the end.
 const initLastKey = 0;

 const initialState = {
   myContacts: initContacts,

 }

 function rootReducer(state=initialState, action) {
   switch (action.type) {
      case LOAD_CONTACTS:
        return loadContacts(state, action.payload.contacts);
      case UPDATE_CONTACT:
        return updateContact(state, action.payload.contact);
      case LOAD_DATA:
        return loadData(state, action.payload.data);
      default: 
        return state;
   }
 }

 export { rootReducer, LOAD_DATA, LOAD_CONTACTS, UPDATE_CONTACT}