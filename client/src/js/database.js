import { openDB } from 'idb';

const initdb = async () =>
  openDB('JATE', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('JATE')) {
        console.log('JATE database already exists');
        return;
      }
      db.createObjectStore('JATE', { keyPath: 'id', autoIncrement: true });
      console.log('JATE database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//export const putDb = async (content) => console.error('putDb not implemented');

export const putDb = async (content) => {
  console.log('PUT to the database');
  const todosDb = await openDB('JATE', 1);
  const tx = todosDb.transaction('JATE', 'readwrite');
  const store = tx.objectStore('JATE');
  const request = store.put({ JATE: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('JATE', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('JATE', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('JATE');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result[0]?result[0].value:'';
}
//console.error('getDb not implemented');

initdb();
