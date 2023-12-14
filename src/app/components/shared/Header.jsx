import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Header = async () => {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const isAdmin = await getPermission("admin");
  const shouldDisplayAdminLink = (await isAuthenticated()) && isAdmin.isGranted;
  const isAuthenticatedUser = await isAuthenticated();

  return (
    <header className=" flex justify-center items-center flex-wrap gap-4 sticky top-0 z-50 bg-blue-500 text-white p-2 md:p-4 backdrop-filter backdrop-blur-xl">
      {" "}
      {/* Sticky and Blur */}
      <nav className="flex  justify-center items-center flex-wrap gap-4">
        {" "}
        {/* Responsive Nav */}
        {/* Home Link */}
        <Link href={"/"}>
          <h1 className="hover:text-blue-700 hover:font-extrabold">Home</h1>
        </Link>
        {/* Admin Link - Display only for authenticated users with admin permissions */}
        {shouldDisplayAdminLink && (
          <Link href={"/admin"}>
            <h1 className="hover:text-blue-700 hover:font-extrabold">Admin</h1>
          </Link>
        )}
        {/* Profile Link - Display only for authenticated users (both regular user and admin) */}
        {isAuthenticatedUser && (
          <Link href={"/profile"}>
            <h1 className="hover:text-blue-700 hover:font-extrabold">
              Profile
            </h1>
          </Link>
        )}
        {/* Mark Attendance */}
        {isAuthenticatedUser && (
          <Link href={"/mark_attendance"}>
            <h1 className="hover:text-blue-700 hover:font-extrabold">
              Mark Attendance
            </h1>
          </Link>
        )}
        {/* View Attendance */}
        {isAuthenticatedUser && (
          <Link href={"/viewAttendance"}>
            <h1 className="hover:text-blue-700 hover:font-extrabold">
              View Attendance
            </h1>
          </Link>
        )}
        {/* Biometric */}
        {isAuthenticatedUser && (
          <Link href={"/biometricProcess"}>
            <h1 className="hover:text-blue-700 hover:font-extrabold">
              Biometric
            </h1>
          </Link>
        )}
        {/* time tracker */}
        {isAuthenticatedUser && (
          <Link href={"/time_tracker"}>
            <h1 className="hover:text-blue-700 hover:font-extrabold">
              Time Tracking
            </h1>
          </Link>
        )}
        {/* Authentication Links */}
        <div className="flex items-center gap-5">
          {isAuthenticatedUser ? (
            <LogoutLink className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
              Log out
            </LogoutLink>
          ) : (
            <>
              <LoginLink
                orgCode="org_1cf593178b8"
                className="hover:text-blue-700 hover:font-bold"
              >
                Log in
              </LoginLink>
              <RegisterLink
                orgCode="org_1cf593178b8"
                className="hover:text-blue-700 hover:font-bold"
              >
                Sign up
              </RegisterLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
