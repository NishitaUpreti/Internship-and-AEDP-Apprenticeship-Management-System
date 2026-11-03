import { NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/student",
  "/faculty",
  "/employer",
  "/supervisor",
  "/coordinator",
  "/hod",
  "/dean",
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
  "/hod": ["HOD", "DEAN", "ADMIN"],
  "/dean": ["DEAN", "ADMIN"],
  "/admin": ["ADMIN"],
};

function getTargetRouteForRole(userRole) {
  if (userRole === "FACULTY_SUPERVISOR") return "/faculty";
  if (userRole === "EMPLOYER_ADMIN") return "/employer";
  if (userRole === "INDUSTRY_SUPERVISOR") return "/supervisor";
  if (userRole === "INTERNSHIP_COORDINATOR") return "/coordinator";
  if (userRole === "HOD") return "/hod";
  if (userRole === "DEAN") return "/dean";
  if (userRole === "ADMIN") return "/admin";
  return "/student";
}

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

    // 2. Role-based protection: check if logged-in role has permission for this route
    if (userRole) {
      const matchedBase = PROTECTED_ROUTES.find((route) =>
        pathname.startsWith(route)
      );
      if (matchedBase) {
        const allowedRoles = ROLE_PERMITTED_ROUTES[matchedBase];
        if (allowedRoles && !allowedRoles.includes(userRole)) {
          const target = getTargetRouteForRole(userRole);
          return NextResponse.redirect(new URL(target, request.url));
        }
      }
    }
  }

  // 3. If already authenticated and visits /login or /signup, direct them straight to their dashboard
  if ((pathname === "/login" || pathname === "/signup") && token && userRole) {
    const target = getTargetRouteForRole(userRole);
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
    "/hod/:path*",
    "/dean/:path*",
    "/admin/:path*",
    "/login",
    "/signup",
  ],
};
