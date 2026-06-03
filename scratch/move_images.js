const fs = require('fs');
const path = require('path');

const rootDir = "d:\\Starlingads\\RAS AL ASSAD\\DEV\\Ras-Al-Assad";
const projectsDir = path.join(rootDir, "public/assets/Projects");

// Delete all old files in public/assets/Projects/
if (fs.existsSync(projectsDir)) {
  const files = fs.readdirSync(projectsDir);
  for (const file of files) {
    const filePath = path.join(projectsDir, file);
    if (fs.statSync(filePath).isFile()) {
      console.log("Deleting old file in Projects directory:", filePath);
      fs.unlinkSync(filePath);
    }
  }
} else {
  fs.mkdirSync(projectsDir, { recursive: true });
}

// List all active project images in public/assets/Ras Images/ and public/assets/Ras Images/REMASTERED/
const rasImagesDir = path.join(rootDir, "public/assets/Ras Images");
const remasteredDir = path.join(rasImagesDir, "REMASTERED");

const activeFiles = [];

function collectFiles(dir) {
  if (fs.existsSync(dir)) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const itemPath = path.join(dir, item);
      if (fs.statSync(itemPath).isFile() && !item.endsWith('.zip')) {
        const relativeOldPath = path.relative(path.join(rootDir, "public"), itemPath).replace(/\\/g, '/');
        const oldUrl = "/" + relativeOldPath;
        const newUrl = "/assets/Projects/" + item;
        activeFiles.push({
          oldDiskPath: itemPath,
          newDiskPath: path.join(projectsDir, item),
          oldUrl: oldUrl,
          newUrl: newUrl
        });
      }
    }
  }
}

collectFiles(rasImagesDir);
collectFiles(remasteredDir);

console.log("Collected active files:", activeFiles.length);

// Move files to public/assets/Projects
for (const fileInfo of activeFiles) {
  console.log(`Moving: ${fileInfo.oldDiskPath} -> ${fileInfo.newDiskPath}`);
  fs.renameSync(fileInfo.oldDiskPath, fileInfo.newDiskPath);
}

// Update references in the codebase
const filesToUpdate = [
  path.join(rootDir, "src/app/en/projects/ProjectsClient.tsx"),
  path.join(rootDir, "src/app/en/services/ServicesClient.tsx"),
  path.join(rootDir, "src/components/ExpertiseSlider.tsx"),
  path.join(rootDir, "src/components/Hero.tsx"),
  path.join(rootDir, "src/components/ProjectsSlider.tsx")
];

for (const filePath of filesToUpdate) {
  if (fs.existsSync(filePath)) {
    console.log(`Updating references in: ${filePath}`);
    let fileContent = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    for (const fileInfo of activeFiles) {
      if (fileContent.includes(fileInfo.oldUrl)) {
        fileContent = fileContent.split(fileInfo.oldUrl).join(fileInfo.newUrl);
        updated = true;
      }
    }
    if (updated) {
      fs.writeFileSync(filePath, fileContent, 'utf8');
      console.log(`Updated and saved: ${filePath}`);
    }
  }
}

console.log("Moving and reference updates completed successfully.");
