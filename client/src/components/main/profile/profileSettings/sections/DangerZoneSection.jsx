import React from "react";
import Section from "../components/Section";
import { Trash2 } from "lucide-react";

function DangerZoneSection() {
  return (
    <Section icon={Trash2} title="Danger Zone">
      <button className="px-4 py-2 text-sm rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20">
        Delete Account
      </button>
    </Section>
  );
}


export default DangerZoneSection;