import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tzaueafdrqhsgnwtbzeb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6YXVlYWZkcnFoc2dud3RiemViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzODk4NjgsImV4cCI6MjA1Nzk2NTg2OH0.vegM211ik-YnUOAKDk6vdyyHwolCFff3VdQ9U2gY0Mg";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function mediaUpload(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject("No file found");
    }

    const timestamp = Date.now();
    const fileName = `uploads/${timestamp}_${file.name}`;

    supabase.storage
      .from("images") // Ensure this bucket exists
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(({ data, error }) => {
        if (error) {
          console.error("Upload Error:", error.message);
          return reject("Error uploading file");
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(data.path);

        resolve(publicUrlData.publicUrl);
      })
      .catch((error) => {
        console.error(error);
        reject("Error uploading file");
      });
  });
}
