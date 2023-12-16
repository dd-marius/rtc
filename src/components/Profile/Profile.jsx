import { ProfileSettings } from "@/components/Profile/ProfileSettings";
import { ProfileAddress } from "@/components/Profile/ProfileAddress";

export function Profile() {
  return (
    <div>
      <ProfileAddress />
      <ProfileSettings />
    </div>
  )
}