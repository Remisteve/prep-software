import { firestore } from "@/lib/firebase-admin"
import { getModelRef } from "@/utils/firebaseUtils"
// import { getModelRef } from "@/utils/firebaseUtils"
import { FieldValue } from "firebase-admin/firestore"
import { NextResponse } from "next/server"


export async function GET(){
    try {
        const snapshot = await firestore.collection('appointments').get()
        const jobs = await Promise.all(
            snapshot.docs.map(async doc=>{
                const jobData = doc.data()
                let clientData = null

                if(jobData.patientID && typeof jobData.patientID.get === 'function'){
                    const fieldMask = ['firstName', 'lastName']
                    try{
                        const clientSnap = await jobData.patientID.get({
                            fieldMask:fieldMask
                        })
                        if (clientSnap.exists){
                            const selectedData = clientSnap.data(fieldMask);
                            clientData = {id: clientSnap.id, ...selectedData}
                        }
                    }catch(error){
                        console.error(error)
                    }
                }

                return {
                    id: doc.id,
                    ...jobData,
                    Patient: clientData
                }
            })
        )
        return NextResponse.json(jobs,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:(error as Error).message},{status:500})
    }
}

export async function POST(request:Request){
    try {
        const timestamp = FieldValue.serverTimestamp()

        const data = await request.json()

        if(!data || typeof data !== 'object'){
            return NextResponse.json({error:'Invalid request body'},{status:400})
        }

        const docRef = await firestore.collection('appointments').add({...data,
                    createdAt: timestamp,
                    updatedAt:timestamp,
                    patientID:getModelRef('users', data.patientID)
        })

        return NextResponse.json({message:'Document added successfully', id:docRef.id},{status:201})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: (error as Error).message},{status:500})
    }
}