// Test script to verify the API endpoint
const testAPI = async () => {
  console.log('🧪 Testing SmRise AI API...\n');
  
  try {
    const response = await fetch('http://localhost:3000/api/transcribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw' // "Me at the zoo" - YouTube's first video
      }),
    });

    console.log('📡 Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Test Successful!');
      console.log('📹 Video Title:', data.videoTitle);
      console.log('⏱️ Duration:', data.videoDuration);
      console.log('📝 Summary length:', data.summary?.length || 0, 'characters');
      console.log('🎤 Transcript length:', data.transcript?.length || 0, 'characters');
    } else {
      const error = await response.json();
      console.log('❌ API Test Failed:');
      console.log('   Error:', error.error);
      if (error.details) {
        console.log('   Details:', error.details);
      }
    }
  } catch (error) {
    console.log('❌ API Test Error:', error.message);
  }
};

// Run the test
testAPI(); 