import { useEffect, useState } from "react";

const useUploadImage = () => {

    const [uploadProgress, setUploadProgress] = useState(0)
    const [continueUpload, setContinueUpload] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [imgPath, setImgPath] = useState('false')
    const [preview, setPreview] = useState<string | ArrayBuffer | null>()


    const handlePreview = async (file: File) => {
        if (!file.type.match('image.*')) {
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            return
        }

        const fileReader = new FileReader()
        fileReader.onload = e => {
            setPreview(e?.target && e.target?.result)
        }
        fileReader.readAsDataURL(file);
    }


    const uploadImage = async (file: File) => {
        try {

            await handlePreview(file)

            setUploading(true)
            setUploadProgress(0)
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error(`Upload failed with status ${res.status}`)
            }

            // Read response with progress tracking
            const reader = res.body?.getReader();
            const contentLength = res.headers.get('Content-Length');

            if (!reader) {
                throw new Error('ReadableStream not supported');
            }

            let receivedLength = 0;
            const chunks = [];

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                chunks.push(value);
                receivedLength += value.length;

                if (contentLength) {
                    const progress = Math.round((receivedLength / parseInt(contentLength)) * 100);
                    setUploadProgress(progress);
                }
            }

            // Combine chunks and parse JSON
            const chunksAll = new Uint8Array(receivedLength);
            let position = 0;
            for (const chunk of chunks) {
                chunksAll.set(chunk, position);
                position += chunk.length;
            }

            const result = new TextDecoder("utf-8").decode(chunksAll);
            const data = JSON.parse(result);
            if (!data.url) {
                throw new Error('Upload failed: No URL returned');
            }
            setUploadProgress(100);
            setImgPath(data.url);

            // Reset progress after delay
            setTimeout(() => {
                setUploadProgress(0);
                setUploading(false);
            }, 1000);

            console.log("Uploaded to:", data.url);
        } catch (error) {
            console.log(error)
        }
    };

    return { uploadProgress, uploading, uploadImage, preview, setContinueUpload, imgPath, setPreview }
}

export default useUploadImage