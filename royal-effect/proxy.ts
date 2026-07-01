import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  // Prevent infinite redirects and 404s by not redirecting everything.
  // E.g., if you had a '/home', you could redirect to '/':
  if (request.nextUrl.pathname === '/home') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
