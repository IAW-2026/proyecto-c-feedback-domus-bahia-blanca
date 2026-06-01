import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    if (isAdminRoute(req)) {

      const {
        userId,
        sessionClaims,
      } = await auth();
      const role =
        (sessionClaims?.metadata as any)
          ?.role;

      if (!userId) {
        return NextResponse.redirect(
          new URL("/", req.url)
        );
      }

      if (role !== "admin") {
        return NextResponse.redirect(
          new URL("/", req.url)
        );
      }
    }
  }
);

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};