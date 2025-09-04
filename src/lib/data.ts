import type { Course, BlogPost, Resource, NavItem } from "@/lib/types";

export const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Courses", href: "/courses" },
  { title: "Blog", href: "/blog" },
  { title: "Career Guidance", href: "/career" },
  { title: "Resources", href: "/resources" },
  { title: "Contact", href: "/contact" },
];

export const courses: Course[] = [
  {
    id: "ms-office",
    title: "MS Office Suite",
    description: "Master the complete Microsoft Office Suite, including Word, Excel, and PowerPoint.",
    duration: "4 Weeks",
    fees: "₹4,000",
    syllabus: ["Word Processing", "Spreadsheet Management", "Presentation Skills", "Outlook Basics"],
    image: "https://picsum.photos/seed/office-suite/600/400",
  },
  {
    id: "advanced-excel",
    title: "Advanced Excel",
    description: "Unlock the full potential of Excel with advanced formulas, pivot tables, and data analysis.",
    duration: "6 Weeks",
    fees: "₹6,000",
    syllabus: ["Advanced Formulas", "PivotTables & PivotCharts", "Data Validation & Protection", "Macros & VBA"],
    image: "https://picsum.photos/seed/excel-spreadsheet/600/400",
  },
  {
    id: "tally-erp",
    title: "Tally with GST",
    description: "Learn Tally ERP 9 with a focus on GST compliance, accounting, and inventory management.",
    duration: "5 Weeks",
    fees: "₹5,500",
    syllabus: ["Company Creation", "Ledger Management", "GST Taxation", "Payroll & Reporting"],
    image: "https://picsum.photos/seed/accounting-software/600/400",
  },
  {
    id: "programming-basics",
    title: "Programming Basics (C/C++)",
    description: "Build a strong foundation in programming with the fundamentals of C and C++.",
    duration: "8 Weeks",
    fees: "₹8,000",
    syllabus: ["Variables & Data Types", "Control Structures", "Functions & Pointers", "Object-Oriented Programming"],
    image: "https://picsum.photos/seed/programming-code/600/400",
  },
  {
    id: "web-design",
    title: "Web Design (HTML, CSS, JS)",
    description: "Create stunning, responsive websites using HTML, CSS, and JavaScript from scratch.",
    duration: "10 Weeks",
    fees: "₹12,000",
    syllabus: ["HTML5 & Semantic Tags", "CSS3 & Flexbox/Grid", "JavaScript DOM Manipulation", "Responsive Design"],
    image: "https://picsum.photos/seed/web-design-code/600/400",
  },
  {
    id: "powerpoint-pro",
    title: "PowerPoint Pro",
    description: "Design and deliver compelling presentations with advanced PowerPoint techniques.",
    duration: "3 Weeks",
    fees: "₹3,000",
    syllabus: ["Advanced Slide Design", "Animation & Transitions", "Master Slides & Templates", "Interactive Presentations"],
    image: "https://picsum.photos/seed/presentation-design/600/400",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "top-20-ms-word-shortcuts",
    title: "Top 20 MS Word Shortcuts to Boost Your Productivity",
    date: "2024-07-28",
    author: "Admin",
    category: "Productivity",
    tags: ["MS Word", "Shortcuts", "Tips"],
    image: "https://picsum.photos/seed/ms-word-document/800/450",
    content: `
      <h2>Introduction to MS Word Shortcuts</h2>
      <p>Microsoft Word is one of the most widely used word processors in the world. While many are familiar with its basic features, mastering keyboard shortcuts can dramatically increase your efficiency. In this article, we'll explore 20 essential shortcuts that every Word user should know.</p>

      <h3>Basic Formatting Shortcuts</h3>
      <ul>
        <li><strong>Ctrl + B:</strong> Bold selected text.</li>
        <li><strong>Ctrl + I:</strong> Italicize selected text.</li>
        <li><strong>Ctrl + U:</strong> Underline selected text.</li>
        <li><strong>Ctrl + C:</strong> Copy selected text.</li>
        <li><strong>Ctrl + V:</strong> Paste copied text.</li>
        <li><strong>Ctrl + X:</strong> Cut selected text.</li>
      </ul>

      <h3>Navigation and Selection</h3>
      <p>Moving around a document quickly is key. Instead of endless scrolling, try these:</p>
      <ul>
        <li><strong>Ctrl + Home:</strong> Go to the beginning of the document.</li>
        <li><strong>Ctrl + End:</strong> Go to the end of the document.</li>
        <li><strong>Shift + Arrow Key:</strong> Select text character by character or line by line.</li>
        <li><strong>Ctrl + Shift + Arrow Key:</strong> Select text word by word or paragraph by paragraph.</li>
      </ul>

      <h3>Advanced Shortcuts</h3>
      <p>Ready to level up? These shortcuts handle more complex tasks.</p>
      <ol>
        <li><strong>Ctrl + K:</strong> Insert a hyperlink.</li>
        <li><strong>Ctrl + F:</strong> Open the Find dialog.</li>
        <li><strong>Ctrl + H:</strong> Open the Replace dialog.</li>
        <li><strong>Ctrl + S:</strong> Save the document.</li>
        <li><strong>Ctrl + P:</strong> Print the document.</li>
        <li><strong>Ctrl + Z:</strong> Undo the last action.</li>
        <li><strong>Ctrl + Y:</strong> Redo the last action.</li>
        <li><strong>F7:</strong> Run a spelling and grammar check.</li>
        <li><strong>Shift + F3:</strong> Change the case of selected text (lowercase, UPPERCASE, Title Case).</li>
        <li><strong>Ctrl + Enter:</strong> Insert a page break.</li>
      </ol>

      <p>By incorporating these shortcuts into your daily workflow, you'll find yourself working faster and more effectively in Microsoft Word. Practice them regularly, and they'll soon become second nature.</p>
    `,
  },
  {
    slug: "best-computer-courses-after-12th",
    title: "Best Computer Courses to Pursue After 12th Grade",
    date: "2024-07-25",
    author: "Admin",
    category: "Career Guidance",
    tags: ["Courses", "Career", "Students"],
    image: "https://picsum.photos/seed/career-student/800/450",
    content: `
      <h2>Navigating Your Career Path</h2>
      <p>Completing 12th grade is a significant milestone, and choosing the right career path is the next crucial step. The IT industry offers a plethora of opportunities, and the right computer course can set you up for success. This guide highlights some of the best computer courses to consider.</p>

      <h3>1. Web Development</h3>
      <p>The demand for web developers is ever-increasing. A comprehensive course in web development typically covers HTML, CSS, JavaScript, and popular frameworks like React or Angular. It's a creative field that blends design with programming.</p>

      <h3>2. Data Science and Analytics</h3>
      <p>Data is the new oil. Companies across industries need professionals who can analyze data to derive meaningful insights. A course in data science will teach you Python, R, SQL, and various machine learning algorithms.</p>

      <h3>3. Digital Marketing</h3>
      <p>If you're interested in the business side of tech, digital marketing is an excellent choice. This field involves SEO, SEM, social media marketing, and content strategy to help businesses grow their online presence.</p>

      <h3>4. Tally and Advanced Excel</h3>
      <p>For those inclined towards finance and accounting, mastering Tally and Advanced Excel is essential. These skills are highly valued in corporate finance departments and are fundamental for managing business accounts.</p>

      <h3>5. Graphic Design</h3>
      <p>If you have a creative flair, graphic design can be a rewarding career. Learn tools like Adobe Photoshop, Illustrator, and InDesign to create visual content for brands, websites, and marketing campaigns.</p>

      <p>Choosing a course depends on your interests and career goals. Research each field, understand the job prospects, and pick a course that aligns with your passion. At MTech IT Institute, we offer specialized training in many of these areas to help you get started.</p>
    `,
  },
  {
    slug: "excel-tips-for-beginners",
    title: "10 Essential Excel Tips for Beginners",
    date: "2024-07-22",
    author: "Admin",
    category: "Tutorials",
    tags: ["Excel", "Beginners", "Tips"],
    image: "https://picsum.photos/seed/excel-tips/800/450",
    content: `
      <h2>Getting Started with Excel</h2>
      <p>Microsoft Excel can seem intimidating at first, but with a few tips, you can quickly become proficient. Here are 10 essential tips for beginners to help you get started.</p>

      <ol>
        <li><strong>Use Flash Fill:</strong> Excel can detect patterns. If you're manually entering data that follows a pattern (like extracting first names from a full name), try Flash Fill (Ctrl + E).</li>
        <li><strong>Master Basic Formulas:</strong> Learn SUM, AVERAGE, COUNT, MIN, and MAX. These are the building blocks of most spreadsheets.</li>
        <li><strong>Freeze Panes:</strong> When working with large datasets, use "Freeze Panes" to keep your headers visible as you scroll.</li>
        <li><strong>Create Tables:</strong> Convert your data range into an Excel Table (Ctrl + T). This makes sorting, filtering, and formatting much easier.</li>
        <li><strong>Use Conditional Formatting:</strong> Highlight important data automatically based on rules you set. For example, color-code cells with values above a certain threshold.</li>
        <li><strong>Learn VLOOKUP:</strong> VLOOKUP is a powerful function for finding and retrieving data from a specific column in a table.</li>
        <li><strong>Sort and Filter:</strong> Easily organize and find data using Excel's powerful sorting and filtering capabilities.</li>
        <li><strong>Create Basic Charts:</strong> Visualize your data with charts. Select your data and use the "Recommended Charts" feature to get started.</li>
        <li><strong>Use Keyboard Shortcuts:</strong> Just like in Word, shortcuts like Ctrl + C, Ctrl + V, and Ctrl + Z will save you a lot of time.</li>
        <li><strong>Protect Your Sheets:</strong> If you're sharing your workbook, you can protect certain cells or entire sheets to prevent accidental changes.</li>
      </ol>
      <p>These tips are just the beginning. The more you use Excel, the more comfortable you'll become with its vast array of features. Our Advanced Excel course can take your skills to the next level.</p>
    `,
  },
];

export const resources: Resource[] = [
    {
        id: '1',
        title: 'MS Word Shortcut Cheatsheet',
        description: 'A handy PDF with all the essential MS Word shortcuts.',
        type: 'PDF',
        fileUrl: '#'
    },
    {
        id: '2',
        title: 'Excel Practice Worksheet: Formulas',
        description: 'Practice your Excel formula skills with these exercises.',
        type: 'Worksheet',
        fileUrl: '#'
    },
    {
        id: '3',
        title: 'Basics of HTML Quiz',
        description: 'Test your knowledge of fundamental HTML concepts.',
        type: 'Quiz',
        fileUrl: '#'
    },
    {
        id: '4',
        title: 'Tally ERP 9 Notes',
        description: 'Comprehensive notes covering the basics of Tally.',
        type: 'PDF',
        fileUrl: '#'
    },
     {
        id: '5',
        title: 'Advanced Excel Cheatsheet',
        description: 'A cheatsheet for advanced excel formulas and functions.',
        type: 'PDF',
        fileUrl: '#'
    }
]

    