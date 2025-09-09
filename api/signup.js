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

    // Send notification email using Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'signups@compliancequickly.com',
        to: 'sales@compliancequickly.com',
        subject: 'New Compliance Quickly Signup!',
        html: `
          <h2>New Email Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p>Someone is interested in Compliance Quickly!</p>
        `
      })
    });

    if (!resendResponse.ok) {
      throw new Error('Failed to send notification email');
    }
    
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
