import PDFViewer from "@/components/PDF/PDFViewer";

export default function BTSPage2() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <PDFViewer pdfPath="/Doc-Symfony.pdf" />
    </div>
  );
}