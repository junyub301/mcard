import { Card } from '@models/card'
import { COLLECTIONS } from '@constants'
import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'

export async function getCards() {
  const cardSnapshot = await getDocs(collection(store, COLLECTIONS.CARD))
  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}
