const fs = require('fs').promises;
const path = require('path');

const DB_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DB_DIR, 'db.json');

async function ensureDB() {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    await fs.access(DB_PATH);
  } catch (err) {
    const init = {
      reviews: [],
      users: [],
      rides: [],
      emergencies: [],
      splitBills: [],
      payments: []
    };
    await writeDB(init);
  }
}

async function readDB() {
  await ensureDB();
  const raw = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

async function writeDB(db) {
  await fs.mkdir(DB_DIR, { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

module.exports = { readDB, writeDB };
