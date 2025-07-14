import { v4 as uuidv4 } from 'uuid'; // ⬅️ Add this at the top
import { NextRequest } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
// import { storage } from '@/lib/firebase-admin';

export const POST = async (req: NextRequest) => {
  try {
    // Use Next.js built-in FormData parsing
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(
        JSON.stringify({ error: "No file provided" }), 
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate file type (optional)
    if (!file.type.startsWith('image/')) {
      return new Response(
        JSON.stringify({ error: "Only image files are allowed" }), 
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a temporary file path
    const tempFilePath = path.join('/tmp', `${Date.now()}_${file.name}`);
    
    // Write buffer to temporary file
    await writeFile(tempFilePath, buffer);

    // 
    const token = uuidv4();


    try {
      const destFileName = `images/users/profiles/${Date.now()}_${file.name}`;
      
      // Upload to Firebase Storage
      // await storage.upload(tempFilePath, {
      //   destination: destFileName,
      //   metadata: {
      //     contentType: file.type || "image/jpeg",
      //     firebaseStorageDownloadTokens: token, // ⬅️ This enables public access

      //   },
        
      // });

      // Clean up temporary file
      await unlink(tempFilePath);


      
      // Get public URL
const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(destFileName)}?alt=media&token=${token}`;

      return new Response(
        JSON.stringify({ 
          url: publicUrl,
          fileName: file.name,
          size: file.size,
          type: file.type
        }), 
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (uploadError) {
      // Clean up temporary file in case of error
      if (existsSync(tempFilePath)) {
        await unlink(tempFilePath);
      }
      
      console.error("Upload error:", uploadError);
      return new Response(
        JSON.stringify({ 
          error: "Upload failed", 
          details: (uploadError instanceof Error) ? uploadError.message : String(uploadError)
        }), 
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Request processing error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Request processing failed", 
        details: error instanceof Error ? error.message : String(error) 
      }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};