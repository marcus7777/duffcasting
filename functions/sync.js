const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.fireDeletePages = functions.firestore.document('/pages/{pageId}').onDelete(snap => {
  const pageId = snap.id;
  const db = admin.database().ref('pages');
  return db.child(pageId).set(null);
})
exports.fireDeleteCv = functions.firestore.document('/cv/{pageId}').onDelete(snap => {
  const pageId = snap.id;
  const db = admin.database().ref('cv');
  return db.child(pageId).set(null);
})
exports.fireWritePages = functions.firestore.document('/pages/{pageId}').onWrite((change, context) => {
    const pageDoc = change.after.data();
    const pageId = change.after.id;
    const db = admin.database().ref('pages');

    const {status} = pageDoc;

    if (status !== 'published') {
      return db.child(pageId).set(null);
    }

    return db.child(pageId).set(pageDoc);
})
exports.fireWriteCv = functions.firestore.document('/cv/{pageId}').onWrite((change, context) => {
    const pageDoc = change.after.data();
    const pageId = change.after.id;
    const db = admin.database().ref('cv');

    const {status} = pageDoc;

    if (status !== 'published') {
      return db.child(pageId).set(null);
    }

    return db.child(pageId).set(pageDoc);
})
