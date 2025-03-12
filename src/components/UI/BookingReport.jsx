import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import imageDocument from "../../assets/all-images/login/Black and Orange Car Rent Logo.png";

// Define styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica', // Ensure a clean font for better readability
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 50,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#333",
    },
    section: {
        marginBottom: 20,
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
        color: "#555",
    },
    footer: {
        marginTop: 20,
        paddingTop: 20,
        borderTop: "1px solid #ddd",
        textAlign: "center",
        fontSize: 10,
        color: "#777",
    },
    footerDetails: {
        fontSize: 10,
        color: "#777",
        marginTop: 5,
    },
});

const BookingReport = ({ booking, UserDatafroReport }) => (
    <Document>
        <Page style={styles.page}>
            {/* Header Section */}
            <View style={styles.header}>
                <Image src={imageDocument} style={styles.logo} />
                <Text style={styles.heading}>Mega City Car Services</Text>
            </View>

            {/* Payment Receipt Title */}
            <Text style={styles.title}>Payment Receipt</Text>

            {/* Booking and User Details */}
            <View style={styles.section}>
                <Text style={styles.text} x={50} y={50}>Transaction ID: {booking.transactionId}</Text>
                <Text style={styles.text} x={50} y={50}>User ID: {UserDatafroReport.userId}</Text>
                <Text style={styles.text} x={50} y={50}>User Email: {UserDatafroReport.userEmail}</Text>
                <Text style={styles.text} x={50} y={50}>Amount Paid: LKR {booking.paymentAmount}</Text>
                <Text style={styles.text} x={50} y={50}> Status: {booking.paymentStatus}</Text>
            </View>

            {/* Footer Section */}
            <View style={styles.footer}>
                <Text>Thank you for choosing Mega City Car Services for your transportation needs. Our mission is to provide you with reliable, comfortable, and safe travel experiences. Should you have any inquiries or require further assistance, please don’t hesitate to contact us.</Text>
                <Text style={styles.footerDetails}>Email: contact@megacitycarservices.com</Text>
                <Text style={styles.footerDetails}>Phone: +94 123 456 789</Text>
                <Text style={styles.footerDetails}>Website: www.megacitycarservices.com</Text>
            </View>
        </Page>
    </Document>
);

export default BookingReport;
