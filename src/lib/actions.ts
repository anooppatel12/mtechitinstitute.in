
"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function submitContactForm(
  prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
  const formData = Object.fromEntries(data);
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: "Invalid form data.",
      fields: formData as Record<string, string>,
      issues,
    };
  }

  try {
    console.log("Form submission received:");
    console.log(parsed.data);
    return { message: "Thank you for your message! We will get back to you soon." };
  } catch (error) {
    return { message: "An error occurred. Please try again later." };
  }
}

// --- Admin Actions ---

const ADMIN_DOC_ID = "primary-admin"; // Use a fixed ID for the single admin user

export async function verifyAdminCredentials(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { success: false, message: "Email and password are required." };
    }

    const adminDocRef = doc(db, "admins", ADMIN_DOC_ID);
    const adminDocSnap = await getDoc(adminDocRef);

    if (!adminDocSnap.exists()) {
      return { success: false, message: "Admin user not found. Please run the seed script." };
    }

    const adminData = adminDocSnap.data();
    const isPasswordValid = await bcrypt.compare(password, adminData.passwordHash);

    if (adminData.email !== email || !isPasswordValid) {
      return { success: false, message: "Invalid email or password." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error verifying admin credentials:", error);
    return { success: false, message: "An internal error occurred." };
  }
}


export async function updateAdminCredentials(formData: FormData) {
  try {
    const currentPassword = formData.get('currentPassword') as string;
    const newEmail = formData.get('newEmail') as string | null;
    const newPassword = formData.get('newPassword') as string | null;

    if (!currentPassword) {
        return { success: false, message: "Current password is required to make changes." };
    }

    const adminDocRef = doc(db, "admins", ADMIN_DOC_ID);
    const adminDocSnap = await getDoc(adminDocRef);

    if (!adminDocSnap.exists()) {
      return { success: false, message: "Admin user not found." };
    }

    const adminData = adminDocSnap.data();
    const isPasswordValid = await bcrypt.compare(currentPassword, adminData.passwordHash);

    if (!isPasswordValid) {
      return { success: false, message: "Incorrect current password." };
    }
    
    const updates: { email?: string; passwordHash?: string } = {};

    if (newEmail) {
        updates.email = newEmail;
    }

    if (newPassword) {
        const salt = await bcrypt.genSalt(10);
        updates.passwordHash = await bcrypt.hash(newPassword, salt);
    }
    
    if (Object.keys(updates).length === 0) {
        return { success: true, message: "No changes were made." };
    }

    await updateDoc(adminDocRef, updates);

    return { success: true, message: "Credentials updated successfully." };
  } catch (error) {
    console.error("Error updating admin credentials:", error);
    return { success: false, message: "An internal error occurred." };
  }
}
