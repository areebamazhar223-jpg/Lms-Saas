import { Download, Share2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Certificate.css';

export default function Certificate() {
  const { certificateId } = useParams();
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef(null);

  // Mock data - Replace with API call
  const certificate = {
    id: certificateId || '12345',
    studentName: 'John Doe',
    courseName: 'Full-Stack Web Development',
    instructor: 'Sarah Johnson',
    completionDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    score: 95,
    certificateNumber: `LS-2024-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const element = certificateRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#fff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${certificate.studentName}-Certificate.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    setIsDownloading(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'LearnSmart Certificate',
        text: `I just completed ${certificate.courseName} on LearnSmart!`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="certificate-page">
      <div className="certificate-container">
        <div className="certificate-actions">
          <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="btn-download"
          >
            <Download size={18} />
            {isDownloading ? 'Downloading...' : 'Download PDF'}
          </button>
          <button onClick={handleShare} className="btn-share">
            <Share2 size={18} />
            Share Certificate
          </button>
        </div>

        {/* Certificate Design */}
        <div className="certificate-wrapper" ref={certificateRef}>
          <div className="certificate">
            {/* Background Pattern */}
            <div className="certificate-bg">
              <div className="bg-pattern-top"></div>
              <div className="bg-pattern-bottom"></div>
            </div>

            {/* Header Section */}
            <div className="cert-header">
              <div className="cert-logo">
                <span className="logo-text">📚</span>
              </div>
              <h1 className="cert-title">Certificate of Completion</h1>
              <p className="cert-subtitle">LearnSmart Learning Platform</p>
            </div>

            {/* Border Decoration */}
            <div className="cert-border">
              <div className="border-top"></div>
              <div className="border-bottom"></div>
            </div>

            {/* Content Section */}
            <div className="cert-content">
              <p className="cert-intro">This certificate is proudly presented to</p>
              
              <h2 className="cert-name">{certificate.studentName}</h2>
              
              <p className="cert-text">
                For successfully completing the course
              </p>
              
              <h3 className="cert-course">{certificate.courseName}</h3>
              
              <p className="cert-text">
                With a score of <strong>{certificate.score}%</strong>
              </p>

              <div className="cert-details">
                <div className="detail-item">
                  <span className="detail-label">Instructor:</span>
                  <span className="detail-value">{certificate.instructor}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Completed:</span>
                  <span className="detail-value">{certificate.completionDate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Certificate ID:</span>
                  <span className="detail-value">{certificate.certificateNumber}</span>
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div className="cert-signature">
              <div className="signature-item">
                <div className="signature-line"></div>
                <p className="signature-name">LearnSmart Director</p>
              </div>
              <div className="signature-item">
                <div className="signature-date">{certificate.completionDate}</div>
                <p className="signature-label">Date</p>
              </div>
            </div>

            {/* Footer */}
            <div className="cert-footer">
              <p>This certificate verifies that the above-named person has successfully completed the course and earned this Certificate of Completion.</p>
              <p className="cert-website">www.learnsmart.com | Verify: {certificate.certificateNumber}</p>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="certificate-info">
          <h3>About Your Certificate</h3>
          <ul>
            <li>✅ Recognized by industry professionals</li>
            <li>✅ Shareable on LinkedIn and other platforms</li>
            <li>✅ Verifiable using your certificate ID</li>
            <li>✅ Digital and printable format</li>
            <li>✅ Valid for lifetime</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
