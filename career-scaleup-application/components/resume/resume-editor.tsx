"use client";

import { ResumeData, SectionId } from "@/app/types";
import { useState } from "react";
import {
  UserIcon,
  Workflow,
  GraduationCap,
  Folder,
  Palette,
  HeartHandshakeIcon,
  Code2,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import BasicsSection from "./sections/basic-section";
import ExperienceSection from "./sections/experience-section";
import EducationSection from "./sections/education-section";
import ProjectsSection from "./sections/projects-section";
import { IconAward, IconCertificate, IconLanguage } from "@tabler/icons-react";
import AddEntry from "./add-entry";
import AccordionHeader from "../accordion-header";
import AwardsSection from "./sections/awards-section";
import CertificationSection from "./sections/certification-section";
import VolunteeringSection from "./sections/volunteering-section";
import LanguagesSection from "./sections/languages-section";
import HobbiesSection from "./sections/hobbies-section";

export function ResumeEditor({ resumeData }: { resumeData: ResumeData }) {
  const [openAccordion, setOpenAccordion] = useState<string>("basics");
  const [isAddingEntry, setIsAddingEntry] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<SectionId>("basics");

  const [entryData, setEntryData] = useState(null);

  const handleAddClick = (section: SectionId) => {
    setCurrentSection(section);
    setIsAddingEntry(true);
    setEntryData(null);
  };

  const handleEditEntry = (sectionId: SectionId, entry: any) => {
    setCurrentSection(sectionId);
    setEntryData(entry);
    setIsAddingEntry(true);
  };

  return (
    <div className="h-[77vh] overflow-y-scroll scroll-smooth hide-scroll">
      {isAddingEntry && (
        <AddEntry
          sectionId={currentSection}
          setIsAddingEntry={setIsAddingEntry}
          entry={entryData}
          setEntry={setEntryData}
        />
      )}

      {!isAddingEntry && (
        <Accordion
          type="single"
          collapsible
          value={openAccordion}
          onValueChange={setOpenAccordion}
          className="w-full space-y-4"
        >
          <AccordionItem
            value="basics"
            className="border border-border rounded-xl bg-card shadow-custom-sm overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline transition-smooth">
              <AccordionHeader
                title="Contact Information"
                subtitle="Your personal and professional identity at a glance."
                icon={<UserIcon className="w-4 h-4 font-bold text-blue-600" />}
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4 px-6">
              <BasicsSection data={resumeData.basics} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="experience"
            className="border border-border rounded-xl bg-card shadow-custom-sm overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline transition-smooth">
              <AccordionHeader
                title="Experience"
                subtitle="Your professional journey and key responsibilities"
                icon={<Workflow className="w-4 h-4 font-bold text-blue-600" />}
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4 px-5 flex flex-col items-end">
              <ExperienceSection
                data={resumeData.experiences}
                setEntryData={handleEditEntry}
              />

              <Button
                size="sm"
                className="px-8 gap-2 bg-blue-600 hover:bg-blue-700 hover:text-primary-foreground mt-4 "
                onClick={() => handleAddClick("experiences")}
              >
                Add Entry
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="education"
            className="border border-border rounded-xl bg-card shadow-custom-sm overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline transition-smooth">
              <AccordionHeader
                title="Education"
                subtitle="Your academic background and qualifications."
                icon={
                  <GraduationCap className="w-4 h-4 font-bold text-blue-600" />
                }
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4 px-5 flex flex-col items-end">
              <EducationSection
                data={resumeData.educations}
                setEntryData={handleEditEntry}
              />
              <Button
                size="sm"
                className="px-8 gap-2 bg-blue-600 hover:bg-blue-700 hover:text-primary-foreground mt-4 "
                onClick={() => handleAddClick("educations")}
              >
                Add Entry
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="projects"
            className="border border-border rounded-xl bg-card shadow-custom-sm overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline transition-smooth">
              <AccordionHeader
                title="Projects"
                subtitle="Showcase of your hands-on work and impact."
                icon={<Folder className="w-4 h-4 font-bold text-blue-600" />}
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4 px-5 flex flex-col items-end">
              <ProjectsSection
                data={resumeData.projects}
                setEntryData={handleEditEntry}
              />

              <Button
                size="sm"
                className="px-8 gap-2 bg-blue-600 hover:bg-blue-700 hover:text-primary-foreground mt-4 "
                onClick={() => handleAddClick("projects")}
              >
                Add Entry
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="certifications"
            className="border border-border rounded-xl bg-card shadow-custom-sm overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline transition-smooth">
              <AccordionHeader
                title="Certifications"
                subtitle="Credentials that validate your expertise."
                icon={
                  <IconCertificate className="w-4 h-4 font-bold text-blue-600" />
                }
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4 px-5 flex flex-col items-end">
              <CertificationSection
                data={resumeData.certifications}
                setEntryData={handleEditEntry}
              />
              <Button
                size="sm"
                className="px-8 gap-2 bg-blue-600 hover:bg-blue-700 hover:text-primary-foreground mt-4 "
                onClick={() => handleAddClick("certifications")}
              >
                Add Entry
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="awards"
            className="border border-border rounded-xl bg-card shadow-custom-sm overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline transition-smooth">
              <AccordionHeader
                title="Awards"
                subtitle="Recognitions and honors earned for excellence."
                icon={<IconAward className="w-4 h-4 font-bold text-blue-600" />}
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4 px-5 flex flex-col items-end">
              <AwardsSection
                data={resumeData.awards}
                setEntryData={handleEditEntry}
              />
              <Button
                size="sm"
                className="px-8 gap-2 bg-blue-600 hover:bg-blue-700 hover:text-primary-foreground mt-4 "
                onClick={() => handleAddClick("awards")}
              >
                Add Entry
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="hobbies"
            className="border border-border rounded-xl bg-card shadow-custom-sm overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline transition-smooth">
              <AccordionHeader
                title="Hobbies"
                subtitle="A glimpse into your personality and interests."
                icon={<Palette className="w-4 h-4 text-blue-600" />}
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4 px-5 flex flex-col items-end">
              <HobbiesSection
                data={resumeData.hobbies}
                setEntryData={handleEditEntry}
              />
              <Button
                size="sm"
                className="px-8 gap-2 bg-blue-600 hover:bg-blue-700 hover:text-primary-foreground mt-4 "
                onClick={() => handleAddClick("hobbies")}
              >
                Add Entry
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="languages"
            className="border border-border rounded-xl bg-card shadow-custom-sm overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline transition-smooth">
              <AccordionHeader
                title="Languages"
                subtitle="Languages you speak and your proficiency levels"
                icon={
                  <IconLanguage className="w-4 h-4 font-bold text-blue-600" />
                }
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4 px-5 flex flex-col items-end">
              <LanguagesSection
                data={resumeData.languages}
                setEntryData={handleEditEntry}
              />
              <Button
                size="sm"
                className="px-8 gap-2 bg-blue-600 hover:bg-blue-700 hover:text-primary-foreground mt-4 "
                onClick={() => handleAddClick("languages")}
              >
                Add Entry
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="volunteering"
            className="border border-border rounded-xl bg-card shadow-custom-sm overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline transition-smooth">
              <AccordionHeader
                title="Volunteering"
                subtitle="Contributions beyond work — making a difference."
                icon={
                  <HeartHandshakeIcon className="w-4 h-4 font-bold text-blue-600" />
                }
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4 px-5 flex flex-col items-end">
              <VolunteeringSection
                data={resumeData.volunteerings}
                setEntryData={handleEditEntry}
              />
              <Button
                size="sm"
                className="px-8 gap-2 bg-blue-600 hover:bg-blue-700 hover:text-primary-foreground mt-4 "
                onClick={() => handleAddClick("volunteerings")}
              >
                Add Entry
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="skills"
            className="border border-border rounded-xl bg-card shadow-custom-sm overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline transition-smooth">
              <AccordionHeader
                title="Skills"
                subtitle="Your technical and professional competencies."
                icon={<Code2 className="w-4 h-4 font-bold text-blue-600" />}
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4 px-5 flex flex-col items-end">
              {/* <SkillsForm data={data} /> */}
              <Button
                size="sm"
                className="px-8 gap-2 bg-blue-600 hover:bg-blue-700 hover:text-primary-foreground mt-4 "
                onClick={() => handleAddClick("skills")}
              >
                Add Entry
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
