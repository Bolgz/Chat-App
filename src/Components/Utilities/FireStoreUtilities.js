import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";

// Check if user exists in Firestore
export async function getUser(userId) {
  const docRef = await doc(getFirestore(), "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
}

//Add user to Firestore
export async function addUser(_userId, _displayName) {
  await setDoc(doc(getFirestore(), "users", _userId), {
    userid: _userId,
    displayname: _displayName,
    contactlist: [],
  });
}

//Sets user's display name in Firestore
export async function setDisplayName(_userId, _displayName) {
  const userRef = doc(getFirestore(), "users", _userId);

  await updateDoc(userRef, { displayname: _displayName });
}

//Check if display name is already taken
export async function checkDisplayName(_displayName) {
  const querySnapshot = await getDocs(collection(getFirestore(), "users"));

  let exists = false;

  querySnapshot.forEach((doc) => {
    if (doc.data().displayname === _displayName) {
      exists = true;
      return exists;
    }
  });

  return exists;
}

//Return data of given display name
export async function getUserDataFromDisplayName(_displayName) {
  const querySnapshot = await getDocs(collection(getFirestore(), "users"));

  let exists = false;

  querySnapshot.forEach((doc) => {
    if (doc.data().displayname === _displayName) {
      exists = {
        userID: doc.data().userid,
        userDisplayName: doc.data().displayname,
        userContactList: doc.data().contactlist,
      };
      return exists;
    }
  });

  return exists;
}

//Return data of given name userID
export async function getUserDataFromUserId(_userId) {
  const querySnapshot = await getDocs(collection(getFirestore(), "users"));

  let exists = false;

  querySnapshot.forEach((doc) => {
    if (doc.data().userid === _userId) {
      exists = {
        userID: doc.data().userid,
        userDisplayName: doc.data().displayname,
        userContactList: doc.data().contactlist,
      };
      return exists;
    }
  });

  return exists;
}

//Add user to contactlist in Firestore
export async function addContact(_userId, _contactId, _contactDisplayName) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  const newContact = {
    contactId: _contactId,
    contactDisplayName: _contactDisplayName,
  };

  //Only add contact if it doesn't already exist
  let canAdd = true;
  docSnap.data().contactlist.forEach(async (element) => {
    if (element.contactId == _contactId) {
      canAdd = false;
    }
  });

  if (canAdd) {
    const newContactList = [...docSnap.data().contactlist, newContact];
    await updateDoc(userRef, { contactlist: newContactList });
  }
}

//Get contactlist of user from Firestore
export async function getContactList(_userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  return docSnap.data().contactlist;
}

//Remove user from contactlist in Firestore
export async function removeContact(_userId, _contactId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  const newContactList = docSnap
    .data()
    .contactlist.filter((contact) => contact.contactId !== _contactId);

  await updateDoc(userRef, { contactlist: newContactList });
}

//Get user conversation if exists
export async function getConversation(_userID1, _userID2) {
  const convoPossibility1 = _userID1 + "-" + _userID2;
  const convoPossibility2 = _userID2 + "-" + _userID1;

  let convoRef = doc(getFirestore(), "conversations", convoPossibility1);

  const docSnap = await getDoc(convoRef);

  if (docSnap.exists()) {
    return docSnap.data().Messages;
  } else {
    convoRef = doc(getFirestore(), "conversations", convoPossibility2);
    const docSnap = await getDoc(convoRef);
    if (docSnap.exists()) {
      return docSnap.data().Messages;
    } else {
      return false;
    }
  }
}

//Create new conversation in Firestore
export async function createConversation(_userID1, _userID2) {
  const path = _userID1 + "-" + _userID2;

  await setDoc(doc(getFirestore(), "conversations", path), {
    Messages: [],
  });
}

//Send a message to a conversation
export async function sendMessage(senderDN, SenderID, receiver, message) {
  const convoPossibility1 = SenderID + "-" + receiver;
  const convoPossibility2 = receiver + "-" + SenderID;

  let convoRef = doc(getFirestore(), "conversations", convoPossibility1);

  const docSnap = await getDoc(convoRef);

  const newMessage = { senderDN, message };

  if (docSnap.exists()) {
    const newMessageMap = [...docSnap.data().Messages, newMessage];
    await updateDoc(convoRef, { Messages: newMessageMap });
  } else {
    convoRef = doc(getFirestore(), "conversations", convoPossibility2);
    const docSnap = await getDoc(convoRef);
    if (docSnap.exists()) {
      const newMessageMap = [...docSnap.data().Messages, newMessage];
      await updateDoc(convoRef, { Messages: newMessageMap });
    }
  }

  //Add sender ID to receiver's contact list
  getUserDataFromUserId(SenderID).then((userData) => {
    addContact(receiver, SenderID, userData.userDisplayName);
  });
}
