import { firestore } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    try {
        const searchTerm = searchParams.get('search') || ''
        const usersRef = firestore.collection('users')
        
        if (searchTerm && searchTerm.length > 0) {
            const lowerSearchTerm = searchTerm.toLowerCase()
            
            // Get all users and filter client-side for more flexible search
            const allUsersSnapshot = await usersRef.get()
            
            const users = allUsersSnapshot.docs
                .map(doc => {
                    const data = doc.data() as { name?: string; email?: string };
                    return {
                        id: doc.id,
                        ...data
                    };
                })
                .filter(user => {
                    const name = (user.name ?? '').toLowerCase();
                    const email = (user.email ?? '').toLowerCase();
                    
                    return name.includes(lowerSearchTerm) || 
                           email.includes(lowerSearchTerm);
                })
                .slice(0, 20) // Limit results to 20
            
            return NextResponse.json(users, { status: 200 })
        }

        return NextResponse.json([], { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}