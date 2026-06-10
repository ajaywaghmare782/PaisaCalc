const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const htmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(htmlPath)) {
  console.error(`HTML file not found at: ${htmlPath}`);
  process.exit(1);
}

// 1. Read index.html
let html = fs.readFileSync(htmlPath, 'utf8');

// 2. Find the stylesheet link tag
const cssLinkRegex = /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/;
const match = html.match(cssLinkRegex);

if (match) {
  const cssRelativePath = match[1]; // e.g. "/assets/index-Cv2dGN8x.css"
  const cssFilePath = path.join(distDir, cssRelativePath);
  
  if (fs.existsSync(cssFilePath)) {
    // 3. Read the CSS file content
    const cssContent = fs.readFileSync(cssFilePath, 'utf8');
    
    // 4. Replace the link tag with inline style tag
    html = html.replace(cssLinkRegex, `<style>${cssContent}</style>`);
    
    // 5. Write the html back
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`Successfully inlined CSS from ${cssRelativePath}`);
    
    // 6. Delete the physical CSS file to prevent external request loading
    try {
      fs.unlinkSync(cssFilePath);
      console.log(`Deleted physical CSS file: ${cssFilePath}`);
    } catch (err) {
      console.error('Error deleting CSS file:', err);
    }
  } else {
    console.error(`CSS file not found at: ${cssFilePath}`);
  }
} else {
  console.log('No CSS link tag found in index.html');
}
