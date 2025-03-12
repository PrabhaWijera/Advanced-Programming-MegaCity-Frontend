import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 20 },
    section: { marginBottom: 10 },
    title: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
    text: { fontSize: 12 },
});

const BookingReport = ({ booking, UserDatafroReport }) => (

    <Document>
        <Page style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}  x={100} y={100}>Payment Receipt</Text>
                <Text style={styles.text} x={100} y={100}>Transaction ID: {booking.transactionId}</Text>
                <Text style={styles.text}  x={100} y={100}>User ID: {UserDatafroReport.userId}</Text>
                <Text style={styles.text}  x={100} y={100}>User Email: {UserDatafroReport.userEmail}</Text>
                <Text style={styles.text} x={100} y={100}>Amount Paid: LKR {booking.paymentAmount}</Text>
                <Text style={styles.text}  x={100} y={100}>Status: {booking.paymentStatus}</Text>
            </View>
        </Page>
    </Document>
);

export default BookingReport;
