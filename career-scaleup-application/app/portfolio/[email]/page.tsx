"use client";

import {
  Share2,
  Briefcase,
  Award,
  Code2,
  Github,
  Linkedin,
  Mail,
  Check,
  ExternalLink,
  Globe,
  Camera,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/app/types";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";

export default function PublicPortfolioPage() {
  const [copied, setCopied] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const email = params?.email ? decodeURIComponent(params.email as string) : "";

  // Dummy data for demo purposes
  const dummyUser: User = {
    id: "dummy-user-id",
    email: email || "yonasdeberu12@gmail.com",
    fullName: "Yonas Deberu",
    role: "Seeker" as any,
    profession: "Full Stack Developer",
    summary:
      "Passionate full-stack developer with expertise in modern web technologies. I specialize in building scalable applications using React, Next.js, Node.js, and TypeScript. With a strong focus on user experience and clean code, I deliver high-quality solutions that meet business objectives.",
    experience: "5",
    education:
      "Bachelor of Science in Computer Science\nAddis Ababa University\n2018 - 2022",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Python",
      "MongoDB",
    ],
    phoneNumber: "+251 912 345 678",
    website: "https://yonasportfolio.com",
    profilePicture: null,
    bio: null,
    industry: "Technology",
    companyName: null,
    companyDescription: null,
    logoUrl: null,
    location: "Addis Ababa, Ethiopia",
    projects: [],
    experiences: [],
    testimonials: [],
    createdAt: new Date(),
  };

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["publicProfile", email],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `/api/profile/${encodeURIComponent(email)}`
        );
        return response.data as User;
      } catch (err) {
        // If API fails, return dummy data for demo
        console.log("API failed, using dummy data for demo");
        return dummyUser;
      }
    },
    enabled: !!email,
    retry: false, // Don't retry, just use dummy data
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate it's an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };

  // Clean up preview URL when component unmounts or previewImage changes
  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const profileURL = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    if (!profileURL) return;

    // Try Web Share API first (better UX on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${displayUser?.fullName || "Portfolio"} - CarrierScaleUp`,
          text: `Check out ${
            displayUser?.fullName || "this"
          } portfolio on CarrierScaleUp`,
          url: profileURL,
        });
        return; // Share API handles the UI, no need to show copied state
      } catch (err: any) {
        // User cancelled or share failed, fall through to copy
        if (err.name === "AbortError") {
          return; // User cancelled, don't copy
        }
      }
    }

    // Fallback to clipboard copy
    try {
      await navigator.clipboard.writeText(profileURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      // Fallback: select text in a temporary input
      const textArea = document.createElement("textarea");
      textArea.value = profileURL;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand("copy");
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } catch (fallbackErr) {
        console.error("Fallback copy failed:", fallbackErr);
        alert(`Please copy this link manually: ${profileURL}`);
      }
      document.body.removeChild(textArea);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  // Use dummy data if API fails or user is not loaded
  const displayUser = user || dummyUser;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10">
      {/* Header Navigation */}
      <header className="border-b border-primary/10 bg-gradient-to-r from-background/90 via-primary/5 to-background/90 backdrop-blur-xl sticky top-0 z-50 shadow-glow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4d32fb] to-[#6b4fff] rounded-lg flex items-center justify-center shadow-glow-sm">
              <span className="text-white font-bold text-sm">CS</span>
            </div>
            <span className="font-semibold text-foreground">
              CarrierScaleUp
            </span>
          </div>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4d32fb] via-[#6b4fff] to-[#8a6cff] text-white rounded-lg hover:from-[#6b4fff] hover:via-[#8a6cff] hover:to-[#a88aff] transition-all shadow-glow-sm hover:shadow-glow"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5" />
                <span>Share Profile</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-card/80 via-primary/10 to-primary/5 dark:from-card/60 dark:via-primary/15 dark:to-primary/10 backdrop-blur-xl border border-primary/15 rounded-2xl p-8 shadow-glow-sm">
                <div className="relative group mb-6">
                  {previewImage || displayUser?.profilePicture ? (
                    <div
                      className="relative w-24 h-24 rounded-2xl overflow-hidden cursor-pointer shadow-glow"
                      onClick={handleImageClick}
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt={displayUser?.fullName || "Profile"}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : (
                        <Image
                          src={
                            displayUser?.profilePicture || "/placeholder.svg"
                          }
                          alt={displayUser?.fullName || "Profile"}
                          fill
                          className="object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-24 h-24 bg-gradient-to-br from-[#4d32fb] via-[#6b4fff] to-[#8a6cff] rounded-2xl flex items-center justify-center shadow-glow cursor-pointer hover:shadow-glow-sm transition-all relative group"
                      onClick={handleImageClick}
                    >
                      <span className="text-white text-4xl font-bold">
                        {displayUser?.fullName?.charAt(0) || "SC"}
                      </span>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-1">
                  Sarah Chen
                </h1>
                <p className="bg-gradient-to-r from-[#4d32fb] via-[#6b4fff] to-[#8a6cff] bg-clip-text text-transparent font-semibold mb-4">
                  Full Stack Developer
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Crafting scalable digital solutions with modern tech stack and
                  user-centric design.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-3 border border-primary/10">
                    <p className="text-2xl font-bold bg-gradient-to-r from-[#4d32fb] via-[#6b4fff] to-[#8a6cff] bg-clip-text text-transparent">
                      8+
                    </p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-3 border border-primary/10">
                    <p className="text-2xl font-bold bg-gradient-to-r from-[#4d32fb] via-[#6b4fff] to-[#8a6cff] bg-clip-text text-transparent">
                      5y
                    </p>
                    <p className="text-xs text-muted-foreground">Experience</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
                      Core Skills
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "TypeScript",
                      "Next.js",
                      "Node.js",
                      "PostgreSQL",
                      "Tailwind",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gradient-to-r from-[#4d32fb]/20 to-[#6b4fff]/15 border border-primary/15 text-primary text-xs rounded-full font-medium hover:from-[#4d32fb]/30 hover:to-[#6b4fff]/25 transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href={displayUser?.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/15 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-gradient-to-br hover:from-primary/20 hover:to-primary/10 transition-all shadow-sm hover:shadow-glow-sm"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/15 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-gradient-to-br hover:from-primary/20 hover:to-primary/10 transition-all shadow-sm hover:shadow-glow-sm"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${displayUser?.email || ""}`}
                  className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/15 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-gradient-to-br hover:from-primary/20 hover:to-primary/10 transition-all shadow-sm hover:shadow-glow-sm"
                >
                  <Mail className="w-5 h-5" />
                </a>
                {displayUser?.website && (
                  <a
                    href={displayUser.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/15 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-gradient-to-br hover:from-primary/20 hover:to-primary/10 transition-all shadow-sm hover:shadow-glow-sm"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="md:col-span-2 space-y-12">
            {/* About Section */}
            <section className="bg-gradient-to-br from-card/60 via-primary/5 to-transparent dark:from-card/40 dark:via-primary/10 backdrop-blur-xl border border-primary/10 rounded-xl p-6 shadow-glow-sm">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-6 flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4d32fb] to-[#6b4fff] flex items-center justify-center shadow-glow-sm">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                About Me
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm a passionate full-stack developer with 5+ years of
                experience building high-performance web applications. I
                specialize in creating scalable solutions that combine elegant
                user interfaces with robust backend architecture.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My journey in tech began with a love for problem-solving, and
                I've since contributed to projects spanning fintech, e-commerce,
                SaaS, and real-time applications. I'm committed to writing
                clean, maintainable code and staying updated with emerging
                technologies.
              </p>
            </section>

            {/* Experience Section */}
            <section className="bg-gradient-to-br from-card/60 via-primary/5 to-transparent dark:from-card/40 dark:via-primary/10 backdrop-blur-xl border border-primary/10 rounded-xl p-6 shadow-glow-sm">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-6 flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4d32fb] to-[#6b4fff] flex items-center justify-center shadow-glow-sm">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                Experience
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Senior Developer",
                    company: "Tech Innovations Inc",
                    period: "2022 - Present",
                    description:
                      "Led frontend architecture for 3 major products, mentored junior developers, and improved performance by 40%.",
                  },
                  {
                    title: "Full Stack Developer",
                    company: "Digital Solutions Co",
                    period: "2020 - 2022",
                    description:
                      "Developed and maintained 5+ production applications using React and Node.js. Implemented CI/CD pipelines and improved deployment speed.",
                  },
                  {
                    title: "Junior Developer",
                    company: "StartUp Labs",
                    period: "2019 - 2020",
                    description:
                      "Built customer-facing features and fixed bugs. Participated in code reviews and contributed to system design discussions.",
                  },
                ].map((job, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-gradient-to-b from-[#4d32fb] to-[#6b4fff] pl-6 py-2 bg-gradient-to-r from-primary/5 to-transparent rounded-r-lg"
                  >
                    <h3 className="font-bold text-lg text-foreground">
                      {job.title}
                    </h3>
                    <p className="bg-gradient-to-r from-[#4d32fb] via-[#6b4fff] to-[#8a6cff] bg-clip-text text-transparent text-sm font-semibold mb-1">
                      {job.company}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      {job.period}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <section className="bg-gradient-to-br from-card/60 via-primary/5 to-transparent dark:from-card/40 dark:via-primary/10 backdrop-blur-xl border border-primary/10 rounded-xl p-6 shadow-glow-sm">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-6 flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4d32fb] to-[#6b4fff] flex items-center justify-center shadow-glow-sm">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                Featured Projects
              </h2>
              <div className="grid gap-6">
                {[
                  {
                    title: "Analytics Dashboard",
                    description:
                      "Real-time analytics platform with live data visualization, custom reporting, and user management.",
                    tags: ["React", "TypeScript", "Chart.js", "PostgreSQL"],
                    link: "#",
                  },
                  {
                    title: "E-Commerce Platform",
                    description:
                      "Full-stack e-commerce solution featuring product catalog, cart management, payment integration, and admin panel.",
                    tags: ["Next.js", "Stripe", "Prisma", "Tailwind CSS"],
                    link: "#",
                  },
                  {
                    title: "Task Management App",
                    description:
                      "Collaborative task management tool with real-time updates, team permissions, and API-first architecture.",
                    tags: ["Next.js", "WebSocket", "MongoDB", "Node.js"],
                    link: "#",
                  },
                ].map((project, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-card/70 via-primary/10 to-primary/5 dark:from-card/50 dark:via-primary/15 dark:to-primary/10 backdrop-blur-md border border-primary/15 rounded-xl p-6 hover:border-primary/50 hover:shadow-glow transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-foreground">
                        {project.title}
                      </h3>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-background text-primary text-xs rounded font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials Section */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Award className="w-7 h-7 text-primary" />
                Testimonials
              </h2>
              <div className="grid gap-4">
                {[
                  {
                    quote:
                      "Sarah's technical expertise and attention to detail transformed our product. Highly recommended!",
                    author: "John Smith",
                    role: "CTO at Tech Corp",
                  },
                  {
                    quote:
                      "Exceptional developer. She delivered complex features on time and was great to work with.",
                    author: "Emma Wilson",
                    role: "Product Manager",
                  },
                ].map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-primary/10 rounded-lg p-4"
                  >
                    <p className="text-muted-foreground italic mb-3">
                      "{testimonial.quote}"
                    </p>
                    <p className="font-semibold text-foreground text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-primary text-xs">{testimonial.role}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/10 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Interested in collaborating?
              </h3>
              <p className="text-muted-foreground mb-6">
                Let's discuss your next project and how I can help bring your
                ideas to life.
              </p>
              <a
                href={`mailto:${displayUser?.email || ""}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all font-semibold shadow-lg shadow-primary/20"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </a>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/10 bg-background/50 mt-20">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          <p>
            © 2025 CarrierScaleUp. Built with ❤️ by professionals, for
            professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}
