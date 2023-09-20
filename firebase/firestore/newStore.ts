import { firestore } from "../../config";
import {
  getDocs,
  collection,
  limit,
  query,
  orderBy,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// DONE
export async function getAllNews() {
  const newsRef = collection(firestore, "news");
  const newsQuery = query(newsRef, limit(15));
  const querySnapshot = await getDocs(newsQuery);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getNewsById(id: any) {
  const docRef = id && doc(firestore, "news", id);
  const snapShot = docRef && (await getDoc(docRef));
  return snapShot && { ...snapShot.data(), id: snapShot.id };
}

export async function getListPostHaveTheMostView() {
  const newsRef = collection(firestore, "news");
  const newsQuery = query(newsRef, orderBy("view", "desc"), limit(15));
  const querySnapshot = await getDocs(newsQuery);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export const updateNews = async (id: string, post: any) => {
  const docRef = doc(firestore, "news", id + "");
  await updateDoc(docRef, post);
};
