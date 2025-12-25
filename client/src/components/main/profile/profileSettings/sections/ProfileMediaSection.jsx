import PropTypes from "prop-types";
import { Camera } from "lucide-react";
import Section from "../components/Section";

function ProfileMediaSection({ coverPreview, avatarPreview, handleImageChange }) {
  return (
    <Section icon={Camera} title="Profile Media">
      <div className="space-y-4">
        <div className="relative">
          <img
            src={coverPreview}
            alt="cover"
            className="w-full h-40 object-cover rounded-lg bg-gray-100 dark:bg-[#202020]"
          />
          <label className="absolute right-3 bottom-3 cursor-pointer px-3 py-1 text-sm rounded-lg
            bg-black/60 text-white">
            Change Cover
            <input hidden type="file" onChange={(e) => handleImageChange(e, "cover")} />
          </label>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={avatarPreview}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover bg-gray-100 dark:bg-[#202020]"
          />
          <label className="cursor-pointer px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-[#2a2a2a]">
            Change Avatar
            <input hidden type="file" onChange={(e) => handleImageChange(e, "avatar")} />
          </label>
        </div>
      </div>
    </Section>
  );
}

ProfileMediaSection.propTypes = {
  coverPreview: PropTypes.string.isRequired,
  avatarPreview: PropTypes.string.isRequired,
  handleImageChange: PropTypes.func.isRequired,
};

export default ProfileMediaSection;