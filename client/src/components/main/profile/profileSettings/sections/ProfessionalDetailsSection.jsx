import PropTypes from "prop-types";
import { MapPin } from "lucide-react";
import ChipInput from "../components/ChipInput";
import Section from "../components/Section";

function ProfessionalDetailsSection({ form, setForm }) {
  return (
    <Section icon={MapPin} title="Professional Details">
      <ChipInput
        label="Credentials"
        values={form.credentials}
        name="credentials"
        setValues={(v) => setForm({ ...form, credentials: v })}
        placeholder="e.g. MERN Developer"
      />

      <ChipInput
        label="Knows About"
        values={form.knowsAbout}
        name="knowsAbout"
        setValues={(v) => setForm({ ...form, knowsAbout: v })}
        placeholder="e.g. JavaScript"
      />
    </Section>
  );
}

ProfessionalDetailsSection.propTypes = {
  form: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
};

export default ProfessionalDetailsSection;