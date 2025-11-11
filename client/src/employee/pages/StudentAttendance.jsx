import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const StudentAttendance = () => {
  const [date, setDate] = useState("");
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB").split("/").join("-"); // e.g. 08-11-2025
    setDate(formattedDate);

    // ✅ This URL includes date as query param
    const formURL = `https://host-crm-gamma.vercel.app/student-form?date=${encodeURIComponent(formattedDate)}`;
    setQrValue(formURL);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-purple-700">
        📅 Attendance QR Generator
      </h1>

      <p className="text-lg mb-6">
        Date: <strong>{date}</strong>
      </p>

      {qrValue && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          {/* ✅ The QR code now includes date in URL */}
          <QRCodeCanvas value={qrValue} size={200} />
        </div>
      )}

      <p className="mt-6 text-gray-600 text-center">
        Share this QR in the class — students can scan it to mark attendance for <strong>{date}</strong>.
      </p>
    </div>
  );
};

export default StudentAttendance;