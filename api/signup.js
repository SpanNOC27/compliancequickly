export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    
    // Basic email validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    // For now, just log the email (we'll add email sending next)
    console.log('New signup:', email);
    
    // Send success response
    res.status(200).json({ 
      success: true, 
      message: 'Thank you for signing up! We\'ll notify you when Compliance Quickly launches.' 
    });
    
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
