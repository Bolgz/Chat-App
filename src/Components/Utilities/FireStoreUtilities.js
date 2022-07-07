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

  await updateDoc(userRef, {
    contactlist: [...docSnap.data().contactlist, newContact],
  });
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
