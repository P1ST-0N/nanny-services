import {
  ref,
  get,
  set,
  query,
  orderByKey,
  startAt,
  limitToFirst,
  remove,
} from "firebase/database";

import { db } from "./init.js";

export async function getDBData(limit, startKey = "") {
  const dbRef = ref(db, "nanny");

  const queryData = startKey
    ? query(dbRef, orderByKey(), startAt(startKey), limitToFirst(limit))
    : query(dbRef, orderByKey(), limitToFirst(limit));

  try {
    const snapshot = await get(queryData);

    const data = [];
    if (snapshot.exists()) {
      const res = snapshot.exportVal();
      for (const [key, value] of Object.entries(res)) {
        data.push({ id: key, ...value });
      }
    }

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}

async function getFavorites(uid) {
  const dbRef = ref(db, `users/${uid}/nannies`);

  try {
    const snapshot = await get(query(dbRef, orderByKey()));

    const data = [];
    if (snapshot.exists()) {
      const res = snapshot.exportVal();
      for (const [key, value] of Object.entries(res)) {
        data.push({ id: key, ...value });
      }
    }

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}

async function addFavorite(uid, data) {
  const dbRef = ref(db, `users/${uid}/nannies/${data.id}`);
  try {
    await set(dbRef, data);

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}

async function deleteFavorite(uid, id) {
  const dbRef = ref(db, `users/${uid}/nannies/${id}`);
  try {
    await remove(dbRef);

    return { error: null, data: id };
  } catch (error) {
    return { error, data: null };
  }
}

async function getTheme(uid) {
  const dbRef = ref(db, `users/${uid}/theme`);

  try {
    const snapshot = await get(query(dbRef));

    let data = null;
    if (snapshot.exists()) {
      const res = snapshot.exportVal();
      data = res;
    }

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}

async function setTheme(uid, theme) {
  const dbRef = ref(db, `users/${uid}/theme`);

  try {
    await set(dbRef, theme);

    return { error: null, data: theme };
  } catch (error) {
    return { error, data: null };
  }
}

export default {
  getDBData,
  getFavorites,
  addFavorite,
  deleteFavorite,
  getTheme,
  setTheme,
};
