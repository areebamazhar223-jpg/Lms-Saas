const palettes = [
  ["#1d3124", "#30684a", "#e5efe6"],
  ["#1d3124", "#30684a", "#e5efe6"],
  ["#064e3b", "#10b981", "#a7f3d0"],
  ["#7c2d12", "#f97316", "#fed7aa"],
  ["#30684a", "#96ae97", "#f5f7f1"],
  ["#881337", "#f43f5e", "#fecdd3"],
];

const localCourseAssets = import.meta.glob("../assets/courses/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  import: "default",
  query: "?url",
});

const imageKeywords = [
  ["agenticaicourse", "agentic-ai-course"],
  ["msoffice", "office-productivity-course"],
  ["nodejsbackenddevelopment", "node-backend-course"],
  ["sqldatabasefundamentals", "sql-database-course"],
  ["deeplearningcourse", "deep-learning-course"],
  ["powerbidatavisualization", "power-bi-course"],
  ["advancedexcelcourse", "advanced-excel-course"],
  ["powerpointpresentationskills", "powerpoint-course"],
  ["promptengineeringcourse", "prompt"],
  ["appdevelopmentcourse", "mobile-app-development-course"],
  ["graphicdesignfundamentals", "canva"],
  ["uiuxdesigncourse", "uiux"],
  ["dataanalysiscourse", "Datasciences"],
  ["machinelearningcourse", "data-science-course"],
  ["dataanalyticscourse", "data-analytics-applied-ai-course"],
  ["datasciencecourse", "excel-data-analysis"],
  ["llmcourse", "llm-course"],
  ["largelanguagemodel", "chatgpt-productivity"],
  ["chatgptforproductivity", "chatgpt-productivity"],
  ["mern", "full-stack-software-engineering-course"],
  ["reactcourse", "react"],
  ["wordpressshortcourse", "wordpress"],
  ["3dmodeling", "3d-modeling-course"],
  ["blender", "3d-modeling-course"],
  ["shopifydropshipping", "shopify-dropshipping-course"],
  ["dropshipping", "shopify-dropshipping-course"],
  ["shopify", "shopify-dropshipping-course"],
  ["fullstacksoftwareengineering", "full-stack-software-engineering-course"],
  ["softwareengineering", "full-stack-software-engineering-course"],
  ["dataanalytics", "data-analytics-applied-ai-course"],
  ["appliedai", "data-analytics-applied-ai-course"],
  ["datascience", "data-science-course"],
  ["cybersecurity", "cyber-security-course"],
  ["informationsecurity", "cyber-security-course"],
  ["cloudcomputing", "cloud-computing-course"],
  ["mobileappdevelopment", "mobile-app-development-course"],
  ["appdevelopment", "mobile-app-development-course"],
  ["androiddevelopment", "mobile-app-development-course"],
  ["iosdevelopment", "mobile-app-development-course"],
  ["softwaredevelopment", "react"],
  ["fullstack", "full-stack-software-engineering-course"],
  ["aiapps", "ai"],
  ["machinelearning", "datasciences"],
  ["largelanguagemodel", "chatgpt-productivity"],
  ["entrepreneurship", "digital-marketing"],
  ["startup", "digital-marketing"],
  ["virtualassistant", "chatgpt-productivity"],
  ["businessintelligence", "datasciences"],
  ["quickbooks", "excel-data-analysis"],
  ["accounting", "excel-data-analysis"],
  ["digitalmarketing", "digital-marketing"],
  ["excel", "excel-data-analysis"],
  ["figma", "figma-uiux"],
  ["uiux", "uiux"],
  ["chatgpt", "chatgpt-productivity"],
  ["canva", "canva"],
  ["generativeai", "generativeai"],
  ["artificialintelligence", "ai"],
  ["prompt", "prompt"],
  ["wordpress", "wordpress"],
  ["mongodb", "mongodb"],
  ["javascript", "js"],
  ["react", "react"],
  ["python", "python"],
  ["html", "html"],
  ["css", "css"],
];

const categoryImageRules = [
  [/3d|blender|modeling/i, "3d-modeling-course"],
  [/cyber|security|infosec/i, "cyber-security-course"],
  [/cloud computing|aws|azure|gcp/i, "cloud-computing-course"],
  [/mobile app|app development|android|ios/i, "mobile-app-development-course"],
  [/entrepreneur|startup|business|marketing|shopify|commerce|sales|freelanc/i, "digital-marketing"],
  [/virtual assistant|assistant|customer service|communication|support/i, "chatgpt-productivity"],
  [/data|analytics|intelligence|statistics|sql/i, "datasciences"],
  [/quickbooks|accounting|bookkeep|office|excel|finance/i, "excel-data-analysis"],
  [/legal|law|compliance|drafting/i, "figma-uiux"],
  [/design|ui|ux|figma|graphic|3d|webflow|animation/i, "figma-uiux"],
  [/artificial intelligence|generative ai|chatgpt|machine learning|prompt/i, "ai"],
  [/wordpress|woocommerce|elementor/i, "wordpress"],
  [/python|programming|coding|developer|web|mern|react|javascript|mobile app|game development/i, "react"],
];

const findLocalCourseAsset = (assetName) => {
  const wanted = assetName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const entries = Object.entries(localCourseAssets);
  const exactMatch = entries.find(([file]) => {
    const basename = file.split("/").at(-1).replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]/g, "");
    return basename === wanted;
  });
  return (exactMatch || entries.find(([file]) =>
    file.toLowerCase().replace(/[^a-z0-9]/g, "").includes(wanted),
  ))?.[1];
};

export const getCourseTopicImage = (course = {}) => {
  const courseText = `${course.title || ""} ${course.category || ""}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  const match = imageKeywords.find(([keyword]) => courseText.includes(keyword));
  return match ? findLocalCourseAsset(match[1]) || null : null;
};

export const getCourseFallbackImage = (course = {}) => {
  if (course.image) {
    const wantedImage = String(course.image).toLowerCase().replace(/[^a-z0-9]/g, "");
    const demoAsset = Object.entries(localCourseAssets).find(([file]) =>
      file.toLowerCase().replace(/[^a-z0-9]/g, "").includes(wantedImage.replace(/(jpg|jpeg|png|webp)$/, "")),
    );
    if (demoAsset) return demoAsset[1];
  }
  const topicImage = getCourseTopicImage(course);
  if (topicImage) return topicImage;

  const categoryRule = categoryImageRules.find(([pattern]) => pattern.test(`${course.title || ""} ${course.category || ""}`));
  if (categoryRule) {
    const asset = findLocalCourseAsset(categoryRule[1]);
    if (asset) return asset;
  }

  const availableAssets = Object.values(localCourseAssets);
  if (availableAssets.length) {
    const stableKey = `${course.title || ""} ${course.category || ""}`;
    const hash = Array.from(stableKey).reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 7);
    return availableAssets[hash % availableAssets.length];
  }

  return getCourseArtwork(course);
};

export const getCourseDescription = (description = "") =>
  String(description).replace(/\s*(?:\||·|[\r\n])?\s*thumbnail\s*:\s*[\s\S]*$/i, "").trim();

const topicIndex = (course = {}) => {
  const topic = `${course.category || ""} ${course.title || ""}`.toLowerCase();
  if (/design|ui|ux|figma|graphic/.test(topic)) return 1;
  if (/data|analytics|excel|sql/.test(topic)) return 2;
  if (/business|marketing|finance|seo/.test(topic)) return 3;
  if (/ai|machine|python|coding|program|web|developer|javascript/.test(topic)) return 4;
  if (/short|quick/.test(topic)) return 5;
  return 0;
};

export const getCourseArtwork = (course = {}) => {
  const [dark, accent, pale] = palettes[topicIndex(course)];
  const title = String(course.title || "Learn something new").replace(/[&<>"']/g, " ").slice(0, 34);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${dark}"/><stop offset="1" stop-color="${accent}"/></linearGradient><pattern id="p" width="36" height="36" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#fff" opacity=".16"/></pattern></defs><rect width="800" height="500" fill="url(#g)"/><rect width="800" height="500" fill="url(#p)"/><circle cx="640" cy="100" r="150" fill="#fff" opacity=".08"/><circle cx="680" cy="410" r="130" fill="${pale}" opacity=".13"/><path d="M470 330l110-160 125 160z" fill="${pale}" opacity=".2"/><rect x="74" y="76" width="76" height="9" rx="4.5" fill="${pale}" opacity=".8"/><text x="74" y="263" fill="#fff" font-family="Arial,sans-serif" font-size="42" font-weight="700">${title.replace(/&/g, "&amp;")}</text><text x="76" y="310" fill="#fff" opacity=".78" font-family="Arial,sans-serif" font-size="18" letter-spacing="4">LEARNSMART · COURSE</text><rect x="76" y="350" width="96" height="5" rx="2.5" fill="${pale}" opacity=".8"/></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

