import { NextResponse } from "next/server";

// export function middleware(request) {
//   return NextResponse.redirect(new URL("/about", request.url));
// }

// export const config = {
//   matcher: ["/account", "/cabins"],
// };

import { auth } from "@/app/_lib/auth";

export const middleware = auth; //this auth middleware will be run after the request but before the response (route navigation)

export const config = {
  matcher: ["/account"],
};
