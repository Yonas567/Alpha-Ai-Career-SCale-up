import { CoverLetterDTO, CoverLetterPreview } from "../cover-letter-preview";
import { CoverLetterPDF } from "../template-pdfs/cover-letter-pdf";

export enum TemplateType {
  SIMPLE = "simple",
}

export interface CoverLeterProps {
  data: CoverLetterDTO;
}

export const TemplatePreview: Record<
  TemplateType,
  React.FC<CoverLeterProps>
> = {
  [TemplateType.SIMPLE]: CoverLetterPreview,
};

export const TemplatePdf: Record<TemplateType, React.FC<CoverLeterProps>> = {
  [TemplateType.SIMPLE]: CoverLetterPDF,
};
