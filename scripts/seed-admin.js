
// This script is used to seed the initial admin user in your Firestore database.
// To use it, run `npm run seed` in your terminal.
// IMPORTANT: Make sure you have your Firebase environment variables set up in a .env.local file.

require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");
const bcrypt = require("bcryptjs");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ADMIN_EMAIL = "admin@mtech.com";
const ADMIN_PASSWORD = "password"; // You should change this after the first login
const ADMIN_DOC_ID = "primary-admin";

async function seedAdmin() {
  try {
    console.log("Starting to seed admin user...");

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);

    const adminData = {
      email: ADMIN_EMAIL,
      passwordHash: passwordHash,
    };

    const adminDocRef = doc(db, "admins", ADMIN_DOC_ID);
    await setDoc(adminDocRef, adminData);

    console.log("✅ Admin user seeded successfully!");
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log("\nIMPORTANT: Please change this default password from the admin dashboard settings as soon as you log in.");
    process.exit(0);
  } catch (error) {
    console.error("🔥 Error seeding admin user:", error);
    process.exit(1);
  }
}

seedAdmin();
