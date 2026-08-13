// Supabase Edge Function: Submit Inquiry (Serverless)
// Triggered when a school or client submits an inquiry form.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const payload = await req.json();
    const { school_name, contact_person, phone_number, email, city_province, jurusan_target, message, budget_range } = payload;

    if (!school_name || !contact_person || !phone_number) {
      return new Response(
        JSON.stringify({ error: "Nama Sekolah, Kontak, dan No HP wajib diisi" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data, error } = await supabaseClient
      .from("inquiries")
      .insert([
        {
          school_name,
          contact_person,
          phone_number,
          email,
          city_province,
          jurusan_target,
          message,
          budget_range,
          status: "new"
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, data, message: "Permintaan konsultasi berhasil dikirim ke tim PT. Boemi Nusantara" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
