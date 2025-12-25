import PropTypes from "prop-types";
import { User } from "lucide-react";
import Input from "../components/Input";
import Section from "../components/Section";
import Textarea from "../components/Textarea";

function BasicInfoSection({ form, setForm }) {
  return (
    <Section icon={User} title="Basic Information">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={form?.firstName}
          name="firstName"
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <Input
          label="Last Name"
          value={form?.lastName}
          name="lastName"
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
      </div>

      <Textarea
        label="Bio"
        value={form.bio}
        name="bio"
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Location"
          value={form.location}
          name="location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <Input
          label="Website"
          value={form.website}
          name="website"
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />
      </div>
    </Section>
  );
}

BasicInfoSection.propTypes = {
  form: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
};

export default BasicInfoSection;