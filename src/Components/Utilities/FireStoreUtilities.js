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
    messagelist: [],
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

//Return userID of give display name
export async function getUserIdFromDisplayName(_displayName) {
  const querySnapshot = await getDocs(collection(getFirestore(), "users"));

  let exists = null;

  querySnapshot.forEach((doc) => {
    if (doc.data().displayname === _displayName) {
      exists = doc.data().userid;
      return exists;
    }
  });

  return exists;
}
