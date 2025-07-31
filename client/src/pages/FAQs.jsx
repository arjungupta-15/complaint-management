import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fade,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import {
  ExpandMore,
  QuestionAnswer,
  Help,
  Info,
  Security,
  Speed,
  Support,
} from '@mui/icons-material';

const FAQs = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: <Help />,
      color: '#1976d2',
      questions: [
        {
          question: 'How do I submit a complaint?',
          answer: 'To submit a complaint, click on "Submit Complaint" in the navigation menu. Fill out the form with your email, department, category, and detailed description. You can also attach supporting files if needed. Once submitted, you\'ll receive a unique tracking ID.',
        },
        {
          question: 'What information do I need to provide?',
          answer: 'You need to provide your email address, select the relevant department, choose a complaint category, and write a detailed description of the issue. Optional attachments like photos or documents can help us better understand your concern.',
        },
        {
          question: 'How do I create an account?',
          answer: 'You don\'t need to create a separate account. Simply use your college email address to login with OTP verification. The system will automatically create your profile when you first submit a complaint.',
        },
      ],
    },
    {
      title: 'Tracking & Status',
      icon: <Speed />,
      color: '#2e7d32',
      questions: [
        {
          question: 'How do I track my complaint?',
          answer: 'Use the "Track Complaint" feature and enter your unique tracking ID that was provided when you submitted the complaint. You can view the current status, timeline, and any updates related to your complaint.',
        },
        {
          question: 'What are the different status types?',
          answer: 'Complaints can have three statuses: Pending (under review), Resolved (issue has been addressed), and Escalated (referred to higher authorities for complex issues).',
        },
        {
          question: 'How long does it take to resolve a complaint?',
          answer: 'Resolution time varies based on the complexity and priority of the issue. High-priority complaints like security or safety issues are typically addressed within 24-48 hours, while general complaints may take 3-5 business days.',
        },
        {
          question: 'Can I escalate my complaint?',
          answer: 'Yes, if your complaint has been pending for too long or you\'re not satisfied with the response, you can escalate it. Look for the "Escalate Complaint" button in your complaint details.',
        },
      ],
    },
    {
      title: 'Account & Security',
      icon: <Security />,
      color: '#ed6c02',
      questions: [
        {
          question: 'Is my information secure?',
          answer: 'Yes, we take data security seriously. All personal information is encrypted, and we follow strict privacy policies. Only authorized administrators can access complaint details, and your information is never shared with third parties.',
        },
        {
          question: 'What if I forget my tracking ID?',
          answer: 'If you\'re logged in, you can view all your complaints in the Dashboard. If you\'re not logged in, contact our support team with your email address, and we can help you locate your complaints.',
        },
        {
          question: 'Can I update my complaint after submission?',
          answer: 'Currently, you cannot edit a complaint after submission. However, you can add additional information by submitting a new complaint and referencing the original tracking ID in the description.',
        },
      ],
    },
    {
      title: 'Feedback & Support',
      icon: <Support />,
      color: '#9c27b0',
      questions: [
        {
          question: 'How do I provide feedback?',
          answer: 'Once your complaint is resolved, you can provide feedback by visiting the Feedback page. You can rate your experience (1-5 stars) and provide additional comments about the resolution process.',
        },
        {
          question: 'What if I\'m not satisfied with the resolution?',
          answer: 'If you\'re not satisfied with the resolution, you can reopen the complaint or escalate it to higher authorities. You can also provide detailed feedback explaining why the resolution was unsatisfactory.',
        },
        {
          question: 'How can I contact support?',
          answer: 'You can contact our support team through the "Contact Us" page. We typically respond within 24 hours during business days. For urgent issues, please use the emergency category when submitting complaints.',
        },
        {
          question: 'Are there any restrictions on complaint types?',
          answer: 'The system accepts complaints related to academic, administrative, facility, maintenance, security, and general issues. However, we do not handle personal disputes or issues that should be addressed through other official channels.',
        },
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Fade in timeout={800}>
        <Paper elevation={8} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <QuestionAnswer sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Frequently Asked Questions
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Find answers to common questions about the MaintaBIT Complaint Management System
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {faqCategories.map((category, categoryIndex) => (
              <Grid item xs={12} key={categoryIndex}>
                <Card sx={{ borderRadius: 2, mb: 2 }}>
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{
                        p: 3,
                        background: `linear-gradient(135deg, ${category.color}15, ${category.color}25)`,
                        borderBottom: 1,
                        borderColor: 'divider',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ color: category.color }}>
                          {category.icon}
                        </Box>
                        <Typography variant="h5" component="h2">
                          {category.title}
                        </Typography>
                      </Box>
                    </Box>

                    {category.questions.map((faq, faqIndex) => (
                      <Accordion
                        key={faqIndex}
                        expanded={expanded === `${categoryIndex}-${faqIndex}`}
                        onChange={handleChange(`${categoryIndex}-${faqIndex}`)}
                        sx={{
                          '&:before': { display: 'none' },
                          boxShadow: 'none',
                          borderBottom: 1,
                          borderColor: 'divider',
                        }}
                        className="cursor-target"
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          sx={{
                            '&:hover': {
                              backgroundColor: 'action.hover',
                            },
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            {faq.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                            {faq.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Additional Information */}
          <Box sx={{ mt: 6, p: 4, bgcolor: 'background.default', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Info color="primary" />
              Need More Help?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              If you couldn't find the answer to your question here, don't hesitate to reach out to our support team.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                label="Contact Support"
                color="primary"
                variant="outlined"
                className="cursor-target"
                onClick={() => window.location.href = '/contact'}
              />
              <Chip
                label="Submit New Complaint"
                color="secondary"
                variant="outlined"
                className="cursor-target"
                onClick={() => window.location.href = '/submit-complaint'}
              />
              <Chip
                label="View Dashboard"
                color="default"
                variant="outlined"
                className="cursor-target"
                onClick={() => window.location.href = '/dashboard'}
              />
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default FAQs; 