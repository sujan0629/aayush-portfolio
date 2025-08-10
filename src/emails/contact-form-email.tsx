import * as React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export default function ContactFormEmail({ name, email, message }: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from your portfolio site</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Contact Form Submission</Heading>
          <Section>
            <Text style={paragraph}>You have received a new message from your portfolio's contact form.</Text>
            <Hr style={hr} />
            <Text style={paragraph}><strong>From:</strong> {name}</Text>
            <Text style={paragraph}><strong>Email:</strong> {email}</Text>
            <Hr style={hr} />
            <Heading as="h2" style={subHeading}>Message:</Heading>
            <Text style={paragraph}>{message}</Text>
            <Hr style={hr} />
            <Text style={footer}>This email was sent from your portfolio website.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
  textAlign: 'center' as const,
};

const subHeading = {
    fontSize: '18px',
    lineHeight: '1.3',
    fontWeight: '700',
    color: '#484848',
}

const paragraph = {
  fontSize: '15px',
  lineHeight: '1.4',
  color: '#5b5f63',
  padding: '0 20px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 20px',
};
