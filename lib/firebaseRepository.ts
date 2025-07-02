import { db, firestore } from "./firebase-admin"


export const getAllDocuments = async <T>(collectionName: string, startAfterDoc: string | null, page: string, pageSize: string, searchTerm: string,) => {
    try {
        let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = db.collection(collectionName)
        if (searchTerm) {
            query = query
                // .where('userType', '==', 'staff')
                .where('firstName', '>=', searchTerm)
                .where('firstName', '<=', searchTerm + '\uf8ff')

        }

        query = query.orderBy('createdAt')


        if (startAfterDoc) {
            const docSnapshot = db.collection(collectionName).doc(startAfterDoc).get()
            if ((await docSnapshot).exists) {
                query = query.startAfter(docSnapshot)
            }
        } else if (Number(page) > 1) {
            const skipCount = (Number(page) - 1) * parseInt(pageSize)
            const skipSnapshot = await query.limit(skipCount).get()
            const lastVisible = skipSnapshot.docs[skipSnapshot.docs.length - 1]
            if (lastVisible) {
                query = query.startAfter(lastVisible)
            }
        }

        query = query.limit(parseInt(pageSize))
        const querySnapShots = await query.get()

        const data = querySnapShots.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as T[]

        const totalCountQuery = query.count().get()


                const totalCount = (await totalCountQuery).data()?.count || 0
       const lastVisibleDoc = querySnapShots.docs[querySnapShots.docs.length -1]
            const hasMore = data.length === parseInt(pageSize)


        return {
                data,
                 pagination: {
                    totalCount,
                    pageSize,
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / Number(pageSize)),
                    hasMore,
                    nextCursor: hasMore && lastVisibleDoc ? lastVisibleDoc.id : null
                }
            }

    } catch (error) {
        console.error(error)
        throw new Error(`Failed to fetch ${collectionName} document`)
    }
}



export const getDocumentById = async <T>(collectionName: string, id: string) => {
    try {
        const docRef = firestore.collection(collectionName).doc(id)
        const docSnap = await docRef.get()

        if (!docSnap.exists) {
            return null
        }

        return {
            id: docSnap.id,
            ...docSnap.data() as T
        }
    } catch (error) {
        console.error(error)
        throw new Error(`Failed to fetch ${collectionName} document`)
    }
}