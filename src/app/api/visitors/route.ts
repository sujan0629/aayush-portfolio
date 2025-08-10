// api/visitors/route.ts
import dbConnect from '@/lib/db';
import Visitor from '@/models/Visitor';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const visitors = await Visitor.find({});
    return NextResponse.json(visitors);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching visitor data', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    // Get IP address from multiple possible headers
    let ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || // Works on Vercel/Netlify
      request.headers.get('x-real-ip') || // Nginx / proxies
      '';

    // Local dev fallback (set your own test IP for testing)
    if (!ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('::ffff:127')) {
      ip = '8.8.8.8'; // Google DNS as a placeholder
    }

    // Fetch geolocation from IP
    const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,message`);
    const geoData = await geoRes.json();

    if (geoData.status !== 'success') {
      return NextResponse.json({ message: 'Could not determine location', error: geoData.message }, { status: 400 });
    }

    const country = geoData.country;

    const updatedVisitor = await Visitor.findOneAndUpdate(
      { country },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedVisitor, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error recording visit', error }, { status: 500 });
  }
}
