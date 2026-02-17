import { GroceryItem, GroceryList, User } from '../types';

const STORAGE_KEYS = {
  CURRENT_LIST: 'freshlist_current_list',
  LISTS: 'freshlist_lists',
  USER: 'freshlist_user',
};

// Grocery Items
export const saveCurrentList = (items: GroceryItem[]): void => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_LIST, JSON.stringify(items));
};

export const getCurrentList = (): GroceryItem[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_LIST);
  if (!stored) return getDefaultItems();
  return JSON.parse(stored);
};

export const clearCurrentList = (): void => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_LIST);
};

// Saved Lists
export const saveList = (list: GroceryList): void => {
  const lists = getAllLists();
  const existingIndex = lists.findIndex(l => l.id === list.id);
  
  if (existingIndex >= 0) {
    lists[existingIndex] = list;
  } else {
    lists.unshift(list);
  }
  
  localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(lists));
};

export const getAllLists = (): GroceryList[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.LISTS);
  if (!stored) return getDefaultLists();
  return JSON.parse(stored);
};

export const deleteList = (id: string): void => {
  const lists = getAllLists().filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(lists));
};

// User
export const saveUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.USER);
  if (!stored) return null;
  return JSON.parse(stored);
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Default Data
export const getDefaultItems = (): GroceryItem[] => [
  {
    id: '1',
    name: 'Organic Spinach',
    category: 'Produce',
    quality: 'fresh',
    purchased: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Chicken Breast',
    category: 'Protein',
    quality: 'fresh',
    purchased: false,
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Greek Yogurt',
    category: 'Dairy',
    quality: 'moderate',
    purchased: false,
    createdAt: new Date(),
  },
];

const getDefaultLists = (): GroceryList[] => [
  {
    id: '1',
    name: 'Weekly Essentials',
    items: [
      { id: '1', name: 'Organic Spinach', category: 'Produce', quality: 'fresh', purchased: true, createdAt: new Date('2026-02-14') },
      { id: '2', name: 'Chicken Breast', category: 'Protein', quality: 'fresh', purchased: true, createdAt: new Date('2026-02-14') },
      { id: '3', name: 'Greek Yogurt', category: 'Dairy', quality: 'moderate', purchased: true, createdAt: new Date('2026-02-14') },
    ],
    createdAt: new Date('2026-02-14'),
    completedAt: new Date('2026-02-14'),
  },
  {
    id: '2',
    name: 'Weekend BBQ',
    items: [
      { id: '1', name: 'Ribeye Steak', category: 'Protein', quality: 'fresh', purchased: true, createdAt: new Date('2026-02-12') },
      { id: '2', name: 'Bell Peppers', category: 'Produce', quality: 'fresh', purchased: true, createdAt: new Date('2026-02-12') },
    ],
    createdAt: new Date('2026-02-12'),
    completedAt: new Date('2026-02-12'),
  },
];
