import { createClient } from '@supabase/supabase-js';


const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6YXVlYWZkcnFoc2dud3RiemViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzODk4NjgsImV4cCI6MjA1Nzk2NTg2OH0.vegM211ik-YnUOAKDk6vdyyHwolCFff3VdQ9U2gY0Mg"

const supabase_url = "https://tzaueafdrqhsgnwtbzeb.supabase.co";

const supabase = createClient(supabase_url, anon_key);

export default function mediaUpload(file) {
    return supabase.storage.from('images').upload(file.name, file, {
        cacheControl: '3600',
        upsert: false,
    }).then(() => {
        const { publicURL } = supabase.storage.from('images').getPublicUrl(file.name);
        console.log(publicURL);
    })
}