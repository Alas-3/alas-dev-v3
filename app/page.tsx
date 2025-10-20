"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Briefcase,
  FolderGit2,
  Award,
  ExternalLink,
  Linkedin,
  Github,
  Mail,
  FileText,
} from "lucide-react";

type Section = "home" | "work" | "credentials" | "projects";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-1px 0px 0px 0px",
      }
    );

    if (mobileNavRef.current) {
      observer.observe(mobileNavRef.current);
    }

    return () => {
      if (mobileNavRef.current) {
        observer.unobserve(mobileNavRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;

    setTimeout(() => {
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  }, [activeSection]);

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex items-center">
      <div
        className={`md:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border/50 transition-transform duration-300 ${
          isScrolled ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex gap-2 justify-center p-3">
          <Button
            variant={activeSection === "home" ? "default" : "ghost"}
            size="icon"
            className={`h-12 w-12 rounded-xl ${
              activeSection === "home"
                ? ""
                : "hover:bg-transparent hover:border-2 hover:border-primary/50"
            }`}
            onClick={() => handleSectionChange("home")}
          >
            <Home className="h-6 w-6" />
          </Button>
          <Button
            variant={activeSection === "work" ? "default" : "ghost"}
            size="icon"
            className={`h-12 w-12 rounded-xl ${
              activeSection === "work"
                ? ""
                : "hover:bg-transparent hover:border-2 hover:border-primary/50"
            }`}
            onClick={() => handleSectionChange("work")}
          >
            <Briefcase className="h-6 w-6" />
          </Button>
          <Button
            variant={activeSection === "credentials" ? "default" : "ghost"}
            size="icon"
            className={`h-12 w-12 rounded-xl ${
              activeSection === "credentials"
                ? ""
                : "hover:bg-transparent hover:border-2 hover:border-primary/50"
            }`}
            onClick={() => handleSectionChange("credentials")}
          >
            <Award className="h-6 w-6" />
          </Button>
          <Button
            variant={activeSection === "projects" ? "default" : "ghost"}
            size="icon"
            className={`h-12 w-12 rounded-xl ${
              activeSection === "projects"
                ? ""
                : "hover:bg-transparent hover:border-2 hover:border-primary/50"
            }`}
            onClick={() => handleSectionChange("projects")}
          >
            <FolderGit2 className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <Card className="md:col-span-2 p-6 flex items-center justify-center glass-card glass-highlight">
            <div className="text-6xl font-bold text-foreground rounded-full w-28 h-28 flex items-center justify-center bg-primary/10 border-2 border-primary/20">
              <Image
                src="/images/herologo.png"
                alt="Ace Labador"
                width={100}
                height={100}
              />
            </div>
          </Card>

          <Card className="md:col-span-8 p-6 md:p-8 flex flex-col justify-center glass-card glass-highlight depth-panel">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight text-center md:text-left gradient-text">
              Ace Labador
            </h1>
            <p className="text-lg md:text-xl mt-[-2rem] text-center md:text-left gradient-text-muted">
              Software Engineer
            </p>
          </Card>

          <Card className="md:col-span-2 p-4 glass-card glass-highlight   flex items-center justify-center">
            <div className="flex md:grid md:grid-cols-2 gap-3">
              <a
                href="https://www.linkedin.com/in/alasdev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <Linkedin className="h-6 w-6 text-primary" />
              </a>
              <a
                href="https://github.com/Alas-3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <Github className="h-6 w-6 text-primary" />
              </a>
              <a
                href="mailto:alas.dev@outlook.com"
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <Mail className="h-6 w-6 text-primary" />
              </a>
              <button
                onClick={() =>
                  window.open(
                    "/Work Resume-Labador, Christopher Ace.pdf",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <FileText className="h-6 w-6 text-primary" />
              </button>
            </div>
          </Card>

          <Card
            ref={mobileNavRef}
            className="md:hidden col-span-1 p-4 glass-card glass-highlight  "
          >
            <div className="flex gap-3 justify-center">
              <Button
                variant={activeSection === "home" ? "default" : "ghost"}
                size="icon"
                className={`h-12 w-12 rounded-xl ${
                  activeSection === "home"
                    ? ""
                    : "hover:bg-transparent hover:border-2 hover:border-primary/50"
                }`}
                onClick={() => handleSectionChange("home")}
              >
                <Home className="h-6 w-6" />
              </Button>
              <Button
                variant={activeSection === "work" ? "default" : "ghost"}
                size="icon"
                className={`h-12 w-12 rounded-xl ${
                  activeSection === "work"
                    ? ""
                    : "hover:bg-transparent hover:border-2 hover:border-primary/50"
                }`}
                onClick={() => handleSectionChange("work")}
              >
                <Briefcase className="h-6 w-6" />
              </Button>
              <Button
                variant={activeSection === "credentials" ? "default" : "ghost"}
                size="icon"
                className={`h-12 w-12 rounded-xl ${
                  activeSection === "credentials"
                    ? ""
                    : "hover:bg-transparent hover:border-2 hover:border-primary/50"
                }`}
                onClick={() => handleSectionChange("credentials")}
              >
                <Award className="h-6 w-6" />
              </Button>
              <Button
                variant={activeSection === "projects" ? "default" : "ghost"}
                size="icon"
                className={`h-12 w-12 rounded-xl ${
                  activeSection === "projects"
                    ? ""
                    : "hover:bg-transparent hover:border-2 hover:border-primary/50"
                }`}
                onClick={() => handleSectionChange("projects")}
              >
                <FolderGit2 className="h-6 w-6" />
              </Button>
            </div>
          </Card>

          <div className="col-span-1 md:col-span-10 md:h-[700px] grid grid-cols-1 md:grid-cols-10 gap-4 md:gap-6">
            {activeSection === "home" && <HomeContent />}
            {activeSection === "work" && <WorkContent />}
            {activeSection === "credentials" && <CredentialsContent />}
            {activeSection === "projects" && <ProjectsContent />}
          </div>

          <Card className="hidden md:flex md:col-span-2 p-4 flex-col gap-3 justify-center items-center glass-card glass-highlight  ">
            <Button
              variant={activeSection === "home" ? "default" : "ghost"}
              size="icon"
              className={`h-14 w-14 rounded-2xl ${
                activeSection === "home"
                  ? ""
                  : "hover:bg-transparent hover:border-2 hover:border-primary/50 hover:text-primary"
              }`}
              onClick={() => setActiveSection("home")}
            >
              <Home className="h-6 w-6" />
            </Button>
            <Button
              variant={activeSection === "work" ? "default" : "ghost"}
              size="icon"
              className={`h-14 w-14 rounded-2xl ${
                activeSection === "work"
                  ? ""
                  : "hover:bg-transparent hover:border-2 hover:border-primary/50 hover:text-primary"
              }`}
              onClick={() => setActiveSection("work")}
            >
              <Briefcase className="h-6 w-6" />
            </Button>
            <Button
              variant={activeSection === "credentials" ? "default" : "ghost"}
              size="icon"
              className={`h-14 w-14 rounded-2xl ${
                activeSection === "credentials"
                  ? ""
                  : "hover:bg-transparent hover:border-2 hover:border-primary/50 hover:text-primary"
              }`}
              onClick={() => setActiveSection("credentials")}
            >
              <Award className="h-6 w-6" />
            </Button>
            <Button
              variant={activeSection === "projects" ? "default" : "ghost"}
              size="icon"
              className={`h-14 w-14 rounded-2xl ${
                activeSection === "projects"
                  ? ""
                  : "hover:bg-transparent hover:border-2 hover:border-primary/50 hover:text-primary"
              }`}
              onClick={() => setActiveSection("projects")}
            >
              <FolderGit2 className="h-6 w-6" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function HomeContent() {
  return (
    <>
      <Card className="col-span-1 md:col-span-5 p-6 md:p-8 glass-card glass-highlight  ">
        <div className="space-y-6">
          <div>
            <div className="h-1 w-24 bg-primary rounded-full mb-6" />
            <h2 className="text-2xl font-bold mb-4">About</h2>
          </div>

          <p className="text-muted-foreground leading-relaxed text-pretty">
            A software engineer with over three years of experience in web
            development. I hold multiple certificates from leading tech
            organizations such as IBM, Google, Meta, Amazon, GitHub, and others.
          </p>

          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() =>
              window.open(
                "/Work Resume-Labador, Christopher Ace.pdf",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            View Resume
          </Button>
        </div>
      </Card>

      <Card className="hidden md:flex col-span-1 md:col-span-5 p-6 md:p-8 glass-card glass-highlight  ">
        <div className="w-full">
          <h3 className="text-2xl font-bold mb-6">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Vite",
              "Tailwind",
              "Redux",
              "Node.js",
              "Express",
              "PHP",
              "Python",
              "MySQL",
              "NoSQL",
              "PostgreSQL",
              "Supabase",
              "Firebase",
              "MongoDB",
              "Axios",
            ].map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <Card className="md:flex col-span-1 md:col-span-3 p-6 md:p-8 glass-card glass-highlight   flex-col justify-center">
        <div className="flex flex-row md:flex-col justify-between items-center gap-0 md:gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">3+</div>
            <div className="text-muted-foreground text-xs md:text-sm">
              Years in Web Development
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">700+</div>
            <div className="text-muted-foreground text-xs md:text-sm">
              Commits & Contributions
            </div>
          </div>
        </div>
      </Card>

      <Card className="md:hidden col-span-1 p-6 glass-card glass-highlight  ">
        <h3 className="text-2xl font-bold mb-6">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Vite",
            "Tailwind",
            "Redux",
            "Node.js",
            "PHP",
            "Express",
            "Python",
            "MySQL",
            "NoSQL",
            "PostgreSQL",
            "Supabase",
            "Firebase",
            "MongoDB",
            "Axios",
          ].map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="col-span-1 md:col-span-7 p-6 md:p-8 glass-card glass-highlight  ">
        <h3 className="text-2xl font-bold mb-4">What I Do</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg mb-2 text-foreground">
              Frontend Development
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building responsive, mobile-first, and user-centric interfaces
              with modern frameworks.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2 text-foreground">
              Backend Development
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Designing scalable APIs, database architectures, and server-side
              logic for robust applications.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2 text-foreground">
              UI/UX Design
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Designing thoughtful, user-focused experiences that blend clarity,
              usability, and visual harmony.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2 text-foreground">
              DevOps & Cloud
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Deploying and maintaining apps with CI/CD pipelines,
              containerization, and cloud services.
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}

function WorkContent() {
  const experiences = [
    {
      period: "Nov 2023 — Jun 2025",
      title: "Software Engineer",
      company: "Syrincal Trading OPC",
      description:
        "Contracted as the sole architect and developer of scalabale B2B ordering platform.",
      skills: [
        "React",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "Redux",
        "OAuth",
        "Tailwind CSS",
      ],
    },
    {
      period: "Jan 2025 — Apr 2025",
      title: "Full-Stack Developer Intern",
      company: "Bone Fix Metal Craft Inc.",
      description:
        "Developed a PHP-based custom CMS with RBAC and admin dashboard.",
      skills: ["PHP", "HTML", "CSS", "JavaScript", "MySQL", "WordPress"],
    },
    {
      period: "Sep 2024 — Dec 2024",
      title: "Freelance Web Developer",
      company: "D.R.A. Jewelry",
      description:
        "Delivered a mobile-first, fully responsive business website with SEO optimization.",
      skills: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "SEO",
        "Web3Forms",
        "Google Analytics",
      ],
    },
    {
      period: "Jun 2023 — Jun 2024",
      title: "Social Media Manager",
      company: "We Whiten",
      description:
        "Managed day-to-day social media marketing operations across social media platforms.",
      skills: [
        "Social Media",
        "Content Strategy",
        "Client Aquistion & Outreach",
        "Management",
      ],
    },
  ];

  return (
    <>
      <Card className="col-span-1 md:col-span-10 p-6 md:p-10 glass-card glass-highlight   relative md:h-full md:overflow-hidden">
        <h2 className="text-3xl font-bold mb-8">Work Experience</h2>
        <div className="md:max-h-[calc(100%-5rem)] md:overflow-y-auto md:pr-4 custom-scrollbar-hide-on-hover">
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="border-l-2 border-primary/30 pl-6 pb-8 last:pb-0"
              >
                <div className="text-sm text-muted-foreground mb-2">
                  {exp.period}
                </div>
                <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                <div className="text-lg text-primary mb-3">{exp.company}</div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-secondary"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card to-transparent pointer-events-none rounded-b-xl md:block hidden" />
      </Card>
    </>
  );
}

function ProjectsContent() {
  const projects = [
    {
      title: "OJTfolio",
      description:
        "A SaaS web application with file-upload support, daily-note time-entry logging, and automated weekly report generation that helps students monitor and document their OJT hours.",
      tech: [
        "React",
        "Next.js",
        "shadcn/ui",
        "Node.js",
        "OAuth",
        "PostgreSQL",
        "Supabase",
        "Tailwind CSS",
      ],
      link: "https://ojtfolio.systems/",
    },
    {
      title: "Loooply",
      description:
        "A SaaS app for managers to track employee performance, time, and tasks in real-time — boosting team productivity and accountability without micromanagement.",
      tech: [
        "Next.js",
        "Typescript",
        "Node.js",
        "Redux",
        "Supabase",
        "Tailwind CSS",
        "shadcn/ui",
        "OAuth",
      ],
      link: "https://loooply.vercel.app/",
    },
    {
      title: "E-Registrar",
      description:
        "A Full Stack Queue Management Kiosk System for school segistrars to streamline and automate the operational process in school registrars offices complete with desktop application and kiosk system.",
      tech: [
        "React",
        "Electron",
        "Node.js",
        "Tailwind CSS",
        "Firebase",
        "EmailJS",
        "Twilio",
      ],
      link: "#",
    },
    {
      title: "DRA Jewelry",
      description:
        "A website built for an established Jewelry Business that allows clients to request personalized consultations with the owner.",
      tech: ["Next.js", "SEO", "Tailwind CSS", "Web3Forms", "Google Maps API"],
      link: "https://dra-jewelry.vercel.app/",
    },
    {
      title: "Syrincal System",
      description:
        "A Full-Stack B2B Ordering platform, Supply Chain Management, Inventory System & Delivery Tracker for Syrincal Trading OPC.",
      tech: [
        "Next.js",
        "Supabase",
        "Tailwind CSS",
        "Redux",
        "Node.js",
        "OAuth",
      ],
      link: "#",
    },
    {
      title: "acelabador.tech",
      description:
        "A previous version of my personal portfolio website with an emphasis on design, animations, transitions, and micro-interactions.",
      tech: ["React", "Next.js", "SEO", "Tailwind CSS"],
      link: "https://acelabadorv1.vercel.app/",
    },
  ];
  const handleProjectClick = (link: string) => {
    if (link && link !== "#") {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const hasValidLink = (link: string) => {
    return link && link !== "#";
  };

  return (
    <>
      <Card className="col-span-1 md:col-span-10 p-6 md:p-8 glass-card glass-highlight   md:h-full md:overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl bg-secondary/80 border border-border/50 glass-highlight   ${
                hasValidLink(project.link)
                  ? "cursor-pointer hover:border-primary/50 transition-colors"
                  : ""
              }`}
              onClick={() => handleProjectClick(project.link)}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-lg">{project.title}</h4>
                {hasValidLink(project.link) && (
                  <ExternalLink className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-xs bg-secondary"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function CredentialsContent() {
  const credentials = [
    {
      title: "US-ASEAN Industry Professional Credentials Track",
      issuer: "Arizona State University & U.S. Department of State",
      date: "2024",
      type: "Professional Certificate",
      verifyLink: "images/US-ASEAN_STIC_Cert.pdf",
    },
    {
      title: "IBM Full-Stack JavaScript Developer",
      issuer: "IBM / Coursera",
      date: "2025",
      type: "Professional Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/specialization/9MX50VHJBGHZ",
    },
    {
      title: "IBM Front-End Developer",
      issuer: "IBM / Coursera",
      date: "2024",
      type: "Professional Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/specialization/4SK3A56V1L08",
    },
    {
      title: "Meta Front-End Developer",
      issuer: "Meta / Coursera",
      date: "2024",
      type: "Professional Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/specialization/0ME3YQZD92SX",
    },
    {
      title: "Google IT Support",
      issuer: "Google / Coursera",
      date: "2024",
      type: "Professional Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/specialization/6MJ169KOYN74",
    },
    {
      title: "Google Project Management",
      issuer: "Google / Coursera",
      date: "2024",
      type: "Professional Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/specialization/EZ8JDDLZNOZT",
    },
    {
      title: "Github Foundations",
      issuer: "GitHub / Credly",
      date: "2025",
      type: "Badge",
      verifyLink:
        "https://www.credly.com/badges/fde0d473-a43b-48f2-983f-ee4edf516740/public_url",
    },
    {
      title: "Node.js & MongoDB: Developing Back-end Database Applications",
      issuer: "IBM / Coursera",
      date: "2025",
      type: "Course Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/verify/KVOX173Z2NID",
    },
    {
      title: "Application Development using Microservices and Serverless",
      issuer: "IBM / Coursera",
      date: "2025",
      type: "Course Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/verify/LVUA0MHSERXS",
    },
    {
      title: "Developing Back-End Apps with Node.js and Express",
      issuer: "IBM / Coursera",
      date: "2025",
      type: "Course Certificate",
      verifyLink: "https://coursera.org/share/3b61e2d90d2fc9f1d233518a29d449a",
    },
    {
      title: "Introduction to Containers w/ Docker, Kubernetes & OpenShift",
      issuer: "IBM / Coursera",
      date: "2025",
      type: "Course Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/verify/AUDE4UWLOP4C",
    },
    {
      title: "JavaScript Programming Essentials",
      issuer: "IBM / Coursera",
      date: "2025",
      type: "Course Certificate",
      verifyLink: "https://coursera.org/share/3ca9d32509f7d116db06ff2ab4abd8b5",
    },
    {
      title: "Foundations of Prompt Engineering",
      issuer: "AWS Skill Builder",
      date: "2024",
      type: "Foundations Certificate",
      verifyLink: "/images/AWS_Prompt_Engineering.pdf",
    },
    {
      title: "Generative AI: Introduction and Applications",
      issuer: "IBM / Coursera",
      date: "2024",
      type: "Course Certificate",
      verifyLink: "https://coursera.org/share/bf3d54ea0cc82f7f2ccdf49f149318de",
    },
    {
      title: "Google AI Essentials",
      issuer: "Google / Coursera",
      date: "2025",
      type: "Essentials Certificate",
      verifyLink: "https://coursera.org/share/d85d6d3743a115ef0ddb465ba86920cd",
    },
    {
      title: "Front-End Development with React V2",
      issuer: "IBM / Coursera / Credly",
      date: "2024",
      type: "Course Certificate",
      verifyLink:
        "https://www.credly.com/badges/b283dfb4-2290-41f3-b6e2-4ef81653edda/linked_in_profile",
    },
    {
      title: "Intermediate Front-End Web Development",
      issuer: "IBM / Coursera / Credly",
      date: "2024",
      type: "Course Certificate",
      verifyLink:
        "https://www.credly.com/badges/c9c4d562-c68c-4338-b4a7-48de480a551e/linked_in_profile",
    },
    {
      title: "Advanced React",
      issuer: "Meta / Coursera",
      date: "2024",
      type: "Course Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/verify/47DCLWIGCDLC?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse",
    },
    {
      title: "Cloud Native, DevOps, Agile, and NoSQL Essentials",
      issuer: "IBM / Coursera / Credly",
      date: "2024",
      type: "Course Certificate",
      verifyLink:
        "https://www.credly.com/badges/f84c989f-c90a-4e99-9b40-524db4291969/linked_in_profile",
    },
    {
      title: "Software Engineering Essentials",
      issuer: "IBM / Credly",
      date: "2024",
      type: "Course Certificate",
      verifyLink:
        "https://www.credly.com/badges/fb141250-8fff-444e-90aa-82771c9ff56b/public_url",
    },
    {
      title: "Git and Github Essentials",
      issuer: "IBM / Credly",
      date: "2024",
      type: "Course Certificate",
      verifyLink:
        "https://www.credly.com/badges/0dd414dc-780c-456d-8cff-0034c379fbf7/linked_in_profile",
    },
    {
      title: "Introduction to Front-End Development",
      issuer: "Meta / Coursera",
      date: "2024",
      type: "Course Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/verify/ZIUCQ0VQQESM?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse",
    },
    {
      title: "HTML and CSS in depth",
      issuer: "Meta / Coursera",
      date: "2024",
      type: "Course Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/verify/ZGCGDS3X5RAJ?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse",
    },
    {
      title: "Programming with JavaScript",
      issuer: "Meta / Coursera",
      date: "2024",
      type: "Course Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/verify/4RF12GZRCHKF?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse",
    },
    {
      title: "Version Control",
      issuer: "Meta / Coursera",
      date: "2024",
      type: "Course Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/verify/HJB0P6MHF2J6",
    },
    {
      title: "Principles of UX/UI Design",
      issuer: "Meta / Coursera",
      date: "2024",
      type: "Course Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/verify/QU0UX9Z0RPYF?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse",
    },
    {
      title: "Foundations of User Experience (UX) Design",
      issuer: "Google / Coursera",
      date: "2024",
      type: "Foundational Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/verify/CLIG7X137GZM?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    },
    {
      title: "Foundations of Project Management",
      issuer: "Google / Coursera",
      date: "2024",
      type: "Foundational Certificate",
      verifyLink: "https://coursera.org/share/d11458a1b0c2afcd499dcb08810308e0",
    },
    {
      title: "Start the UX Design Process: Empathize, Define, and Ideate",
      issuer: "Google / Coursera",
      date: "2024",
      type: "Course Certificate",
      verifyLink:
        "https://www.coursera.org/account/accomplishments/verify/Z1QQDFX25DSB",
    },
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "2024",
      type: "Bootcamp Certification",
      verifyLink:
        "https://www.freecodecamp.org/certification/alasss/responsive-web-design",
    },
    {
      title: "Front End Development Libraries",
      issuer: "freeCodeCamp",
      date: "2024",
      type: "Bootcamp Certification",
      verifyLink:
        "https://www.freecodecamp.org/certification/alasss/front-end-development-libraries",
    },
    {
      title: "PCAP: Programming Essentials in Python",
      issuer: "OpenEDG / Cisco Networking Academy",
      date: "2023",
      type: "Professional Certification",
      verifyLink: "/images/pythoncert.pdf",
    },
    {
      title: "IT Specialist - Python",
      issuer: "Certiport",
      date: "2023",
      type: "Professional Certification",
      verifyLink:
        "https://www.credly.com/badges/f0e37d58-6a1a-454d-99f9-24a37c46e020/public_url",
    },
  ];

  const handleVerifyClick = (verifyLink: string) => {
    if (verifyLink) {
      window.open(verifyLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <Card className="col-span-1 md:col-span-10 p-6 md:p-8 glass-card glass-highlight relative md:h-full md:overflow-hidden">
        <h2 className="text-3xl font-bold mb-6">Certifications</h2>
        <div className="md:max-h-[calc(100%-5rem)] md:overflow-y-auto md:pr-4 custom-scrollbar-hide-on-hover">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {credentials.map((cert, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-secondary/80 border border-border/50 relative glass-highlight   md:h-[160px] h-auto min-h-[140px] flex flex-col"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 pr-2">
                    <h4
                      className="font-semibold text-lg line-clamp-2 hover:line-clamp-none"
                      title={cert.title}
                    >
                      {cert.title}
                    </h4>
                    <div className="text-sm text-primary mt-1">
                      {cert.issuer}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs border-border/50 flex-shrink-0"
                  >
                    {cert.date}
                  </Badge>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="text-xs text-muted-foreground">
                    {cert.type}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 px-3 bg-primary text-primary-foreground"
                    onClick={() => handleVerifyClick(cert.verifyLink)}
                  >
                    Verify
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card to-transparent pointer-events-none rounded-b-xl md:block hidden" />
      </Card>
    </>
  );
}
