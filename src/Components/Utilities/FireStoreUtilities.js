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
export async function addUser(userId) {
  await setDoc(doc(getFirestore(), "users", userId), {
    userid: userId,
  });
}

//Sets user's todo list in Firestore
export async function setTodos(userId, todoList) {
  const userRef = doc(getFirestore(), "users", userId);

  await updateDoc(userRef, { todos: todoList });
}

//Get user's todo list from Firestore
export async function getTodos(userId) {
  const userRef = doc(getFirestore(), "users", userId);
  const docSnap = await getDoc(userRef);

  return docSnap.data().todos;
}
