import { Bundle } from '@/types';

export const bundles: Bundle[] = [
  {
    id: 'bundle-programming-starter',
    name: 'Programming Starter Bundle',
    slug: 'programming-starter-bundle',
    description: 'Master core programming fundamentals, OOP concepts, Python advanced features, and foundational DSA algorithms.',
    includedNoteIds: ['note-java-core', 'note-python-advanced', 'note-dsa-mastery-cheatsheet'],
    includedCategoryIds: ['cat-programming', 'cat-dsa'],
    includedResourcesCount: 3,
    includedPdfCount: 3,
    price: 199,
    originalPrice: 237,
    savings: 'Save 58%',
    badge: 'BEGINNER FRIENDLY',
    status: 'POPULAR',
    isDemo: true,
    whoItsFor: [
      'Computer Science students starting coding',
      'Engineers switching to Java & Python languages',
      'Developers preparing for first-round coding interviews'
    ],
    benefits: [
      'Covers Java OOP + Python advanced concepts side-by-side',
      'Includes 14 LC algorithmic patterns cheat sheet',
      'Over 440+ interview questions covered with answers'
    ]
  },
  {
    id: 'bundle-backend-developer',
    name: 'Backend Developer Mastery Bundle',
    slug: 'backend-developer-mastery-bundle',
    description: 'Complete backend mastery suite: Java Core, Spring Boot Microservices, Node.js Event Loop, SQL & DBMS Internals, Redis.',
    includedNoteIds: ['note-java-core', 'note-spring-boot-microservices', 'note-nodejs-internals', 'note-sql-dbms-internals'],
    includedCategoryIds: ['cat-programming', 'cat-backend', 'cat-database'],
    includedResourcesCount: 4,
    includedPdfCount: 4,
    price: 199,
    originalPrice: 499,
    savings: 'Save 56%',
    badge: 'BESTSELLER',
    status: 'BESTSELLER',
    isDemo: true,
    whoItsFor: [
      'Backend Software Engineers (SDE-1 to SDE-2)',
      'Java/Spring Boot & Node.js application developers',
      'Engineers preparing for backend system design & coding rounds'
    ],
    benefits: [
      'Deep dive into JVM, Spring IoC, Kafka & Node.js event loop',
      'Database indexing & SQL query tuning secrets',
      'Lifetime access with all future backend notes included'
    ]
  },
  {
    id: 'bundle-system-design',
    name: 'System Design Interview Bundle',
    slug: 'system-design-interview-bundle',
    description: 'Ace high-level & low-level design rounds with visual architecture blueprints, CAP theorem, distributed databases & HLD case studies.',
    includedNoteIds: ['note-system-design-hld-lld', 'note-devops-docker-k8s', 'note-sql-dbms-internals'],
    includedCategoryIds: ['cat-system-design', 'cat-devops', 'cat-database'],
    includedResourcesCount: 3,
    includedPdfCount: 3,
    price: 199,
    originalPrice: 499,
    savings: 'Save 57%',
    badge: 'INTERVIEW ESSENTIAL',
    status: 'POPULAR',
    isDemo: true,
    whoItsFor: [
      'Mid to Senior Software Engineers (SDE-2, SDE-3, Tech Leads)',
      'Solutions Architects & Infrastructure Engineers',
      'Anyone preparing for HLD & LLD interview rounds'
    ],
    benefits: [
      'Real-world blueprints for WhatsApp, Netflix, Rate Limiter & Uber',
      'Covers Docker, Kubernetes & Distributed Databases',
      'Step-by-step interview trade-off matrix'
    ]
  },
  {
    id: 'bundle-sdet-qa',
    name: 'QA & SDET Preparation Bundle',
    slug: 'qa-sdet-preparation-bundle',
    description: 'Comprehensive QA automation package covering Selenium, Playwright, RestAssured API testing, BDD Cucumber & Core CS fundamentals.',
    includedNoteIds: ['note-sdet-testing-handbook', 'note-cs-fundamentals-os-cn', 'note-python-advanced'],
    includedCategoryIds: ['cat-testing', 'cat-cs', 'cat-programming'],
    includedResourcesCount: 3,
    includedPdfCount: 3,
    price: 199,
    originalPrice: 499,
    savings: 'Save 57%',
    badge: 'SDET SPECIAL',
    status: 'NEW',
    isDemo: true,
    whoItsFor: [
      'QA Engineers, Manual Testers transitioning to Automation/SDET',
      'Test Automation Engineers',
      'SDET candidates preparing for technical automation rounds'
    ],
    benefits: [
      'Framework architecture from scratch (POM, PageFactory, ExtentReports)',
      'API testing automation with RestAssured & Postman',
      'Python scripting + CS networking basics for QA'
    ]
  },
  {
    id: 'bundle-devops-cloud',
    name: 'DevOps & Cloud Engineer Bundle',
    slug: 'devops-cloud-engineer-bundle',
    description: 'Master cloud infrastructure: Docker, Kubernetes, AWS Services, Terraform IaC, networking protocols, and CI/CD pipelines.',
    includedNoteIds: ['note-devops-docker-k8s', 'note-cs-fundamentals-os-cn', 'note-system-design-hld-lld'],
    includedCategoryIds: ['cat-devops', 'cat-cs', 'cat-system-design'],
    includedResourcesCount: 3,
    includedPdfCount: 3,
    price: 199,
    originalPrice: 499,
    savings: 'Save 57%',
    badge: 'CLOUD MASTER',
    status: 'POPULAR',
    isDemo: true,
    whoItsFor: [
      'DevOps Engineers & Site Reliability Engineers (SRE)',
      'Cloud Solution Engineers (AWS/Azure/GCP)',
      'Developers moving into Cloud & Platform Engineering'
    ],
    benefits: [
      'Handwritten Kubernetes cluster architecture & CNI networking',
      'AWS VPC, Subnets, IAM security policies & Terraform modules',
      'System design principles for scalable infrastructure'
    ]
  },
  {
    id: 'bundle-ai-engineering',
    name: 'AI Engineering & GenAI Bundle',
    slug: 'ai-engineering-genai-bundle',
    description: 'Modern AI stack: Machine Learning mathematics, Transformer architectures, LLM fine-tuning, RAG pipelines & Python advanced.',
    includedNoteIds: ['note-ai-ml-llm-handbook', 'note-python-advanced', 'note-dsa-mastery-cheatsheet'],
    includedCategoryIds: ['cat-ai', 'cat-programming', 'cat-dsa'],
    includedResourcesCount: 3,
    includedPdfCount: 3,
    price: 199,
    originalPrice: 499,
    savings: 'Save 56%',
    badge: 'HOT & TRENDING',
    status: 'NEW',
    isDemo: true,
    whoItsFor: [
      'AI/ML Engineers & GenAI Application Developers',
      'Data Scientists building LLM pipelines',
      'Software Developers transitioning into AI Engineering'
    ],
    benefits: [
      'Visual intuition for Self-Attention, QKV matrices & RAG architecture',
      'Vector DB search algorithms & LangChain/LlamaIndex concepts',
      'Advanced Python code structures for ML model inference'
    ]
  },
  {
    id: 'bundle-complete-developer',
    name: 'Complete All-Access Developer Bundle',
    slug: 'complete-all-access-developer-bundle',
    description: 'Get immediate lifetime access to ALL current and future notes across all categories in one ultimate package.',
    includedNoteIds: [
      'note-java-core', 'note-python-advanced', 'note-spring-boot-microservices',
      'note-nodejs-internals', 'note-dsa-mastery-cheatsheet', 'note-system-design-hld-lld',
      'note-sdet-testing-handbook', 'note-devops-docker-k8s', 'note-sql-dbms-internals',
      'note-cs-fundamentals-os-cn', 'note-ai-ml-llm-handbook', 'note-10-min-revision-handbook',
      'note-quant-reasoning-shortcuts'
    ],
    includedCategoryIds: [
      'cat-programming', 'cat-backend', 'cat-dsa', 'cat-system-design',
      'cat-testing', 'cat-devops', 'cat-database', 'cat-cs', 'cat-ai',
      'cat-handbooks', 'cat-aptitude'
    ],
    includedResourcesCount: 160,
    includedPdfCount: 13,
    price: 199,
    originalPrice: 499,
    savings: 'Save 70%',
    badge: 'MAX VALUE',
    status: 'BESTSELLER',
    isDemo: true,
    whoItsFor: [
      'Software engineers preparing for end-to-end technical interviews',
      'Students looking for a 360-degree computer science library',
      'Learners who want lifetime access to all future added notes'
    ],
    benefits: [
      'Access to all 160+ notes & 1,200+ interview questions',
      'Includes all 11 category collections',
      'Lifetime updates: automatically receive every newly published note for FREE'
    ]
  }
];
