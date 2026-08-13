// Supabase Edge Function: Generate Quotation & RAB (Serverless)

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
    const { school_name, contact_name, contact_phone, contact_email, items } = payload;

    if (!school_name || !items || !Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Data sekolah dan daftar item alat praktik harus disertakan" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const totalEstimated = items.reduce((sum: number, it: any) => sum + (Number(it.price || 0) * Number(it.qty || 1)), 0);
    const ppn = totalEstimated * 0.11;
    const grandTotal = totalEstimated + ppn;
    const quoteNumber = `BNKB-RAB-${Date.now().toString().slice(-6)}`;

    const { data, error } = await supabaseClient
      .from("quotations")
      .insert([
        {
          quote_number: quoteNumber,
          school_name,
          contact_name,
          contact_phone,
          contact_email,
          total_estimated_amount: totalEstimated,
          include_ppn: true,
          ppn_amount: ppn,
          grand_total: grandTotal,
          items,
          status: "draft"
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, quote: data }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
