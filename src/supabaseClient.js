import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bwlohuugrxppubbnszlt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3bG9odXVncnhwcHViYm5zemx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODIxMTcsImV4cCI6MjA3NTA1ODExN30.7DfGebxC97YyrB_2FUsRHhk0s3J4tMhW1E06k_dFoKg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
