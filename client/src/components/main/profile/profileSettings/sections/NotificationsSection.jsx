import Section from "../components/Section";
import { Bell } from "lucide-react";

function NotificationsSection() {
  return (
    <Section icon={Bell} title="Notifications">
      <label className="flex items-center gap-2 text-sm">
        <input type="radio" name="notify" defaultChecked />
        Enable notifications
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="radio" name="notify" />
        Disable notifications
      </label>
    </Section>
  );
}

export default NotificationsSection;