// proxy.ts (মূল ফাইলের নাম পরিবর্তন করে proxy.ts করুন)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // শুধু /admin দিয়ে শুরু হওয়া পাথে Basic Auth লাগবে
  if (pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');
    
    console.log('Path:', pathname);
    console.log('Auth Header:', authHeader);
    
    if (!authHeader) {
      console.log('No auth header - asking for credentials');
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Access"',
        },
      });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString();
    const [username, password] = credentials.split(':');
    
    console.log('Username:', username);
    console.log('Password:', password);
    
    // হার্ডকোডেড ক্রেডেনশিয়াল
    if (username === 'hafiz' && password === 'admin123') {
      console.log('Auth success');
      return NextResponse.next();
    }
    
    console.log('Auth failed');
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Access"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};