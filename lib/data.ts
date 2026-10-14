export const personal = {
  name: "Bandhan Patel",
  title: "Platform Engineer",
  tagline:
    "Building the infrastructure that lets teams ship reliably - from Kubernetes clusters to AI-native automation, across AWS and GCP.",
  email: "bandhanpatel1804@gmail.com",
  linkedin: "https://linkedin.com/in/bpatel1804",
  github: "https://github.com/Hellblazer1804",
  location: "Atlanta, GA",
};

export const heroStats = [
  { value: "4+", label: "Years Production SRE/Platform" },
  { value: "99.9999%", label: "Uptime Maintained (Amex)" },
  { value: "ACM '26", label: "Peer-Reviewed Publication" },
  { value: "AWS", label: "Solutions Architect – Associate" },
];

export const aboutText = `I'm a cloud infrastructure and backend engineer who has spent 4+ years building and
operating distributed systems on Kubernetes across AWS and GCP. I care about systems
that stay up: I held a 99.9999% uptime SLO across 6 PCI-supporting production accounts
at American Express on 24×7 on-call.

On the research side, my M.S. thesis turned into a peer-reviewed paper at ACM Middleware '26.
FaaSpot is a serverless workflow execution system that runs entirely on spot instances-no
on-demand fallback-and still beats every hybrid baseline on success rate, cost, and latency
by exploiting DAG topology to place checkpoints and scale proactively before preemptions happen.

I'm drawn to work that sits at the intersection of systems depth and real-world reliability engineering:
platform tooling, cost optimization, multi-agent AI infrastructure, and the kind of on-call work
where the decisions you make at 2 a.m. actually matter.`;

export const skills = [
  {
    category: "Cloud",
    items: [
      "AWS (EKS, ECS, RDS, Aurora, S3, Lambda, SQS, VPC, Transit Gateway, IAM)",
      "GCP (GKE, BigQuery, IAM, Cloud Run)",
      "Multi-account architecture",
      "PCI / FedRAMP environments",
    ],
  },
  {
    category: "IaC & CI/CD",
    items: [
      "Terraform",
      "AWS CDK",
      "Helm",
      "Argo CD",
      "Argo Workflows",
      "GitHub Actions",
      "Ansible",
    ],
  },
  {
    category: "Containers & Orchestration",
    items: [
      "Kubernetes (EKS, GKE, kubeadm bare-metal)",
      "Docker",
      "Fission (serverless on K8s)",
      "OIDC workload identity",
      "RBAC",
    ],
  },
  {
    category: "Observability & SRE",
    items: [
      "Datadog",
      "Prometheus",
      "Grafana",
      "VictoriaMetrics",
      "Splunk",
      "SLOs / error budgets",
      "DR planning & execution",
    ],
  },
  {
    category: "Languages",
    items: ["Python", "Java", "TypeScript / Node.js", "Bash", "PowerShell", "SQL", "HCL"],
  },
  {
    category: "AI & Agents",
    items: [
      "Multi-agent orchestration",
      "MCP servers",
      "LLM tool calling",
      "Claude Code skills",
      "Human-in-the-loop approval",
    ],
  },
];

export const projects = [
  {
    id: "faaspot",
    title: "FaaSpot",
    subtitle: "Fault-Tolerant Serverless Workflows on Spot Instances",
    badge: "ACM Middleware '26",
    badgeColor: "#22d3ee",
    caseStudy: {
      situation:
        "Serverless workloads on cloud spot instances offer 70–90% cost savings but suffer frequent preemptions. Every prior system hedged by mixing in on-demand nodes for high-risk tasks - forfeiting the savings that made spot attractive in the first place.",
      challenge:
        "Three compounding problems surfaced early: reactive checkpointing created too much overhead and was too slow to matter once a preemption was already happening; the autoscaler was similarly reactive - by the time it triggered, nodes were already gone; and the retry service was single-threaded, so retries queued linearly and tanked success rates instead of recovering them.",
      solution:
        "Replaced reactive with proactive: Kaplan-Meier survival curves fit on emulator preemption traces give early warning, gating a Thompson Sampling bandit that uses live failure and cost data to scale up before preemptions hit - without overprovisioning. Rewrote the retry service as a 50–100 thread concurrent executor, which alone delivered a 40–50% boost to workflow success rates. Selective checkpointing (DAG-aware, not uniform) kept overhead low while still enabling lineage-based recovery.",
    },
    metrics: [
      { value: "89.03%", label: "Avg. workflow success rate" },
      { value: "2.3×", label: "Lower latency vs. best baseline" },
      { value: "2.2×", label: "Cheaper per successful run" },
      { value: "17.5K", label: "Lines of Python" },
    ],
    highlights: [
      "Raised success from 39% (naive spot) to 89.03% - outperforming every hybrid baseline on all three metrics simultaneously",
      "Built FaaSpot's Kubernetes platform from scratch: a 16-node kubeadm VM cluster on bare metal running Fission",
      "Two-layer autoscaler: Kaplan-Meier survival model gates a Thompson Sampling contextual bandit that scales Deployment replicas onto safer nodes",
      "Checkpoint and lineage-based retry controllers on transactional MySQL, resuming failed runs from the nearest checkpoint",
      "Trace-driven spot emulator replaying real SkyPilot AWS preemption traces for reproducible evaluation",
    ],
    stack: ["Python", "Kubernetes (kubeadm)", "Fission", "MySQL", "Prometheus", "AWS Spot"],
    github: "https://github.com/Hellblazer1804/faas-spot",
    paper: true,
    thesis: "https://www.proquest.com/dissertations-theses/fault-tolerant-cost-efficient-serverless-workflow/docview/3382275335/se-2?accountid=14537",
  },
  {
    id: "multi-agent",
    title: "Multi-Agent AI Ops Platform",
    subtitle: "Production AI System for Infrastructure Observability at Geotab",
    badge: "AI Incident Management",
    badgeColor: "#4ade80",
    caseStudy: {
      situation:
        "Geotab's SRE team was manually triaging incidents across GKE clusters, Prometheus metrics, and BigQuery analytics - three disconnected systems with no unified signal correlation. Incidents required hopping between dashboards before a root cause could even be hypothesized.",
      challenge:
        "Surface root-cause hypotheses faster across a fragmented observability stack without replacing human judgment for remediation decisions or introducing an autonomous system that could take unreviewed actions in production.",
      solution:
        "Built as a Claude Code skill: an orchestrator dispatches sub-agents concurrently, each owning one observability domain through an MCP server layer (Prometheus, BigQuery, gcloud APIs). Agents correlate signals and surface ranked hypotheses; every proposed remediation requires explicit human approval before execution.",
    },
    metrics: [
      { value: "40%", label: "MTTD reduction" },
      { value: "30%", label: "MTTR reduction" },
      { value: "3", label: "Live data sources (Prometheus, BigQuery, gcloud)" },
      { value: "Human", label: "Approval gate before all actions" },
    ],
    highlights: [
      "Orchestrator dispatches sub-agents concurrently, each responsible for a single observability domain (metrics, logs, cloud APIs)",
      "Human-in-the-loop approval gate prevents autonomous remediation - agents propose, humans decide",
      "MCP server layer provides structured tool interfaces for Prometheus queries, BigQuery analytics, and gcloud operations",
      "Deployed on GKE as part of the Argo Workflows migration from PowerShell-based task automation",
    ],
    stack: ["Python", "Claude Code", "MCP", "Prometheus", "BigQuery", "GKE", "Argo Workflows"],
    github: null,
    paper: false,
  },
  {
    id: "georgia-express",
    title: "Georgia Express",
    subtitle: "Credit Card Application & Online Marketplace (DBMS Term Project)",
    badge: "Backend Lead · UGA",
    badgeColor: "#ba0c2f",
    caseStudy: {
      situation:
        "University of Georgia DBMS course required a team to build a full-stack application demonstrating end-to-end relational database design - from conceptual modeling through normalized deployment - using a production-grade technology stack.",
      challenge:
        "Design a normalized relational schema for a credit card marketplace from scratch, wire it to a secure authenticated backend, and deploy it in a containerized environment - with the team depending on the database and backend being solid before frontend work could begin.",
      solution:
        "Led the backend and database side of the team project: drove schema design through UML → ER → BCNF decomposition → 3NF synthesis (7 normalized tables), implemented JWT + BCrypt authentication, and built four REST API domains (Customer, Card, Cart, Transaction) via Spring Boot with Dockerized PostgreSQL.",
    },
    metrics: [
      { value: "7", label: "Normalized tables (3NF)" },
      { value: "JWT", label: "Stateless auth with BCrypt hashing" },
      { value: "Docker", label: "Containerized Postgres deployment" },
      { value: "4", label: "REST API domains" },
    ],
    highlights: [
      "Full schema design pipeline: UML class diagram → ER diagram → BCNF decomposition → 3NF synthesis algorithm",
      "JWT-based authentication with BCrypt password hashing and salting",
      "RESTful APIs: Customer, Card, Cart, and Transaction domains",
      "Docker-containerized PostgreSQL with Hibernate ORM via Spring Boot",
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Docker", "React", "JWT", "BCrypt"],
    github: "https://github.com/Hellblazer1804",
    paper: false,
  },
  {
    id: "devdash",
    title: "DevDash",
    subtitle: "Developer Self-Service Platform at American Express",
    badge: "Developer Experience",
    badgeColor: "#a78bfa",
    caseStudy: {
      situation:
        "American Express developers constantly needed access to infrastructure resources - SQS message contents, vault secrets, on-call contacts - that required SRE intervention. Every request was a manual back-and-forth Slack thread: slow for developers, and a constant interrupt for the SRE team.",
      challenge:
        "Build a self-service platform that lets developers trigger infrastructure operations safely, with a human approval gate before any action executes, without granting them direct access to production systems.",
      solution:
        "Built DevDash as an internal web app with structured request workflows. Example: a developer fills a form with a queue name → a webhook posts the request to the SRE Slack channel → on approval, a Lambda fetches the SQS contents, zips them, stores the archive in S3, and DMs the developer a signed URL - all without the dev touching the queue directly. The same approval-gated pattern covered vault secret retrieval. PagerDuty integration pulled live on-call schedules so engineers could be paged directly from the platform.",
    },
    metrics: [
      { value: "50–100", label: "Engineers served" },
      { value: "0", label: "Direct prod access granted to devs" },
      { value: "Lambda", label: "Event-driven execution layer" },
      { value: "Slack", label: "Approval + delivery channel" },
    ],
    highlights: [
      "SQS → S3 workflow: form submission → Slack webhook → SRE approval → Lambda fetches queue contents → zips → stores in S3 → signed URL delivered to developer's Slack DM",
      "Vault secret retrieval: same approval-gated Lambda pattern - developer requests, SRE approves, secret delivered to their Slack",
      "PagerDuty integration: live on-call schedule display, one-click paging from the platform",
      "TypeScript/Node.js REST API backend handling multiple self-service operation types",
      "Every infrastructure action gated by an approval workflow - zero direct production access for developers",
    ],
    stack: ["TypeScript", "Node.js", "AWS Lambda", "SQS", "S3", "PagerDuty API", "Slack API"],
    github: null,
    paper: false,
  },
  {
    id: "aws-platform",
    title: "AWS Platform Operations",
    subtitle: "PCI-Compliant Infrastructure SRE at American Express",
    badge: "$200K+/mo Saved",
    badgeColor: "#0099ff",
    caseStudy: {
      situation:
        "Shared AWS infrastructure at American Express spanned 6 PCI-supporting production accounts with no systematic cost controls. Cloud spend was inflated across three categories: oversized instances, idle resources (unattached volumes, zombie EKS nodes), and autoscaling gaps where services ran at full capacity off-hours.",
      challenge:
        "Maintain 99.9999% uptime under 24×7 on-call in a regulated PCI environment while simultaneously identifying and eliminating over $200K/month in cloud waste - without disrupting live workloads.",
      solution:
        "Built a Python rightsizing engine targeting all three waste categories: automated instance rightsizing from Datadog utilization metrics, idle-resource cleanup sweeps, and off-hours autoscaling schedules. Structured SLO tracking in Datadog held <0.01% error rates across all services. Ran quarterly DR exercises failing over Aurora/RDS and EKS within 8-hour RTO/RPO targets, including executing a live region-level failover during a data center incident.",
    },
    metrics: [
      { value: "$200K+", label: "Monthly cloud spend reduced" },
      { value: "99.9999%", label: "Uptime across 6 PCI accounts" },
      { value: "50%", label: "MTTD reduction" },
      { value: "35%", label: "MTTR reduction" },
    ],
    highlights: [
      "Operated shared AWS services across 6 PCI-supporting production accounts: EKS, RDS/Aurora (PostgreSQL), IAM, S3, Lambda, Transit Gateway",
      "Python rightsizing engine cut $200K+/month by targeting oversized instances, idle resources, and autoscaling gaps simultaneously",
      "Led 24×7 on-call using Datadog, Dynatrace, and Splunk for incident detection and triage; held <0.01% error-rate SLO across all services",
      "Cut MTTD 50% and MTTR 35% through structured runbooks, SLO alerting, and correlated observability across all three platforms",
      "Planned and ran quarterly DR exercises, failing over Aurora/RDS and EKS within 8-hour RTO/RPO targets",
    ],
    stack: ["AWS EKS", "Aurora/RDS", "Lambda", "Terraform", "Datadog", "Dynatrace", "Splunk", "Python"],
    github: null,
    paper: false,
  },
  {
    id: "ncr-apigee",
    title: "API Modernization & FedRAMP",
    subtitle: "gRPC migration, Apigee X gateway, and FedRAMP compliance at NCR",
    badge: "FedRAMP · 30% Perf Gain",
    badgeColor: "#06b6d4",
    caseStudy: {
      situation:
        "NCR's backend services handled 10K+ req/min through an aging REST-only API layer on GKE. High-frequency service-to-service calls had throughput bottlenecks, the gateway infrastructure needed modernizing, and the platform required FedRAMP compliance to support government contracts.",
      challenge:
        "Migrate 20-30 REST APIs to a new gateway platform without disrupting live traffic, improve throughput on critical high-frequency paths, and achieve FedRAMP compliance - all while maintaining on-call availability for the services throughout the transition.",
      solution:
        "Adopted gRPC for high-frequency service-to-service paths, cutting REST payload overhead and improving overall performance 30%. Migrated 20-30 APIs to Apigee X on GCP as the unified gateway layer. Profiled and load-tested to target the highest-impact bottlenecks first. Implemented FedRAMP compliance controls across the microservices platform.",
    },
    metrics: [
      { value: "30%", label: "Performance improvement" },
      { value: "20–30", label: "APIs migrated to Apigee X" },
      { value: "10K+", label: "Requests per minute" },
      { value: "FedRAMP", label: "Compliance achieved" },
    ],
    highlights: [
      "Adopted gRPC for high-frequency service-to-service paths - reduced REST payload overhead and improved throughput 30%",
      "Migrated 20-30 REST APIs to Apigee X on GCP as the unified gateway layer without service disruption",
      "Implemented FedRAMP compliance controls across the microservices platform for government contract eligibility",
      "Profiled and load-tested bottlenecks to prioritize the highest-impact migration targets",
      "Owned on-call availability throughout the migration, triaging failures and restoring service via pod-level remediation",
    ],
    stack: ["Java", "Spring Boot", "GKE", "gRPC", "Apigee X", "PostgreSQL", "FedRAMP", "GCP"],
    github: null,
    paper: false,
  },
];

export const experience = [
  {
    company: "Geotab",
    slug: "geotab",
    role: "Cloud Automation Engineer",
    period: "Aug 2025 – Present",
    location: "Atlanta, GA",
    caseStudy: {
      situation:
        "Geotab's automation infrastructure ran on a PowerShell-based task platform that had grown brittle - high failure rates, no native integration with Argo Workflows, and VM workloads that needed migrating to GKE. I also owned DR on-call for the live Argo and automated task platforms.",
      challenge:
        "Modernize the platform to Python and Argo Workflows on GKE while simultaneously shipping a production AI observability system and maintaining DR coverage for the live platform - including real incidents.",
      solution:
        "Rewrote the task platform in Python with native Argo Workflows support (−30% failure rate), built the multi-agent AI ops system with Claude Code and MCP servers (MTTD −40%, MTTR −30%), and delivered Terraform-driven GKE provisioning that cut deployment time 80%+. During a GCE AZ power outage, detected the failure, pulled the affected VM list, and ran our automated failover script to restore customer VMs - recovered in ~1 hour.",
    },
    highlights: [
      "Migrating the PowerShell-based automated task platform to Python for native Argo Workflows support; reduced task failure rates by 30%",
      "Built a production multi-agent AI system as a Claude Code skill - orchestrator runs agents concurrently against Prometheus, BigQuery, and gcloud APIs through MCP servers; cut MTTD 40%, MTTR 30%",
      "Leading the migration of VM workloads to Kubernetes-native Argo Workflows on GKE across a multi-region architecture; Terraform modules in CI/CD cut provisioning time by 80%+",
      "Handling DR on-call for the Argo and automated task platforms (GKE node failovers, VM backups, OSR image updates); executed region failovers during a data center power outage, recovering in ~1 hour",
    ],
    stack: ["Python", "GKE", "Argo Workflows", "Terraform", "Prometheus", "BigQuery", "MCP"],
    projectRef: "multi-agent",
  },
  {
    company: "University of Georgia",
    slug: "university-of-georgia",
    role: "Graduate Researcher (M.S. Thesis)",
    period: "Aug 2024 – Aug 2026",
    location: "Athens, GA",
    caseStudy: {
      situation:
        "Serverless workloads on cloud spot instances offer 70–90% cost savings but suffer frequent preemptions. Every prior system achieved reliability by blending in on-demand nodes, negating the cost advantage that motivated spot in the first place.",
      challenge:
        "Three compounding problems had to be solved: reactive checkpointing was too slow and created too much overhead to be useful; reactive autoscaling triggered after preemptions had already landed; and the retry service was single-threaded - retries queued linearly and hurt success rates rather than recovering them.",
      solution:
        "Switched to proactive scaling: Kaplan-Meier survival curves fit on emulator preemption traces give early warning, gating a Thompson Sampling bandit on live failure and cost data to scale before preemptions hit without overprovisioning. Rebuilt the retry service as a 50–100 thread concurrent executor - this single change delivered a 40–50% success rate boost. DAG-aware selective checkpointing kept overhead manageable. Result: 39% → 89.03% success at $0.018/run. Accepted at ACM Middleware '26.",
    },
    highlights: [
      "Designed and built FaaSpot (ACM Middleware '26): ~17.5K lines of Python running serverless DAG workflows on spot",
      "Built FaaSpot's Kubernetes platform from scratch: 16-node kubeadm VM cluster on bare metal running Fission, with NodePort routing and per-task ConfigMaps",
      "Wrote FaaSpot's two-layer autoscaler: Kaplan-Meier survival model gates a Thompson Sampling contextual bandit that scales Deployment replicas onto safer nodes, beating the best fixed policy by 11–17pp on success",
      "Built checkpoint and lineage-based retry controllers on transactional MySQL, resuming failed runs from the nearest checkpoint",
      "Raised workflow success from 39% (naive spot) to 89.03% at $0.018 per run - under half the best baseline's cost, 2.3× lower latency",
    ],
    stack: ["Python", "Kubernetes (kubeadm)", "Fission", "MySQL", "AWS Spot", "Prometheus"],
    projectRef: "faaspot",
  },
  {
    company: "American Express",
    slug: "american-express",
    role: "Site Reliability Engineer",
    period: "Jun 2022 – Jul 2024",
    location: "Atlanta, GA",
    caseStudy: {
      situation:
        "Two parallel workstreams. DevDash: developers constantly needed infrastructure resources (SQS contents, vault secrets, on-call contacts) via manual SRE Slack threads - slow for devs, a constant interrupt for the team. AWS Platform: 6 PCI-supporting production accounts had no systematic cost controls; spend climbing across oversized instances, idle resources, and autoscaling gaps.",
      challenge:
        "For DevDash: build a self-service approval-gated platform so developers can trigger infrastructure operations without direct production access. For AWS: reclaim $200K+/month in cloud spend without disrupting live PCI workloads while holding 99.9999% uptime under 24×7 on-call.",
      solution:
        "DevDash: TypeScript/Node.js platform where developer form submissions trigger Slack webhooks → SRE approves → Lambda executes (SQS fetch → zip → S3 → signed URL to dev's Slack), covering queue reads, vault secrets, and PagerDuty paging. AWS platform: Python rightsizing engine targeting all three waste categories cut $200K+/month; 24×7 on-call using Datadog, Dynatrace, and Splunk for incident detection and triage held <0.01% error rates; quarterly DR exercises failed over Aurora and EKS within 8-hour RTO.",
    },
    highlights: [
      "DevDash SQS workflow: developer submits queue name → Slack webhook → SRE approval → Lambda fetches contents, zips, stores in S3, returns signed URL to dev's Slack DM",
      "DevDash vault secret retrieval: same approval-gated Lambda pattern for sensitive credential delivery without direct prod access",
      "DevDash PagerDuty integration: live on-call schedule display, one-click paging from the platform",
      "Built TypeScript/Node.js REST API backend for DevDash, used by 50–100 engineers",
      "Operated shared AWS platform services across 6 PCI-supporting production accounts at 99.9999% uptime: EKS, RDS/Aurora (PostgreSQL), IAM, S3, Lambda, and multi-account VPC networking (Transit Gateway, peering)",
      "Improved cost and capacity with Python-driven rightsizing and autoscaling, cutting cloud spend by $200K+/month",
      "Led 24×7 on-call using Datadog, Dynatrace, and Splunk for incident detection and triage; held <0.01% error-rate SLO across all services; cut MTTD 50% and MTTR 35%",
      "Planned and ran quarterly DR exercises, failing over Aurora/RDS and EKS within 8-hour RTO/RPO targets",
    ],
    stack: ["TypeScript", "Node.js", "AWS EKS", "Aurora/RDS", "Terraform", "Datadog", "Dynatrace", "Splunk", "Python"],
    projectRef: ["devdash", "aws-platform"],
  },
  {
    company: "NCR Corporation",
    slug: "ncr-corporation",
    role: "Software Engineer",
    period: "Jul 2021 – Jun 2022",
    location: "Atlanta, GA",
    caseStudy: {
      situation:
        "NCR's backend team maintained Java Spring Boot microservices on GKE handling 10K+ req/min, with a REST API layer that was aging toward performance limits and a gateway migration to Apigee X underway.",
      challenge:
        "Improve API throughput and availability while migrating 20–30 APIs to a new gateway platform without service disruption, and own on-call reliability for the migrated services.",
      solution:
        "Adopted gRPC for high-frequency paths, migrated 20–30 APIs to Apigee X improving performance 30%, and profiled bottlenecks through load testing. Owned on-call availability with fast pod-level remediation to restore service during incidents.",
    },
    highlights: [
      "Built multi-threaded Java Spring Boot microservices and REST APIs on GKE at 10K+ req/min on PostgreSQL with RBAC",
      "Adopted gRPC for high-frequency paths and migrated 20-30 REST APIs to Apigee X, improving performance 30%",
      "Implemented FedRAMP compliance controls across the microservices platform for government contract eligibility",
      "Owned on-call availability throughout the migration, triaging failures and restoring service via pod-level remediation",
    ],
    stack: ["Java", "Spring Boot", "GKE", "gRPC", "Apigee X", "PostgreSQL", "FedRAMP"],
    projectRef: "ncr-apigee",
  },
];

export const education = [
  {
    degree: "M.S. Computer Science",
    school: "University of Georgia",
    year: "Aug 2026",
    note: "Thesis: FaaSpot - accepted at ACM Middleware '26",
  },
  {
    degree: "B.S. Computer Science",
    school: "Georgia Institute of Technology",
    year: "May 2021",
    note: "",
  },
];

export const certs = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    status: "Active",
  },
  {
    name: "GCP Professional Cloud Network Engineer",
    status: "In Progress",
  },
];

export type Photo = {
  id: string;
  src: string;        // e.g. "/photos/mountain-sunrise.jpg"
  title: string;
  location: string;
  date: string;
  story: string;
  tags: string[];
};

export const photos: Photo[] = [
  {
    id: "bobby-dodd-under-the-lights",
    src: "/photos/bobby-dodd-under-the-lights.jpg",
    title: "Bobby Dodd Under the Lights",
    location: "Atlanta, GA",
    date: "October 2023",
    story:
      "Go Jackets! Night games at Bobby Dodd hit differently. The lights turn the field into something almost cinematic - the crowd packed in, the glow cutting through the Atlanta night. There's a particular kind of energy in a stadium after dark that daylight games just can't replicate.",
    tags: ["stadium", "night", "sports", "atlanta", "georgia tech"],
  },
  {
    id: "total-eclipse",
    src: "/photos/total-eclipse.jpg",
    title: "Totality",
    location: "Ohio",
    date: "April 2024",
    story:
      "I happened to be visiting family in Ohio on April 8, 2024 - which put me right inside the path of totality for the Great North American Solar Eclipse. When it happened, the temperature dropped, the birds went quiet, and day turned to night in the middle of the afternoon. Two minutes and seven seconds of totality felt like standing inside something impossible.",
    tags: ["astronomy", "eclipse", "nature", "ohio"],
  },
  {
    id: "sanford-stadium",
    src: "/photos/sanford-stadium.jpg",
    title: "Between the Hedges",
    location: "Athens, GA",
    date: "October 2024",
    story:
      "Go Dawgs! Sanford Stadium hits different when you're a Dawg. The hedges are one of the oldest traditions in college football - teams have been playing between them since 1929. There's a reverence to the place that you feel the moment you walk through the gate.",
    tags: ["stadium", "uga", "football", "georgia"],
  },
  {
    id: "luray-caverns",
    src: "/photos/luray-caverns.jpg",
    title: "Underground Cathedral",
    location: "Luray, VA",
    date: "August 2025",
    story:
      "Luray Caverns in the Shenandoah Valley is one of those places that genuinely stops you. Stalactites and stalagmites that have been growing for millions of years, formations so massive and symmetric they look architectural. The scale of geological time hits hard when you're standing inside it.",
    tags: ["cave", "geology", "virginia", "underground"],
  },
  {
    id: "vintage-planes-above-the-clouds",
    src: "/photos/vintage-planes-above-the-clouds.jpg",
    title: "Above the Clouds",
    location: "Wings Over North Georgia · Rome, GA",
    date: "October 2025",
    story:
      "My friend and I drove out to Wings Over North Georgia in Rome specifically to see the Blue Angels - and they canceled. But the show went on with vintage warbirds and formation flyers, and honestly this shot made the trip worth it. Two aircraft punching through a broken cloud layer, silhouetted against the sky. Sometimes the plan B is the better photograph.",
    tags: ["aviation", "airshow", "clouds", "vintage", "georgia"],
  },
  {
    id: "aurora-lake",
    src: "/photos/aurora-lake.jpg",
    title: "Southern Lights",
    location: "Lake Lanier, GA",
    date: "November 2025",
    story:
      "Aurora borealis in Georgia. A geomagnetic storm pushed the Kp index high enough that the northern lights were visible this far south - and Lake Lanier provided a perfect mirror. Seeing the aurora dance above a Georgia lake felt genuinely surreal. Most people I know didn't even know it was happening.",
    tags: ["aurora", "night sky", "georgia", "lake"],
  },
  {
    id: "dc-cherry-blossom",
    src: "/photos/dc-cherry-blossom.jpg",
    title: "Peak Bloom",
    location: "Washington, D.C.",
    date: "April 2026",
    story:
      "Peak bloom on the Tidal Basin. The National Park Service tracks it to within days and the window is short - maybe a week of full bloom before wind and rain strip the petals. I got lucky with a calm afternoon and soft light. The pink against the grey of the city felt like the city had briefly forgotten to be serious.",
    tags: ["spring", "dc", "cherry blossoms", "tidal basin"],
  },
  {
    id: "washington-monument",
    src: "/photos/washington-monument.jpg",
    title: "The Obelisk",
    location: "Washington, D.C.",
    date: "April 2026",
    story:
      "The Washington Monument is one of those structures that photographs poorly until it doesn't. Finding the right angle and the right sky turns it from a landmark into a composition. The sheer verticality of it - 555 feet of marble and granite - still commands the skyline the way it was designed to.",
    tags: ["dc", "architecture", "monument", "landmark"],
  },
  {
    id: "arlington-cemetary",
    src: "/photos/arlington-cemetary.jpg",
    title: "Arlington",
    location: "Arlington, VA",
    date: "April 2026",
    story:
      "Rows of white headstones extending in every direction, perfectly aligned no matter the angle you look. Arlington is one of those places that enforces a particular kind of quiet - it's not solemn in a sad way, it's the quiet of something that deserves to be taken seriously. To every service member resting here: thank you. The freedoms we live with every day were paid for by the people beneath these markers, and walking among them is a reminder that none of it was free.",
    tags: ["memorial", "history", "dc", "virginia"],
  },
  // ── North Cascades National Park ──────────────────────────────
  {
    id: "diablo-lake",
    src: "/photos/diablo-lake.jpg",
    title: "Glacial Turquoise",
    location: "North Cascades National Park, WA",
    date: "August 2026",
    story:
      "The first time you see Diablo Lake you think the color can't be real - a deep, almost Caribbean turquoise sitting in the middle of the North Cascades. It's glacial flour suspended in the water, fine rock particles ground off by the glaciers above that scatter light in a way that produces that impossible blue-green. It looks photoshopped. It isn't.",
    tags: ["lake", "north cascades", "national park", "pnw"],
  },
  // ── Olympic National Park ──────────────────────────────────────
  {
    id: "crescent-lake",
    src: "/photos/crescent-lake.jpg",
    title: "Crescent Mirror",
    location: "Olympic National Park, WA",
    date: "August 2026",
    story:
      "Crescent Lake in Olympic National Park on a calm morning is as close to a perfect mirror as I've ever seen. The Olympics reflect in the water so cleanly you have to look twice to find the actual horizon. Part of a cousins trip through Washington state - this was one of those stops where nobody wanted to leave.",
    tags: ["lake", "olympic national park", "reflection", "pnw"],
  },
  {
    id: "hall-of-mosses",
    src: "/photos/hall-of-mosses.jpg",
    title: "Hall of Mosses",
    location: "Olympic National Park · Hoh Rainforest, WA",
    date: "August 2026",
    story:
      "The Hoh Rainforest on the Olympic Peninsula receives up to 14 feet of rain per year, and you feel every inch of it in the moss. Ancient bigleaf maples draped floor to canopy in deep green, the light filtered down soft and diffuse. The Hall of Mosses trail is short - barely a mile - but it feels like walking through a different continent.",
    tags: ["rainforest", "moss", "olympic national park", "hoh"],
  },
  // ── Mount Rainier National Park ────────────────────────────────
  {
    id: "rainier-douglas-fir",
    src: "/photos/rainier-douglas-fir.jpg",
    title: "Standing Watch",
    location: "Mount Rainier National Park, WA",
    date: "August 2026",
    story:
      "A Douglas fir framing the summit. Rainier dominates the skyline at 14,411 feet - visible from Seattle on clear days, looming over everything in its orbit. Standing at its base with old-growth forest in the foreground, you realize how much of Washington's identity is just this mountain.",
    tags: ["mountain", "forest", "mount rainier", "national park"],
  },
  {
    id: "rainier-reflection-lake",
    src: "/photos/rainier-reflection-lake.jpg",
    title: "Mirror Mountain",
    location: "Mount Rainier National Park, WA",
    date: "August 2026",
    story:
      "Reflection Lake lives up to its name. When the wind dies and the surface goes glassy, the volcano sits doubled in the water - summit to summit. We drove the loop road around the south side of the park specifically to catch this, and the timing held. One of those shots where the conditions do the work.",
    tags: ["mountain", "reflection", "mount rainier", "national park"],
  },
  {
    id: "rainier-parking-lot",
    src: "/photos/rainier-parking-lot.jpg",
    title: "The Volcano Up Close",
    location: "Mount Rainier National Park, WA",
    date: "August 2026",
    story:
      "Sometimes the best view is the one right in front of you. Rainier from the Paradise area at 5,400 feet - glaciers close enough to feel present, summit clear. It's technically just a parking lot, but a parking lot with one of the best views in the country.",
    tags: ["mountain", "glacier", "mount rainier", "paradise"],
  },
];
