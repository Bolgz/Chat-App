import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
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
  });
}

//Sets user's display name in Firestore
export async function setDisplayName(_userId, _displayName) {
  const userRef = doc(getFirestore(), "users", _userId);

  await updateDoc(userRef, { displayname: _displayName });
}

//Get user's todo list from Firestore
export async function getTodos(userId) {
  const userRef = doc(getFirestore(), "users", userId);
  const docSnap = await getDoc(userRef);

  return docSnap.data().todos;
}
