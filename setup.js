#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 SmRise AI Setup');
console.log('==================\n');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local already exists');
  console.log('If you need to update your OpenAI API key, edit .env.local manually\n');
} else {
  console.log('📝 Setting up environment variables...\n');
  
  rl.question('Enter your OpenAI API key: ', (apiKey) => {
    if (!apiKey.trim()) {
      console.log('❌ API key is required. Please run setup again.');
      rl.close();
      return;
    }

    const envContent = `# OpenAI API Key - Get yours at https://platform.openai.com/api-keys
OPENAI_API_KEY=${apiKey.trim()}`;

    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env.local created successfully!');
    console.log('🔒 Your API key has been saved securely.\n');
    
    console.log('🎯 Next steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Open: http://localhost:3000');
    console.log('3. Paste a YouTube URL and test the app!\n');
    
    rl.close();
  });
}

// Check FFmpeg installation
const { execSync } = require('child_process');
try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
  console.log('✅ FFmpeg is installed');
} catch (error) {
  console.log('❌ FFmpeg not found');
  console.log('Please install FFmpeg:');
  console.log('  macOS: brew install ffmpeg');
  console.log('  Ubuntu: sudo apt install ffmpeg');
  console.log('  Windows: Download from https://ffmpeg.org/download.html\n');
}

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
if (majorVersion >= 18) {
  console.log(`✅ Node.js ${nodeVersion} is compatible`);
} else {
  console.log(`❌ Node.js ${nodeVersion} detected`);
  console.log('Please upgrade to Node.js 18 or higher\n');
}

console.log('🎉 Setup complete! Your SmRise AI app is ready to use.'); 