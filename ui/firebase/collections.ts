import { collection } from 'firebase/firestore';
import { db } from './client';
import { EVENTS } from '../constants';
export const eventsCollection = collection(db, EVENTS);
