import { ResumeData } from "@/app/types";
import ReziCompact from "./compact";
import { MOCK_TEMPLATE_DATA } from "./constants";
import ReziClassic from "./classic";
import ReziProfessional from "./professional";
import ReziModern from "./modern";
import { ClassicPDF } from "../react-pdf-templates/classic-pdf";
import { TemplateType } from "./types";
import Classic from "./classic";
import Modern from "./modern";
import Compact from "./compact";
import ModernPDF from "../react-pdf-templates/modern-pdf";
import { CompactPDF } from "../react-pdf-templates/compact-pdf";

export const templates = [
  {
    name: "Modern",
    templateId: TemplateType.MODERN,
    description: "Clean layout with a blue accent.",
    component: <ReziModern resumeData={MOCK_TEMPLATE_DATA} />,
  },
  {
    name: "Classic",
    templateId: TemplateType.SIMPLE,
    description: "Clean layout with a blue accent.",
    component: <ReziClassic resumeData={MOCK_TEMPLATE_DATA} />,
  },
  {
    name: "Creative Edge",
    templateId: TemplateType.CREATIVE,
    description: "Stylish layout with modern typography.",
    component: <ReziCompact resumeData={MOCK_TEMPLATE_DATA} />,
  },
  {
    name: "Classic",
    templateId: TemplateType.SIMPLE,
    description: "Traditional design with balanced sections.",
    component: <ReziProfessional resumeData={MOCK_TEMPLATE_DATA} />,
  },
];

interface Props {
  resumeData: ResumeData;
}

export const TemplatePreview: Record<TemplateType, React.FC<Props>> = {
  [TemplateType.SIMPLE]: Classic,
  [TemplateType.MODERN]: Modern,
  [TemplateType.CREATIVE]: Compact,
};

export const TemplateComponents: Record<TemplateType, React.FC<Props>> = {
  [TemplateType.SIMPLE]: ClassicPDF,
  [TemplateType.MODERN]: ModernPDF,
  [TemplateType.CREATIVE]: CompactPDF,
};
