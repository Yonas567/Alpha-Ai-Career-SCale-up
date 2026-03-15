import {
  IconDashboard,
  IconListDetails,
  IconChartBar,
  IconFolder,
  IconUsers,
  IconCamera,
  IconFileDescription,
  IconFileAi,
  IconSettings,
  IconHelp,
  IconSearch,
  IconDatabase,
  IconReport,
  IconFileWord,
} from "@tabler/icons-react";
import {
  Home,
  Search,
  Bookmark,
  Briefcase,
  Users,
  Calendar,
  Lightbulb,
  Settings,
  LogOut,
  LucideProps,
  Sparkles,
  FileText,
  MessageSquareIcon,
  User,
  UserSearchIcon,
  FileCheck,
  Chrome,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type Menu = {
  Seeker: MenuItem[];
  Recruiter: MenuItem[];
  Admin: MenuItem[];
};

export type MenuItem = {
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  href: string;
};

export const menu: Menu = {
  Seeker: [
    { name: "Home", icon: Home, href: "/dashboard/seeker" },
    {
      name: "AI Job Matches",
      icon: Search,
      href: "/dashboard/seeker/explore-jobs",
    },
    {
      name: "Resume",
      icon: FileText,
      href: "/dashboard/seeker/create-resume",
    },
    {
      name: "Cover Letter",
      icon: FileText,
      href: "/dashboard/seeker/cover-letter",
    },
    {
      name: "AI Interview",
      icon: Sparkles,
      href: "/dashboard/seeker/ai-interview",
    },
    { name: "Portfolio", icon: User, href: "/dashboard/seeker/profile" },
    {
      name: "Messages",
      icon: MessageSquareIcon,
      href: "/dashboard/seeker/messages",
    },
    {
      name: "Saved Jobs",
      icon: Bookmark,
      href: "/dashboard/seeker/saved-jobs",
    },

    { name: "Extension", icon: Chrome, href: "/#" },
  ],
  Recruiter: [
    { name: "Home", icon: Home, href: "/dashboard/recruiter" },
    { name: "My Jobs", icon: Briefcase, href: "/dashboard/recruiter/jobs" },
    {
      name: "Messages",
      icon: MessageSquareIcon,
      href: "/dashboard/recruiter/messages",
    },
    {
      name: "My Company",
      icon: Lightbulb,
      href: "/dashboard/recruiter/profile",
    },
  ],
  Admin: [
    { name: "Home", icon: Home, href: "/dashboard/admin" },
    {
      name: "Top Recruiters",
      icon: UserSearchIcon,
      href: "/dashboard/admin/top-recruiters",
    },

    {
      name: "ATS and AI Usage",
      icon: FileCheck,
      href: "/dashboard/admin/ats-usage",
    },
  ],
};

export const bottomMenu: MenuItem[] = [
  { name: "Settings", icon: Settings, href: "" },
  { name: "Logout", icon: LogOut, href: "#" },
];

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};
