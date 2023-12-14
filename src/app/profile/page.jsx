import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import logo1 from "../public/assets/logo1.png"
import Image from "next/image";


const Profile = async () => {
  const { getUser, isAuthenticated, getPermissions, getPermission } =
    getKindeServerSession();
  const user = await getUser();
  const permissions = await getPermissions();
  const isCreate = await getPermission(process.env.create);
  const isDelete = await getPermission(process.env.delete);
  // const isAdmin = await getPermission("admin");
  // console.log("permissions:", permissions);
  // console.log("isCreate :", isCreate)
  // console.log("isDelete :", isDelete)
  // console.log("isAdmin :", isAdmin);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 bg-blue-800 text-white flex items-center justify-center">
        {(await isAuthenticated()) ? (
          <div className="text-center">
            <Image
              src={logo1}
              height={400}
              width={400}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto"
            />

            <h1 className="text-4xl font-bold mt-2">{user?.family_name}</h1>

            <p className="text-xl">{user?.email}</p>

            <div className="flex flex-col justify-center gap-6 mt-4">
              <Link
                href="/mark_attendance"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Mark Attendance
              </Link>

              <Link
                href="/viewAttendance"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                View Attendance
              </Link>
              
              <Link
                href="/biometricProcess"
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                Biometric 
              </Link>
              
              <Link
                href="/time_tracker"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Time Tracker
              </Link>
            </div>
          </div>
        ) : (
          <p>Please sign in or register!</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
