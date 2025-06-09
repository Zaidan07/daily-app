import Navbar from "@/components/Common/Navbar";
import { NotificationSetup } from "@/components/Common/NotificationSetup";
import UserPage from "@/components/User";

export default function UserPagePage() {
  return (
    <>
      <NotificationSetup />
      <Navbar />
      <UserPage />
    </>
  );
}
