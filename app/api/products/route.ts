import dbConnect from '../../../lib/db';
import Product from '../../../models/Product';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET() {
  await dbConnect();
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const product = await Product.create(body);
    revalidateTag('products', 'max');
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
