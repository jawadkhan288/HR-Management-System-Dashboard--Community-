import { useState, useCallback } from "react";
import { Upload, FileText, Loader2, CheckCircle, XCircle, Eye, Download, Trash2, Sparkles, UserPlus } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useSharedContext, type CandidateData } from "./SharedContext";

interface ParsedResume {
  id: string;
  fileName: string;
  status: "parsing" | "completed" | "failed";
  uploadedAt: Date;
  parsedData?: {
    personalDetails: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
      linkedin?: string;
      portfolio?: string;
    };
    summary?: string;
    education: Array<{
      degree: string;
      institution: string;
      year: string;
      gpa?: string;
    }>;
    experience: Array<{
      position: string;
      company: string;
      duration: string;
      description: string[];
    }>;
    skills: {
      technical: string[];
      soft: string[];
      languages: string[];
    };
    certifications?: string[];
  };
}

const mockParsedResults = [
  {
    personalDetails: {
      fullName: "Nathan Johnson",
      email: "nathan.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/nathanjohnson",
      portfolio: "nathanjohnson.com",
    },
    summary: "Experienced Full Stack Developer with 6+ years of expertise in building scalable web applications using modern JavaScript frameworks. Proven track record of leading development teams and delivering high-quality solutions.",
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Stanford University",
        year: "2015-2019",
        gpa: "3.8/4.0",
      },
      {
        degree: "Master of Science in Software Engineering",
        institution: "MIT",
        year: "2019-2021",
        gpa: "3.9/4.0",
      },
    ],
    experience: [
      {
        position: "Senior Full Stack Developer",
        company: "Tech Corp",
        duration: "2021 - Present",
        description: [
          "Led a team of 5 developers in building a microservices-based e-commerce platform",
          "Improved application performance by 40% through optimization and caching strategies",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
        ],
      },
      {
        position: "Full Stack Developer",
        company: "StartupXYZ",
        duration: "2019 - 2021",
        description: [
          "Developed RESTful APIs using Node.js and Express",
          "Built responsive front-end interfaces with React and TypeScript",
          "Collaborated with UX designers to implement pixel-perfect designs",
        ],
      },
    ],
    skills: {
      technical: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "MongoDB"],
      soft: ["Leadership", "Communication", "Problem Solving", "Team Collaboration"],
      languages: ["English (Native)", "Spanish (Fluent)", "French (Basic)"],
    },
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional",
      "Certified Scrum Master",
    ],
  },
  {
    personalDetails: {
      fullName: "Michael Rivera",
      email: "michael.rivera@email.com",
      phone: "+1 (555) 987-6543",
      location: "Austin, TX",
      linkedin: "linkedin.com/in/michaelrivera",
    },
    summary: "Creative UX Designer with 4+ years designing intuitive digital experiences for SaaS products. Passionate about accessibility and user-centered design.",
    education: [
      {
        degree: "Bachelor of Fine Arts in Interaction Design",
        institution: "Parsons School of Design",
        year: "2016-2020",
        gpa: "3.7/4.0",
      },
    ],
    experience: [
      {
        position: "Senior UX Designer",
        company: "DesignHub",
        duration: "2022 - Present",
        description: [
          "Redesigned onboarding flow increasing retention by 25%",
          "Led user research sessions and usability testing across 3 products",
          "Created a unified design system used by 20+ engineers",
        ],
      },
      {
        position: "UX Designer",
        company: "AppWorks",
        duration: "2020 - 2022",
        description: [
          "Designed responsive web and mobile interfaces",
          "Conducted A/B testing resulting in 15% conversion improvements",
        ],
      },
    ],
    skills: {
      technical: ["Figma", "Sketch", "Adobe XD", "Prototyping", "Wireframing", "HTML/CSS"],
      soft: ["Empathy", "Storytelling", "Collaboration", "Critical Thinking"],
      languages: ["English (Native)", "Portuguese (Conversational)"],
    },
    certifications: ["Google UX Design Certificate", "Certified Usability Analyst"],
  },
  {
    personalDetails: {
      fullName: "Raj Patel",
      email: "raj.patel@email.com",
      phone: "+1 (555) 456-7890",
      location: "New York, NY",
      linkedin: "linkedin.com/in/rajpatel",
    },
    summary: "Data-driven Product Manager with 5 years of experience shipping B2B SaaS products from 0 to 1. Strong analytical background with an MBA.",
    education: [
      {
        degree: "MBA, Technology Management",
        institution: "Columbia Business School",
        year: "2017-2019",
      },
      {
        degree: "B.S. in Statistics",
        institution: "UC Berkeley",
        year: "2013-2017",
        gpa: "3.6/4.0",
      },
    ],
    experience: [
      {
        position: "Senior Product Manager",
        company: "CloudScale",
        duration: "2021 - Present",
        description: [
          "Managed a $5M product line with 50k+ active users",
          "Defined product roadmap and prioritized features using data insights",
          "Launched 3 major features driving 30% ARR growth",
        ],
      },
      {
        position: "Product Manager",
        company: "DataFlow Inc.",
        duration: "2019 - 2021",
        description: [
          "Collaborated with engineering and design to ship quarterly releases",
          "Ran customer interviews and synthesized insights into product specs",
        ],
      },
    ],
    skills: {
      technical: ["SQL", "Jira", "Amplitude", "Mixpanel", "Roadmapping", "A/B Testing"],
      soft: ["Strategic Thinking", "Stakeholder Management", "Communication", "Leadership"],
      languages: ["English (Native)", "Hindi (Fluent)"],
    },
    certifications: ["Pragmatic Institute Certified", "Certified Scrum Product Owner"],
  },
];

let mockIndex = 0;

export function ResumeParsing() {
  const { addCandidate } = useSharedContext();
  const [resumes, setResumes] = useState<ParsedResume[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedResume, setSelectedResume] = useState<ParsedResume | null>(null);
  const [addedResumeIds, setAddedResumeIds] = useState<Set<string>>(new Set());

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  }, []);

  const processFiles = (files: File[]) => {
    const newResumes: ParsedResume[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      fileName: file.name,
      status: "parsing",
      uploadedAt: new Date(),
    }));

    setResumes((prev) => [...newResumes, ...prev]);

    // Simulate AI parsing with varied mock data
    newResumes.forEach((resume) => {
      const dataIndex = mockIndex % mockParsedResults.length;
      mockIndex++;
      setTimeout(() => {
        setResumes((prev) =>
          prev.map((r) =>
            r.id === resume.id
              ? {
                  ...r,
                  status: "completed",
                  parsedData: mockParsedResults[dataIndex],
                }
              : r
          )
        );
      }, 2000 + Math.random() * 2000);
    });
  };

  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
    if (selectedResume?.id === id) {
      setSelectedResume(null);
    }
  };

  const handleViewDetails = (resume: ParsedResume) => {
    setSelectedResume(resume);
  };

  const handleAddToPool = (resume: ParsedResume) => {
    if (!resume.parsedData) return;

    const pd = resume.parsedData;
    const topPosition = pd.experience.length > 0 ? pd.experience[0].position : "Open Position";
    const yearsMatch = pd.summary?.match(/(\d+)\+?\s*years?/i);
    const expStr = yearsMatch ? `${yearsMatch[1]} years` : "N/A";

    const newCandidate: CandidateData = {
      id: Date.now() + Math.random(),
      name: pd.personalDetails.fullName,
      email: pd.personalDetails.email,
      phone: pd.personalDetails.phone,
      position: topPosition,
      aiScore: Math.floor(Math.random() * 20) + 75,
      experience: expStr,
      skills: pd.skills.technical.slice(0, 4),
      status: "Applied",
      avatar: `https://i.pravatar.cc/150?u=${pd.personalDetails.email}`,
      appliedDate: new Date().toISOString().split("T")[0],
      matchReasons: [
        `${pd.skills.technical.length} technical skills`,
        `${pd.experience.length} roles`,
        pd.certifications && pd.certifications.length > 0
          ? `${pd.certifications.length} certifications`
          : "Strong background",
      ],
    };

    addCandidate(newCandidate);
    setAddedResumeIds((prev) => new Set(prev).add(resume.id));
    toast.success(`${pd.personalDetails.fullName} added to Candidate Pool!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Resume Parsing</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload resumes and extract structured information using AI
        </p>
      </div>

      {/* Upload Module */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed bg-card p-12 shadow-sm transition-all ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50"
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">
            Upload Resumes for AI Parsing
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Drag and drop your PDF or DOCX files here, or click to browse
          </p>
          <input
            type="file"
            id="file-upload"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleFileInput}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground cursor-pointer hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
          >
            <Sparkles className="h-4 w-4" />
            Select Files
          </label>
          <p className="text-xs text-muted-foreground mt-4">
            Supports PDF and DOCX formats (Max 10MB per file)
          </p>
        </div>
      </div>

      {/* Processing Queue */}
      {resumes.length > 0 && (
        <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-foreground">Processing Queue</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {resumes.filter((r) => r.status === "parsing").length} parsing,{" "}
                {resumes.filter((r) => r.status === "completed").length} completed
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-4 transition-all hover:bg-muted/50"
              >
                <div
                  className={`rounded-lg p-3 ${
                    resume.status === "parsing"
                      ? "bg-blue-100"
                      : resume.status === "completed"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {resume.status === "parsing" ? (
                    <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                  ) : resume.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-semibold text-foreground truncate">
                      {resume.fileName}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {resume.status === "parsing" && "Parsing with AI..."}
                    {resume.status === "completed" && "Parsing completed successfully"}
                    {resume.status === "failed" && "Parsing failed"}
                  </p>
                </div>

                {resume.status === "parsing" && (
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full bg-primary animate-pulse rounded-full w-2/3" />
                    </div>
                  </div>
                )}

                {resume.status === "completed" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewDetails(resume)}
                      className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-all"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-all">
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed View Modal */}
      {selectedResume && selectedResume.parsedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="w-full max-w-4xl rounded-2xl bg-card shadow-xl my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Parsed Resume Details</h2>
                  <p className="text-sm text-muted-foreground mt-1">{selectedResume.fileName}</p>
                </div>
                <button
                  onClick={() => setSelectedResume(null)}
                  className="rounded-lg p-2 hover:bg-accent transition-all"
                >
                  <svg
                    className="h-5 w-5 text-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Details */}
              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 p-6 border border-purple-100">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="rounded-lg bg-primary p-2">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </div>
                  Personal Details
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                    <p className="text-sm font-semibold text-foreground">
                      {selectedResume.parsedData.personalDetails.fullName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="text-sm font-semibold text-foreground">
                      {selectedResume.parsedData.personalDetails.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Phone</p>
                    <p className="text-sm font-semibold text-foreground">
                      {selectedResume.parsedData.personalDetails.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Location</p>
                    <p className="text-sm font-semibold text-foreground">
                      {selectedResume.parsedData.personalDetails.location}
                    </p>
                  </div>
                  {selectedResume.parsedData.personalDetails.linkedin && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">LinkedIn</p>
                      <p className="text-sm font-semibold text-primary">
                        {selectedResume.parsedData.personalDetails.linkedin}
                      </p>
                    </div>
                  )}
                  {selectedResume.parsedData.personalDetails.portfolio && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Portfolio</p>
                      <p className="text-sm font-semibold text-primary">
                        {selectedResume.parsedData.personalDetails.portfolio}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              {selectedResume.parsedData.summary && (
                <div className="rounded-xl bg-muted/30 p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-3">Professional Summary</h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    {selectedResume.parsedData.summary}
                  </p>
                </div>
              )}

              {/* Education */}
              <div className="rounded-xl bg-muted/30 p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Education</h3>
                <div className="space-y-4">
                  {selectedResume.parsedData.education.map((edu, idx) => (
                    <div key={idx} className="border-l-4 border-primary pl-4">
                      <p className="text-sm font-bold text-foreground">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground mt-1">{edu.institution}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {edu.year}
                        </span>
                        {edu.gpa && (
                          <span className="text-xs font-medium text-foreground">GPA: {edu.gpa}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              <div className="rounded-xl bg-muted/30 p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Work Experience</h3>
                <div className="space-y-6">
                  {selectedResume.parsedData.experience.map((exp, idx) => (
                    <div key={idx} className="border-l-4 border-primary pl-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-bold text-foreground">{exp.position}</p>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                        </div>
                        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                          {exp.duration}
                        </span>
                      </div>
                      <ul className="space-y-2 mt-3">
                        {exp.description.map((desc, descIdx) => (
                          <li key={descIdx} className="text-sm text-foreground flex items-start gap-2">
                            <span className="text-primary mt-1.5">•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="rounded-xl bg-muted/30 p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Skills</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Technical Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedResume.parsedData.skills.technical.map((skill, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Soft Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedResume.parsedData.skills.soft.map((skill, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedResume.parsedData.skills.languages.map((lang, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              {selectedResume.parsedData.certifications && (
                <div className="rounded-xl bg-muted/30 p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-4">Certifications</h3>
                  <div className="space-y-2">
                    {selectedResume.parsedData.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <p className="text-sm text-foreground">{cert}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setSelectedResume(null)}
                  className="flex-1 rounded-xl border-2 border-input py-2.5 text-sm font-semibold text-foreground hover:bg-accent transition-all"
                >
                  Close
                </button>
                {selectedResume && !addedResumeIds.has(selectedResume.id) ? (
                  <button
                    onClick={() => {
                      handleAddToPool(selectedResume);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    <UserPlus className="h-4 w-4" />
                    Add to Candidate Pool
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 text-sm font-semibold text-white cursor-not-allowed"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Added to Candidate Pool
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}