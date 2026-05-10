"""Smart fallback content when AI providers fail or rate-limit.
Curated, ATS-friendly, role-specific defaults so the app never breaks."""

ROLES = ["software-engineer", "data-scientist", "full-stack-developer", "ai-ml-engineer",
        "ui-ux-designer", "product-manager", "internship", "fresher", "corporate", "creative"]

def detect_role(text: str) -> str:
    t = (text or "").lower()
    if any(k in t for k in ["data scien", "ml engin", "machine learn", "data analy"]): return "data-scientist"
    if any(k in t for k in ["ai engineer", "ai/ml", "deep learn", "nlp", "computer vision"]): return "ai-ml-engineer"
    if any(k in t for k in ["full stack", "fullstack", "full-stack"]): return "full-stack-developer"
    if any(k in t for k in ["ui", "ux", "designer", "figma", "prototyp"]): return "ui-ux-designer"
    if any(k in t for k in ["product manager", "pm role", "product owner"]): return "product-manager"
    if any(k in t for k in ["intern", "internship"]): return "internship"
    if any(k in t for k in ["fresher", "graduate", "entry-level", "entry level"]): return "fresher"
    if any(k in t for k in ["software engineer", "developer", "swe", "backend", "frontend", "engineer"]): return "software-engineer"
    if any(k in t for k in ["manager", "director", "vp", "head of", "executive"]): return "corporate"
    return "software-engineer"

SUMMARIES = {
    "software-engineer": "Detail-oriented Software Engineer with hands-on experience designing, building, and shipping production-grade web applications. Skilled in modern JavaScript frameworks, RESTful APIs, and cloud-native architectures. Proven ability to translate complex requirements into clean, maintainable code while collaborating effectively in agile teams.",
    "data-scientist": "Results-driven Data Scientist with strong foundations in statistics, machine learning, and data engineering. Adept at extracting actionable insights from large datasets, building predictive models, and communicating findings to stakeholders. Passionate about leveraging data to drive measurable business outcomes.",
    "full-stack-developer": "Versatile Full Stack Developer with end-to-end experience building scalable web applications across frontend and backend. Skilled in React, Node.js/Python, databases, and cloud deployment. Known for writing clean code, owning features from concept to production, and collaborating across disciplines.",
    "ai-ml-engineer": "AI/ML Engineer specialized in designing, training, and deploying machine learning models at scale. Strong background in deep learning, NLP, and MLOps. Experienced in turning research-grade prototypes into reliable production systems with measurable impact.",
    "ui-ux-designer": "Empathetic UI/UX Designer with a portfolio of human-centered digital products. Skilled in research, wireframing, prototyping, and design systems. Combines visual craft with usability principles to deliver intuitive, accessible experiences that delight users and align with business goals.",
    "product-manager": "Strategic Product Manager with a track record of shipping customer-loved products in fast-paced environments. Strong in roadmap planning, cross-functional leadership, data-informed decision making, and stakeholder communication. Passionate about discovering real user problems and shipping elegant solutions.",
    "internship": "Motivated and quick-learning student seeking an internship to apply academic foundations in real-world projects. Strong fundamentals in programming, problem-solving, and teamwork. Eager to contribute, learn from senior engineers, and grow in a collaborative product environment.",
    "fresher": "Recent graduate with hands-on experience in academic and personal projects across web development and software engineering. Strong fundamentals in data structures, algorithms, and modern frameworks. Proactive learner ready to deliver value from day one in a professional setting.",
    "corporate": "Accomplished professional with proven leadership in driving cross-functional initiatives and delivering measurable business impact. Strong in strategy, operations, and stakeholder management. Trusted partner to executives with a record of building high-performing teams and scaling outcomes.",
    "creative": "Imaginative creative professional blending strategy with craft to produce work that resonates. Experience leading concept-to-execution across digital and brand touchpoints. Strong eye for detail, clear point of view, and a collaborative approach to building memorable experiences.",
}

SKILLS = {
    "software-engineer": ["JavaScript", "TypeScript", "React", "Node.js", "Python", "REST APIs", "Git", "Docker", "AWS", "PostgreSQL", "Unit Testing", "Agile"],
    "data-scientist": ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "SQL", "Statistics", "A/B Testing", "Tableau", "Spark", "Feature Engineering"],
    "full-stack-developer": ["React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL", "Tailwind CSS", "TypeScript", "Docker", "CI/CD", "AWS"],
    "ai-ml-engineer": ["Python", "PyTorch", "TensorFlow", "Hugging Face", "LangChain", "MLOps", "Kubernetes", "Vector Databases", "Prompt Engineering", "Model Deployment", "FastAPI", "RAG"],
    "ui-ux-designer": ["Figma", "Sketch", "Adobe XD", "Prototyping", "Design Systems", "User Research", "Wireframing", "Accessibility", "Interaction Design", "Usability Testing", "Information Architecture", "Branding"],
    "product-manager": ["Roadmapping", "User Research", "A/B Testing", "Analytics (Mixpanel/Amplitude)", "SQL", "Agile/Scrum", "Stakeholder Management", "Product Strategy", "OKRs", "Wireframing", "Go-to-Market", "Customer Discovery"],
    "internship": ["Python", "Java", "Git", "Data Structures", "Algorithms", "HTML/CSS", "JavaScript", "SQL", "Communication", "Problem Solving", "Teamwork", "Quick Learning"],
    "fresher": ["Python", "Java", "JavaScript", "React", "Git", "SQL", "Data Structures", "Algorithms", "OOP", "REST APIs", "Linux", "Agile"],
    "corporate": ["Leadership", "Strategy", "Project Management", "Stakeholder Management", "Operations", "Budgeting", "P&L", "Cross-functional Collaboration", "Public Speaking", "Negotiation", "Excel", "PowerPoint"],
    "creative": ["Brand Strategy", "Art Direction", "Copywriting", "Photography", "Video Editing", "Adobe Creative Suite", "Storytelling", "Concept Development", "Typography", "Motion Design", "Social Media", "Trend Research"],
}

ATS_DEFAULT = {
    "score": 72,
    "matched_keywords": [],
    "missing_keywords": ["Leadership", "Stakeholder Management", "REST APIs", "Cloud", "CI/CD", "Agile"],
    "suggestions": [
        "Quantify achievements with numbers (e.g., 'reduced load time by 40%').",
        "Mirror exact keywords from the job description in your skills section.",
        "Use strong action verbs to start each bullet (Led, Built, Shipped, Optimized).",
        "Keep formatting simple — avoid tables, columns and images that ATS can't parse.",
        "Place a one-line professional summary at the top targeted to the role.",
    ],
}

INTERVIEW_TIPS = [
    "Use the STAR method (Situation, Task, Action, Result) for behavioral questions.",
    "Prepare 2-3 stories that highlight ownership, conflict resolution, and impact.",
    "Always quantify your results with numbers when possible.",
    "Research the company's product, mission, and recent news before the interview.",
    "Prepare thoughtful questions for the interviewer — never say 'no questions'.",
]

def fallback(feature: str, ctx: str = "", text: str = "", jd: str = ""):
    """Return a sensible non-AI response for the given feature."""
    role = detect_role(f"{ctx} {jd} {text}")
    if feature == "summary":
        return SUMMARIES.get(role, SUMMARIES["software-engineer"])
    if feature == "skills":
        return ", ".join(SKILLS.get(role, SKILLS["software-engineer"]))
    if feature == "improve":
        if not text: return "Add a strong action verb at the start, then quantify the outcome with a measurable number."
        # generic improver
        verbs = ["Engineered", "Delivered", "Architected", "Spearheaded", "Optimized"]
        return f"{verbs[0]} {text.strip().rstrip('.')}, resulting in measurable improvements in performance and team velocity."
    if feature == "grammar":
        if not text: return ""
        # tiny capitalization+period normaliser
        s = text.strip()
        if s and not s.endswith((".", "!", "?")): s += "."
        s = s[0].upper() + s[1:] if s else s
        return s
    if feature == "keywords":
        return ", ".join(SKILLS.get(role, SKILLS["software-engineer"])[:12])
    if feature == "ats":
        d = dict(ATS_DEFAULT)
        d["matched_keywords"] = SKILLS.get(role, SKILLS["software-engineer"])[:6]
        d["missing_keywords"] = SKILLS.get(role, SKILLS["software-engineer"])[6:12]
        import json
        return json.dumps(d)
    if feature == "chat":
        msg = (text or "").lower()
        if any(k in msg for k in ["who built", "who created", "who made", "who developed", "developer of", "creator of"]):
            return "This ResumeAI platform was built by Jagadeesh S Bentoor."
        if any(k in msg for k in ["interview", "prepare"]):
            return "Here are quick interview tips:\n• " + "\n• ".join(INTERVIEW_TIPS)
        if any(k in msg for k in ["ats", "score"]):
            return "To boost your ATS score: use exact keywords from the JD, quantify results, keep formatting simple (no tables/images), and place a targeted summary at the top."
        if any(k in msg for k in ["skill", "stack"]):
            return "Top skills for your role: " + ", ".join(SKILLS.get(role, SKILLS["software-engineer"])[:8])
        return "I'm in Smart Resume Mode right now. Ask me about resumes, ATS, skills, or interview prep — I have curated tips ready."
    return ""
