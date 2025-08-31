import { z } from "zod";
import dns from "dns/promises";

const emailSchema = z.string().email("Invalide email format");
export async function validateEmail(email: string): Promise<{ success: boolean; message?: string }> {
   try {
      const validateResult = emailSchema.safeParse(email);
      if(!validateResult.success){
        return { success: false, message: "Invalid Email"};
      }
    } catch (error: any) {
        return { success: false, message: error.message || "Invalid Email"};
    }

  const domain = email.split("@")[1];
  if (!domain) {
    return { success: false, message: "Invalid Email"};
  }

  try {
    const records = await dns.resolveMx(domain);

    if (!records || records.length === 0) {
      return { success: false, message: "The email is not registered in any platform" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, message: "The email is not registered in any platform" };
  }
}

