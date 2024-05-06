const fs = require('fs-extra');

async function copyViewsFolder() {
  try {
    // Ensure the dist directory exists
    await fs.ensureDir('dist');
    await fs.ensureDir('src');

    // Copy the views folder to dist
    await fs.copy('src/views', 'dist/views');
    
    //console.log('Views folder copied successfully!');
  } catch (err) {
    console.error('Error copying views folder:', err);
  }
}

copyViewsFolder();