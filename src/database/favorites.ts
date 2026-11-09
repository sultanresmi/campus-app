import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

export type SavedPost = {
  id: number;
  title: string;
  body: string;
  isRead: 0 | 1;
};

type PostInput = Pick<SavedPost, 'id' | 'title' | 'body'>;

const isWeb = Platform.OS === 'web';

// -------------------------------------------------------------------
// 1. Мобильная версия (SQLite для Android / iOS по методичке ЛР №10)
// -------------------------------------------------------------------
const readyDb = (async () => {
  if (isWeb) return null;
  const db = await SQLite.openDatabaseAsync('campus_favorites.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      isRead INTEGER NOT NULL DEFAULT 0 CHECK (isRead IN (0, 1))
    );
  `);
  return db;
})();

// Вспомогательные методы для Web (LocalStorage)
const WEB_KEY = 'campus_favorites_db';
function getWebItems(): SavedPost[] {
  try {
    const raw = localStorage.getItem(WEB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function setWebItems(items: SavedPost[]) {
  try {
    localStorage.setItem(WEB_KEY, JSON.stringify(items));
  } catch {}
}

// -------------------------------------------------------------------
// 2. CREATE: Офлайн сақтау
// -------------------------------------------------------------------
export async function savePost(post: PostInput): Promise<number> {
  if (isWeb) {
    const items = getWebItems();
    if (items.some((i) => i.id === post.id)) {
      return 0; // Бұрын сақталған
    }
    items.unshift({ ...post, isRead: 0 });
    setWebItems(items);
    return 1;
  }

  const db = await readyDb;
  if (!db) return 0;
  const result = await db.runAsync(
    `INSERT INTO favorites (id, title, body) VALUES (?, ?, ?)
     ON CONFLICT(id) DO NOTHING`,
    post.id,
    post.title,
    post.body
  );
  return result.changes;
}

// -------------------------------------------------------------------
// 3. READ: Сақталған тізімді оқу
// -------------------------------------------------------------------
export async function getSavedPosts(): Promise<SavedPost[]> {
  if (isWeb) {
    const items = getWebItems();
    return items.sort((a, b) => a.isRead - b.isRead || b.id - a.id);
  }

  const db = await readyDb;
  if (!db) return [];
  return db.getAllAsync<SavedPost>(
    `SELECT id, title, body, isRead
     FROM favorites
     ORDER BY isRead ASC, id DESC`
  );
}

// -------------------------------------------------------------------
// 4. UPDATE: Оқылу күйін өзгерту (0 <-> 1)
// -------------------------------------------------------------------
export async function toggleRead(id: number): Promise<void> {
  if (isWeb) {
    const items = getWebItems().map((item) =>
      item.id === id ? { ...item, isRead: (1 - item.isRead) as 0 | 1 } : item
    );
    setWebItems(items);
    return;
  }

  const db = await readyDb;
  if (!db) return;
  await db.runAsync(
    `UPDATE favorites
     SET isRead = 1 - isRead
     WHERE id = ?`,
    id
  );
}

// -------------------------------------------------------------------
// 5. DELETE: Тізімнен жою
// -------------------------------------------------------------------
export async function removeSaved(id: number): Promise<void> {
  if (isWeb) {
    const items = getWebItems().filter((item) => item.id !== id);
    setWebItems(items);
    return;
  }

  const db = await readyDb;
  if (!db) return;
  await db.runAsync('DELETE FROM favorites WHERE id = ?', id);
}