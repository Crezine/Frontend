import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';

// Register Montserrat font for the PDF
Font.register({
  family: 'Montserrat',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm4dfWnxBsh4.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm4dfWz4Bsh4.ttf', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm4dfWDjBsh4.ttf', fontWeight: 700 },
  ],
});

// Register Rubik font for the PDF
Font.register({
  family: 'Rubik',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/rubik/v28/iJWKBXyifDnIV7nFrXyw.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/rubik/v28/iJWKBXyifDnIV7nFjXyw.ttf', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fff',
    fontFamily: 'Montserrat',
  },
  ticketContainer: {
    border: '1pt solid #f3f4f6',
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
  },
  blueHeader: {
    height: 120,
    backgroundColor: '#2563eb', // blue-600
    padding: 4,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  body: {
    padding: 20,
  },
  eventName: {
    fontSize: 22,
    color: '#AB3625', // secondary
    fontWeight: 500,
    textAlign: 'left',
    marginBottom: 15,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTop: '0.5pt solid #f3f4f6',
    borderBottom: '0.5pt solid #f3f4f6',
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '30%',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 9,
    fontWeight: 700,
    fontFamily: 'Rubik',
    color: '#000',
    marginBottom: 4,
  },
  value: {
    fontSize: 10,
    fontWeight: 500,
    color: '#000',
  },
  qrSection: {
    alignItems: 'center',
    marginTop: 15,
  },
  qrBox: {
    width: 130,
    height: 130,
    backgroundColor: 'rgba(171, 54, 37, 0.05)',
    borderRadius: 15,
    border: '0.5pt solid rgba(171, 54, 37, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 8,
  },
  qrImage: {
    width: 110,
    height: 110,
  },
  scanText: {
    fontSize: 11,
    color: '#AB3625',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    borderTop: '1pt dashed #e5e7eb',
    marginVertical: 10,
    position: 'relative',
  }
});

interface TicketPDFProps {
  data: {
    eventName: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    checkInType: string;
    orderId: string;
    location: string;
    eventImage: string;
  };
}

const TicketPDF: React.FC<TicketPDFProps> = ({ data }) => {
  // Using a QR code API to generate the image for the PDF
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data.orderId}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.ticketContainer}>
          {/* Top Blue Section */}
          <View style={styles.blueHeader}>
            <View style={styles.imageWrapper}>
              <Image src={data.eventImage} style={styles.eventImage} />
            </View>
          </View>

          {/* Ticket Body */}
          <View style={styles.body}>
            <Text style={styles.eventName}>{data.eventName}</Text>

            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.value}>{data.eventDate}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Start time</Text>
                <Text style={styles.value}>{data.startTime}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>End time</Text>
                <Text style={styles.value}>{data.endTime}</Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.label}>Check in type</Text>
                <Text style={styles.value}>{data.checkInType}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Order id</Text>
                <Text style={styles.value}>{data.orderId}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Location</Text>
                <Text style={styles.value}>{data.location}</Text>
              </View>
            </View>

            <View style={styles.qrSection}>
              <View style={styles.qrBox}>
                <Image src={qrCodeUrl} style={styles.qrImage} />
              </View>
              <Text style={styles.scanText}>Scan to verify</Text>
            </View>
          </View>

          {/* Aesthetic Cutout Placeholder */}
          <View style={styles.divider} />
        </View>
      </Page>
    </Document>
  );
};

export default TicketPDF;
