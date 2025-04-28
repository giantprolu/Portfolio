"use client";

import { useState, useEffect } from "react";
import styles from "./PDFViewer.module.css";

interface PDFViewerProps {
  pdfPath: string;
  width?: string;
  height?: string;
}

const PDFViewer = ({ pdfPath, width = "100%", height = "100vh" }: PDFViewerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.loading}>Chargement du PDF...</div>;
  }

  return (
    <div className={styles.pdfContainer} style={{ width, height }}>
      <object
        data={pdfPath}
        type="application/pdf"
        width="100%"
        height="100%"
        className={styles.pdfObject}
      >
        <p>
          Votre navigateur ne peut pas afficher le PDF.{" "}
          <a href={pdfPath} target="_blank" rel="noopener noreferrer">
            Télécharger le PDF
          </a>
        </p>
      </object>
    </div>
  );
};

export default PDFViewer;