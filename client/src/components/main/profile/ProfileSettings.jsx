import React, { useContext, useState } from "react";
import {
  User,
  Camera,
  MapPin,
  Shield,
  Bell,
  Trash2,
  Lock,
  X,
} from "lucide-react";
import AuthContext from "../../../context/AuthContext";
import PropTypes from "prop-types";


function Section({ icon: Icon, title, children }) {
  return (
    <div className="bg-white dark:bg-[#191919] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-orange-500 dark:text-[#07C5B9]" />
        <h2 className="font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        {...props}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#111] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-[#07C5B9]"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-500">{label}</label>
      <textarea
        {...props}
        rows={4}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#2a2a2a]
        bg-white dark:bg-[#111] text-gray-900 dark:text-white resize-none
        focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-[#07C5B9]"
      />
    </div>
  );
}

function ChipInput({ label, values, setValues, placeholder }) {
  const [input, setInput] = useState("");

  const addChip = () => {
    const val = input.trim();
    if (!val) return;

    const exists = values.some(
      (v) => v.toLowerCase() === val.toLowerCase()
    );
    if (exists) return;

    setValues([...values, val]);
    setInput("");
  };

  const removeChip = (index) => {
    setValues(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500">{label}</p>

      <div className="flex flex-wrap gap-2">
        {values?.map((v, i) => (
          <button
            key={i * 0.25487}
            onClick={() => removeChip(i)}
            className="flex items-center gap-1 px-2 py-1 text-xs rounded-full cursor-pointer bg-orange-100 dark:bg-[#07C5B9]/20 text-orange-600 dark:text-[#07C5B9] group"
          >
            {v} <X size={16} className="group-hover:text-red-500" />
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-full min-w-0 px-3 py-2 rounded-lg border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#111] focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-[#07C5B9]"
        />

        <button
          onClick={addChip}
          className="w-full sm:w-auto px-4 py-2 rounded-lg
                     bg-orange-500 dark:bg-[#07C5B9]
                     text-white text-sm font-medium
                     hover:opacity-90"
        >
          Add
        </button>
      </div>
    </div>
  );
}

 
export default function ProfileSettings({ user }) {

  const [form, setForm] = useState({
    firstName: user?.profile?.firstName || "",
    lastName: user?.profile?.lastName || "",
    bio: user?.profile?.bio || "",
    location: user?.profile?.location || "",
    website: user?.profile?.website || "",
    credentials: user?.credentials || [],
    knowsAbout: user?.knowsAbout || [],
  });

  const [avatarPreview, setAvatarPreview] = useState(
    user?.profile?.profilePicture
  );
  const [coverPreview, setCoverPreview] = useState(
    user?.profile?.coverPicture
  );

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    type === "avatar" ? setAvatarPreview(url) : setCoverPreview(url);
  };

  const handleSave = () => {
    console.log("Saving profile settings:", form);
    // API call here
  };

  return (
    <div id="profile_settings" className="max-w-5xl mx-auto space-y-4 mt-4 md:mt-0">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-sm text-gray-500">
          Update your personal and professional details
        </p>
      </div>

      {/* COVER */}
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

      {/* BASIC INFO */}
      <Section icon={User} title="Basic Information">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <Input
            label="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        <Textarea
          label="Bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <Input
            label="Website"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
        </div>
      </Section>

      {/* PROFESSIONAL */}
      <Section icon={MapPin} title="Professional Details">
        <ChipInput
          label="Credentials"
          values={form.credentials}
          setValues={(v) => setForm({ ...form, credentials: v })}
          placeholder="e.g. MERN Developer"
        />

        <ChipInput
          label="Knows About"
          values={form.knowsAbout}
          setValues={(v) => setForm({ ...form, knowsAbout: v })}
          placeholder="e.g. JavaScript"
        />
      </Section>

      {/* NOTIFICATIONS */}
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

      {/* SECURITY */}
      <Section icon={Shield} title="Privacy & Security">
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-[#2a2a2a] hover:opacity-80 border border-gray-300 dark:border-[#5c5c5c]">
            Update Email
          </button>
          <button className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-[#2a2a2a] hover:opacity-80 border border-gray-300 dark:border-[#5c5c5c]">
            Update Password
          </button>
        </div>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <Lock className="w-3 h-3" />
          Username & verification cannot be changed here
        </p>
      </Section>

      {/* SAVE */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-orange-500 dark:bg-[#07C5B9] text-white font-medium hover:opacity-80"
        >
          Save Changes
        </button>
      </div>

      <Section icon={Trash2} title="Danger Zone">
        <button className="px-4 py-2 text-sm rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20">
          Delete Account
        </button>
      </Section>
    </div>
  );
}

ProfileSettings.propTypes = {
    user: PropTypes.object.isRequired,
};