const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DATA_PATH = path.join(DATA_DIR, 'db.json');

// Simple lock mechanism to prevent concurrent writes
let writeLock = Promise.resolve();

async function initDataStore() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_PATH);
  } catch (err) {
    const init = {
      reviews: [],
      users: [],
      rides: [],
      emergencies: [],
      contacts: []
    };
    await saveDataStore(init);
  }
}

async function loadDataStore() {
  await initDataStore();
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database, reinitializing:', err.message);
    const init = {
      reviews: [],
      users: [],
      rides: [],
      emergencies: [],
      contacts: []
    };
    await saveDataStore(init);
    return init;
  }
}

async function saveDataStore(db) {
  // Wait for any pending writes to complete
  await writeLock;
  
  // Create a new promise for this write operation
  writeLock = (async () => {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(DATA_PATH, JSON.stringify(db, null, 2), 'utf8');
    } catch (err) {
      console.error('Error saving database:', err.message);
      throw err;
    }
  })();
  
  await writeLock;
}

module.exports = { initDataStore, loadDataStore, saveDataStore };

