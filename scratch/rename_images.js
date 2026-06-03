const fs = require('fs');
const path = require('path');

const rootDir = "d:\\Starlingads\\RAS AL ASSAD\\DEV\\Ras-Al-Assad";
const projectsClientPath = path.join(rootDir, "src/app/en/projects/ProjectsClient.tsx");
const servicesClientPath = path.join(rootDir, "src/app/en/services/ServicesClient.tsx");
const expertiseSliderPath = path.join(rootDir, "src/components/ExpertiseSlider.tsx");
const heroPath = path.join(rootDir, "src/components/Hero.tsx");
const projectsSliderPath = path.join(rootDir, "src/components/ProjectsSlider.tsx");

// Read ProjectsClient.tsx
if (!fs.existsSync(projectsClientPath)) {
  console.error("ProjectsClient.tsx not found!");
  process.exit(1);
}
let content = fs.readFileSync(projectsClientPath, 'utf8');

const imageMap = {}; // oldPath -> newPath

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Regex to find project names and images in the data array
const projectRegex = /name:\s*["']([^"']+)["'][\s\S]*?image:\s*["']([^"']+)["']/g;
let match;

while ((match = projectRegex.exec(content)) !== null) {
  const name = match[1];
  const imgPath = match[2];
  
  if (imgPath.includes('WhatsApp') || imgPath.includes('Asset') || imgPath.match(/\/\d+\.jpg$/)) {
    const ext = path.extname(imgPath);
    const isRemastered = imgPath.includes('REMASTERED');
    const slug = slugify(name);
    const newName = slug + ext;
    const newPath = isRemastered 
      ? `/assets/Ras Images/REMASTERED/${newName}` 
      : `/assets/Ras Images/${newName}`;
      
    imageMap[imgPath] = newPath;
  }
}

// Additional manual mappings for common utility or structural images used elsewhere
imageMap["/assets/Ras Images/REMASTERED/WhatsApp Image 2026-03-03 at 3_x4.20.31 PM.jpg"] = "/assets/Ras Images/REMASTERED/substation-engineering.jpg";
imageMap["/assets/Ras Images/REMASTERED/WhatsApp Image 2026-03-03 at 3_x4.57.35 PM.jpg"] = "/assets/Ras Images/REMASTERED/operations-maintenance.jpg";

console.log("Found", Object.keys(imageMap).length, "images to rename.");

// Rename physical files on disk
for (const [oldPath, newPath] of Object.entries(imageMap)) {
  const oldDiskPath = path.join(rootDir, "public", oldPath.replace(/\//g, path.sep));
  const newDiskPath = path.join(rootDir, "public", newPath.replace(/\//g, path.sep));
  
  if (fs.existsSync(oldDiskPath)) {
    console.log(`Renaming: ${oldDiskPath} -> ${newDiskPath}`);
    // Ensure directory exists
    const dir = path.dirname(newDiskPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.renameSync(oldDiskPath, newDiskPath);
  } else {
    console.log(`File not found (already renamed or wrong path): ${oldDiskPath}`);
  }
}

// Update references in all relevant files
const filesToUpdate = [
  projectsClientPath,
  servicesClientPath,
  expertiseSliderPath,
  heroPath,
  projectsSliderPath
];

for (const filePath of filesToUpdate) {
  if (fs.existsSync(filePath)) {
    console.log(`Updating references in: ${filePath}`);
    let fileContent = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    for (const [oldPath, newPath] of Object.entries(imageMap)) {
      if (fileContent.includes(oldPath)) {
        fileContent = fileContent.split(oldPath).join(newPath);
        updated = true;
      }
    }
    if (updated) {
      fs.writeFileSync(filePath, fileContent, 'utf8');
      console.log(`Updated and saved: ${filePath}`);
    }
  }
}

console.log("Renaming completed successfully.");
