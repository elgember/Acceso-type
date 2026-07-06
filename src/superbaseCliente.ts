import { createClient } from "@supabase/supabase-js";

//variable con la url de la base de datos
const supabaseUrl = 'https://xgauwcxczobuemycjtyz.supabase.co';

//variable con la clave de la base de datos
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnYXV3Y3hjem9idWVteWNqdHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNzEyNTgsImV4cCI6MjA5ODg0NzI1OH0.55-OhLDUGP6Spldd9PnaVt07KPeYuBifDgRnH21yMs4';

export const supabase = createClient(supabaseUrl, supabaseKey);