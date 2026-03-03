import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        order_code: body.order_code,
        customer_name: body.name,
        customer_email: body.email,
        customer_phone: body.phone,
        subtotal: body.subtotal,
        total_amount: body.total,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ order: data });
}
