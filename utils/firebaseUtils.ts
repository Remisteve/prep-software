import { db } from "@/lib/firebase-admin";
import { DocumentReference } from "firebase-admin/firestore";

export function getUserRef (clientId: string): DocumentReference{
    return db.collection('users').doc(clientId)
}

// 
export function getServiceRef (serviceId: string): DocumentReference{
    return db.collection('services').doc(serviceId)
}

// 
export function getModelRef (model: string, id: string): DocumentReference{
    return db.collection(model).doc(id)
}