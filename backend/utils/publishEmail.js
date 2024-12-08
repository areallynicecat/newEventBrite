import { config } from 'dotenv';
import mailgun from 'mailgun-js';

config();

const mg = mailgun({
  apiKey: process.env.MAILGUNKEY,
  domain: process.env.MAILGUNDOMAIN,
});

// send email to users
const sendEmailToUsers = async (subject, body) => {
  try {
    // fetch all emails
    const response = await fetch('http://localhost:3005/emails');
    
    if (!response.ok) {
      throw new Error('Failed to fetch emails');
    }

    const data = await response.json();
    if (data && data.emails && data.emails.length > 0) {
      const emailList = data.emails;

      // looping through the list for emails
      for (let email of emailList) {
        const emailData = {
          from: '<mailgun@sandbox68cec7b1eb084a3e924022a1b9caec1e.mailgun.org>',
          to: email,
          subject: subject, 
          text: body,       
        };

        try {
          const result = await mg.messages().send(emailData);
          console.log(`Email sent to ${email}:`, result);
        } catch (error) {
          console.error(`Failed to send email to ${email}:`, error);
        }
      }
    } else {
      console.error('No emails found in the response data');
    }
  } catch (error) {
    console.error('Error fetching emails:', error);
  }
};

export const sendBulkEmail = async (req, res) => {
  // getting the subject and body from the request body
  const { subject, body } = req.body;  // Corrected from req.params to req.body

  if (!subject || !body) {
    return res.status(400).json({ message: 'Subject and body are required' });
  }

  try {
    // sending email to all users
    await sendEmailToUsers(subject, body);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending emails', error: error.message });
  }
};
