import PropTypes from "prop-types";
import { Shield, Lock } from "lucide-react";
import Section from "../components/Section";

function PrivacySecuritySection({ setIsUpdatingEmail, setIsUpdatingPassword }) {
  return (
    <Section icon={Shield} title="Privacy & Security">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setIsUpdatingEmail(true)}
          className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-[#2a2a2a] hover:opacity-80 border border-gray-300 dark:border-[#5c5c5c] transition-all hover:scale-[1.02]"
        >
          Update Email
        </button>
        <button
          onClick={() => setIsUpdatingPassword(true)}
          className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-[#2a2a2a] hover:opacity-80 border border-gray-300 dark:border-[#5c5c5c] transition-all hover:scale-[1.02]"
        >
          Update Password
        </button>
      </div>
      <p className="text-xs text-gray-500 flex items-center gap-1 mt-3">
        <Lock className="w-3 h-3" />
        Username & verification cannot be changed here
      </p>
    </Section>
  );
}

PrivacySecuritySection.propTypes = {
  setIsUpdatingEmail: PropTypes.func.isRequired,
  setIsUpdatingPassword: PropTypes.func.isRequired,
};

export default PrivacySecuritySection;