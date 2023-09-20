import { firestore } from "../../config";
import {
  getDocs,
  collection,
  limit,
  query,
  orderBy,
  where,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// DONE
export async function getLatestPosts() {
  const postsRef = collection(firestore, "posts");
  const postsQuery = query(postsRef, orderBy("createdAt", "desc"), limit(6));
  const querySnapshot = await getDocs(postsQuery);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getAllPost() {
  const postsRef = collection(firestore, "posts");
  const postsQuery = query(postsRef, limit(15));
  const querySnapshot = await getDocs(postsQuery);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getPostByCategory(category: string) {
  const postsRef = collection(firestore, "posts");
  const postsQuery = query(postsRef, where("category", "==", category));
  const querySnapshot = await getDocs(postsQuery);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getAllPostWithNolimit() {
  const postsRef = collection(firestore, "posts");
  const postsQuery = query(
    postsRef,
    where("category", "not-in", [
      "price-action-co-ban",
      "price-action-nang-cao",
    ])
  );
  const querySnapshot = await getDocs(postsQuery);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getListRandomPost() {
  const postsRef = collection(firestore, "posts");
  const postsQuery = query(postsRef, limit(9));
  const querySnapshot = await getDocs(postsQuery);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getPostById(id: any) {
  const docRef = id && doc(firestore, "posts", id);
  const snapShot = docRef && (await getDoc(docRef));
  return snapShot && { ...snapShot.data(), id: snapShot.id };
}

export async function getPostBySlug(slug: any) {
  const postsRef = collection(firestore, "posts");
  const postsQuery = query(postsRef, where("slug", "==", slug));
  const querySnapshot = await getDocs(postsQuery);
  if (querySnapshot.docs.length > 0) {
    const snapshot = querySnapshot.docs[0];
    const data = snapshot.data();
    return data;
  }
}

export async function getListPostHaveTheMostView() {
  const postsRef = collection(firestore, "posts");
  const postsQuery = query(postsRef, orderBy("view", "desc"), limit(15));
  const querySnapshot = await getDocs(postsQuery);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export const updatePost = async (id: string, post: any) => {
  const docRef = doc(firestore, "posts", id + "");
  await updateDoc(docRef, post);
};
