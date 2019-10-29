import storage from 'good-storage'

const SELLER_KEY = '__seller__'

export function saveToLocal(key, val) {
  const seller = storage.get(SELLER_KEY, {})
  seller[key] = val
  storage.set(SELLER_KEY, seller)
}

export function loadFromLocal(key, def) {
  const seller = storage.get(SELLER_KEY)
  return seller[key] || def
}
