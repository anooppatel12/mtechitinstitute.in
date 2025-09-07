
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import type { BlogPost } from "./types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

// This is needed for phone auth to work with app check
if (typeof window !== "undefined") {
    // @ts-ignore
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    const blogQuery = query(
        collection(db, "blog"),
        where("category", "==", category)
    );
    const blogSnapshot = await getDocs(blogQuery);
    let posts = blogSnapshot.docs.map(doc => ({ slug: doc.id, ...doc.data() } as BlogPost));

    // Sort by date in descending order (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return posts;
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
    const q = query(collection(db, "blog"), where("tags", "array-contains", tag));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => {
         const data = doc.data() as Omit<BlogPost, 'slug' | 'summary'>;
        const snippet = data.content.replace(/<[^>]+>/g, '').substring(0, 150);
        return { 
            ...data, 
            slug: doc.id,
            summary: `${snippet}...` 
        } as BlogPost;
    });

     // Sort by date in descending order (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}


export { app, db, auth };
