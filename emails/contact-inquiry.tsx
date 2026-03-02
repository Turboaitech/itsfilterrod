import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from '@react-email/components';
import type { ContactFormValues } from '@/lib/validations';

interface ContactInquiryEmailProps {
  data: ContactFormValues;
}

export default function ContactInquiryEmail({ data }: ContactInquiryEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f6f6', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ backgroundColor: '#ffffff', padding: '40px', margin: '40px auto', borderRadius: '8px', maxWidth: '600px' }}>
          <Heading style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>
            New Contact Inquiry
          </Heading>
          <Hr />

          <Section style={{ marginTop: '20px' }}>
            <Text style={{ fontSize: '16px', color: '#555', margin: '8px 0' }}>
              <strong>Name:</strong> {data.name}
            </Text>
            <Text style={{ fontSize: '16px', color: '#555', margin: '8px 0' }}>
              <strong>Email:</strong> {data.email}
            </Text>
            <Text style={{ fontSize: '16px', color: '#555', margin: '8px 0' }}>
              <strong>Phone:</strong> {data.phone}
            </Text>
            {data.message && (
              <Text style={{ fontSize: '16px', color: '#555', margin: '8px 0' }}>
                <strong>Message:</strong> {data.message}
              </Text>
            )}
          </Section>

          {(data.designLength || data.circumferenceLength || data.resistanceLength) && (
            <>
              <Hr style={{ margin: '20px 0' }} />
              <Heading as="h3" style={{ color: '#333', fontSize: '18px' }}>
                Product Specifications
              </Heading>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Specification</th>
                    <th style={thStyle}>Design Value</th>
                    <th style={thStyle}>Operation Range +/-</th>
                  </tr>
                </thead>
                <tbody>
                  {data.designLength && (
                    <tr>
                      <td style={tdStyle}>Length</td>
                      <td style={tdStyle}>{data.designLength}</td>
                      <td style={tdStyle}>{data.designRange || '-'}</td>
                    </tr>
                  )}
                  {data.circumferenceLength && (
                    <tr>
                      <td style={tdStyle}>Circumference</td>
                      <td style={tdStyle}>{data.circumferenceLength}</td>
                      <td style={tdStyle}>{data.circumferenceRange || '-'}</td>
                    </tr>
                  )}
                  {data.resistanceLength && (
                    <tr>
                      <td style={tdStyle}>Suction Resistance</td>
                      <td style={tdStyle}>{data.resistanceLength}</td>
                      <td style={tdStyle}>{data.resistanceRange || '-'}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '12px', color: '#999' }}>
            This email was sent from the contact form at itsfilterrod.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const thStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f0f0f0',
  textAlign: 'center',
  fontSize: '14px',
};

const tdStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
  fontSize: '14px',
};
