import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature");

  const expected = crypto
    .createHmac("sha256", process.env.SEPAY_SECRET!)
    .update(rawBody)
    .digest("hex");

  if (signature !== expected) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const data = JSON.parse(rawBody);

  const { error } = await supabase.rpc("process_paid_order", {
    p_order_code: data.order_code,
    p_amount: data.amount,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
