import { NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/student",
  "/faculty",
  "/employer",
  "/supervisor",
  "/coordinator",
  "/admin",
];

const ROLE_PERMITTED_ROUTES = {
  "/student": ["STUDENT", "ADMIN"],
  "/faculty": [
    "FACULTY_SUPERVISOR",
    "HOD",
    "DEAN",
    "INTERNSHIP_COORDINATOR",
    "ADMIN",
  ],
  "/employer": ["EMPLOYER_ADMIN", "ADMIN"],
  "/supervisor": ["INDUSTRY_SUPERVISOR", "ADMIN"],
  "/coordinator": ["INTERNSHIP_COORDINATOR", "HOD", "DEAN", "ADMIN"],
  "/admin": ["ADMIN"],
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const userRole = request.cookies.get("user_role")?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // 1. Direct URL access to any protected dashboard without a login token -> redirect to /login
  if (isProtectedRoute) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Role-based protection: if logged in as Student, prevent accessing /faculty, /admin, etc.
    if (userRole) {
      const matchedBase = PROTECTED_ROUTES.find((route) =>
        pathname.startsWith(route)
      );
      if (matchedBase) {
        const allowedRoles = ROLE_PERMITTED_ROUTES[matchedBase];
        if (allowedRoles && !allowedRoles.includes(userRole)) {
          let target = "/student";
          if (userRole === "FACULTY_SUPERVISOR") target = "/faculty";
          else if (userRole === "EMPLOYER_ADMIN") target = "/employer";
          else if (userRole === "INDUSTRY_SUPERVISOR") target = "/supervisor";
          else if (userRole === "INTERNSHIP_COORDINATOR") target = "/coordinator";
          else if (userRole === "ADMIN") target = "/admin";

          return NextResponse.redirect(new URL(target, request.url));
        }
      }
    }
  }

  // 3. If already authenticated and visits /login or /signup, direct them straight to their dashboard
  if ((pathname === "/login" || pathname === "/signup") && token && userRole) {
    let target = "/student";
    if (userRole === "FACULTY_SUPERVISOR") target = "/faculty";
    else if (userRole === "EMPLOYER_ADMIN") target = "/employer";
    else if (userRole === "INDUSTRY_SUPERVISOR") target = "/supervisor";
    else if (userRole === "INTERNSHIP_COORDINATOR") target = "/coordinator";
    else if (userRole === "ADMIN") target = "/admin";

    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/faculty/:path*",
    "/employer/:path*",
    "/supervisor/:path*",
    "/coordinator/:path*",
    "/admin/:path*",
    "/login",
    "/signup",
  ],
};

