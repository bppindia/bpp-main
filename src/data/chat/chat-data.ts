interface ChatQuestion {
    id: number;
    text: string;
    answer: string;
    suggestions: string[];
    keywords: string[];
}

export const chatData = {
    questions: [
        {
            id: 1,
            text: "I forgot my password. How can I reset it?",
            answer: "To reset your password:\n1. Click on 'Forgot Password'\n2. Enter your email address\n3. Check your email for reset instructions\n4. Follow the link to create a new password",
            suggestions: ["Account Security", "Login Issues", "Email Not Received"],
            keywords: ["password", "reset", "forgot", "login", "can't login", "change password", "new password", "access"]
        },
        {
            id: 2,
            text: "How can I change my profile picture?",
            answer: "To change your profile picture:\n1. Go to 'Settings' in the app.\n2. Select 'Profile'.\n3. Tap on your current picture.\n4. Choose a new picture from your gallery or take a new one.",
            suggestions: ["Profile Settings", "Edit Profile", "Upload Issues"],
            keywords: ["profile", "picture", "change", "edit", "update", "photo"]
        },
        {
            id: 3,
            text: "Why am I unable to log in to my account?",
            answer: "If you're unable to log in:\n1. Ensure your email and password are correct.\n2. Check your internet connection.\n3. Reset your password if you've forgotten it.\n4. Contact support if the issue persists.",
            suggestions: ["Forgot Password", "Account Locked", "Support"],
            keywords: ["login", "can't login", "issue", "unable", "access", "sign in"]
        },
        {
            id: 4,
            text: "What file formats are supported for uploading my documents?",
            answer: "The app supports the following file formats for uploads:\n1. PDF\n2. JPG\n3. PNG\nEnsure your file meets these requirements.",
            suggestions: ["Upload Guidelines", "Document Issues", "File Types"],
            keywords: ["file", "format", "upload", "document", "support", "type"]
        },
        {
            id: 5,
            text: "The upload button isn’t working. Can you help me?",
            answer: "If the upload button isn’t working:\n1. Check your internet connection.\n2. Ensure your app is updated to the latest version.\n3. Restart the app and try again.\n4. Contact support if the problem persists.",
            suggestions: ["App Update", "Internet Issues", "Support"],
            keywords: ["upload", "button", "issue", "problem", "help"]
        },
        {
            id: 6,
            text: "How do I upload my voter ID or other documents?",
            answer: "To upload your voter ID or other documents:\n1. Go to the 'Documents' section in the app.\n2. Click on 'Upload Documents'.\n3. Select the file from your device and follow the prompts.",
            suggestions: ["Document Upload", "File Guidelines", "Supported Formats"],
            keywords: ["upload", "voter ID", "document", "how to", "file"]
        },
        {
            id: 7,
            text: "My file is too large to upload. How can I reduce its size?",
            answer: "To reduce your file size:\n1. Use an online file compression tool.\n2. Reduce the resolution of images.\n3. Split large PDF files into smaller ones.\n4. Ensure the file meets the size requirements.",
            suggestions: ["Compression Tools", "File Size Limits", "Upload Tips"],
            keywords: ["file", "size", "large", "upload", "reduce", "compress"]
        },
        {
            id: 8,
            text: "How can I donate to the party through the app?",
            answer: "To donate through the app:\n1. Open the app and navigate to the 'Donate' section.\n2. Choose your donation amount.\n3. Select your payment method and complete the transaction.",
            suggestions: ["Donation Methods", "Payment Issues", "Support"],
            keywords: ["donate", "app", "payment", "support", "contribute"]
        },
        {
            id: 9,
            text: "What payment methods are accepted for donations?",
            answer: "We accept the following payment methods:\n1. Credit/Debit Cards\n2. Online Banking\n3. Mobile Wallets\n4. UPI",
            suggestions: ["Payment Options", "Transaction Issues", "Support"],
            keywords: ["payment", "method", "donation", "card", "UPI", "wallet"]
        },
        {
            id: 10,
            text: "Can I track my past donations in the app?",
            answer: "Yes, you can track your past donations:\n1. Go to the 'Donations' section in the app.\n2. View your donation history, including amounts and dates.",
            suggestions: ["Donation History", "Transaction Details", "Support"],
            keywords: ["donation", "history", "track", "past", "record"]
        },
        {
            id: 11,
            text: "Where can I find the latest election news and updates?",
            answer: "To find the latest election news:\n1. Visit the 'News' section in the app.\n2. Subscribe to push notifications for real-time updates.\n3. Follow our official social media channels.",
            suggestions: ["Election News", "Updates", "Notifications"],
            keywords: ["election", "news", "updates", "latest", "information"]
        },
        {
            id: 12,
            text: "Where can I find volunteer opportunities in my area?",
            answer: "To find volunteer opportunities:\n1. Visit the 'Volunteer' section in the app.\n2. Browse opportunities by location.\n3. Sign up for events or campaigns in your area.",
            suggestions: ["Volunteer Signup", "Local Events", "Community Service"],
            keywords: ["volunteer", "opportunities", "area", "help", "local"]
        },
        {
            id: 13,
            text: "Can I see a list of local Representatives?",
            answer: "To see a list of local Representatives:\n1. Open the app and go to the 'Representatives' section.\n2. Search by area or constituency to find your local leader.",
            suggestions: ["Find Representatives", "Local Leaders", "Constituency Info"],
            keywords: ["representative", "list", "local", "leader", "area"]
        },
        {
            id: 14,
            text: "I can’t access certain features. What may be the issue?",
            answer: "If you can't access certain features:\n1. Ensure you’re using the latest app version.\n2. Check your account permissions.\n3. Clear app cache and restart.\n4. Contact support if the issue persists.",
            suggestions: ["Feature Issues", "App Update", "Support"],
            keywords: ["features", "access", "issue", "problem", "help"]
        },
        {
            id: 15,
            text: "How can I invite my friends to download the app?",
            answer: "To invite your friends:\n1. Go to the 'Invite' section in the app.\n2. Share the invite link via email, SMS, or social media.\n3. Encourage your friends to join and explore the app.",
            suggestions: ["Share App", "Invite Friends", "Download Link"],
            keywords: ["invite", "friends", "download", "app", "share"]
        },
        {
            id: 16,
            text: "How do I give feedback on the app?",
            answer: "To give feedback:\n1. Go to the 'Feedback' section in the app.\n2. Fill out the feedback form.\n3. Submit your suggestions, issues, or compliments.",
            suggestions: ["Feedback Form", "App Improvement", "Support"],
            keywords: ["feedback", "suggestion", "issue", "comment", "improve"]
        }
    ],
    contactOptions: {
        whatsapp: "+1 234-567-8900",
        email: "bpp.headoffice@gmail.com",
        phone: "1-800-123-4567"
    },
    resolutionOptions: [
        {
            id: "resolved",
            text: "Yes, my issue is resolved",
            response: "Great! Glad we could help. If you have any more questions, feel free to ask!"
        },
        {
            id: "unresolved",
            text: "No, I need more help",
            response: "I'm sorry to hear that. Here are ways to get additional support:"
        }
    ]
};

// Helper function to find matching question
export function findMatchingQuestion(input: string): ChatQuestion | null {
    const normalizedInput = input.toLowerCase().trim();
    
    // First try exact keyword match
    const exactMatch = chatData.questions.find(question =>
        question.keywords.some(keyword => 
            normalizedInput.includes(keyword.toLowerCase())
        )
    );
    if (exactMatch) return exactMatch;

    // Then try fuzzy matching
    const words = normalizedInput.split(' ');
    for (const question of chatData.questions) {
        const matchCount = words.filter(word =>
            question.keywords.some(keyword => 
                keyword.toLowerCase().includes(word) || 
                word.includes(keyword.toLowerCase())
            )
        ).length;
        
        // If more than 50% of words match keywords, consider it a match
        if (matchCount / words.length > 0.5) {
            return question;
        }
    }

    return null;
}