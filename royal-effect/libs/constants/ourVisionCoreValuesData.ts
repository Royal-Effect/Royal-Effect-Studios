import { Eye, ShieldCheck, Target, Workflow } from "lucide-react";
import { OurVisionCoreValueInterface } from "@/libs/interfaces/ourVisionCoreValue";

export const ourVisionCoreValuesData: OurVisionCoreValueInterface[] = [
  {
    id: "01",
    title: "Clarity",
    description:
      "Every brand decision should make the message easier to understand, not harder to decode.",
    icon: Eye,
  },
  {
    id: "02",
    title: "Precision",
    description:
      "We keep systems tight, measured, and deliberate so the final identity feels disciplined.",
    icon: Target,
  },
  {
    id: "03",
    title: "Trust",
    description:
      "A clear process and a single point of ownership create confidence from first call to final file.",
    icon: ShieldCheck,
  },
  {
    id: "04",
    title: "Momentum",
    description:
      "The brand should move cleanly through launch, growth, and every next stage without losing coherence.",
    icon: Workflow,
  },
];