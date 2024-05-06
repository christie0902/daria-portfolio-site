import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';

// Function to get all .ejs files recursively in the views directory
function getEjsFiles(dir) {
  const files = readdirSync(dir, { withFileTypes: true });
  let ejsFiles= [];

  files.forEach(file => {
    if (file.isDirectory()) {
      ejsFiles = ejsFiles.concat(getEjsFiles(resolve(dir, file.name)));
    } else if (file.name.endsWith('.ejs')) {
      ejsFiles.push(resolve(dir, file.name));
    }
  });

  return ejsFiles;
}

export default defineConfig({
  // Other configurations...
  build: {
    outDir: 'dist',
    assetsDir: '.',
    // Copy static assets
    assetsInlineLimit: 0,
    assetsInclude: ['**/*.ejs'] // Include .ejs files in the build
  }
});