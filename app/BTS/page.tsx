import PDFViewer from "@/components/PDF/PDFViewer";

export default function BTSPage() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <PDFViewer pdfPath="/Doc-CS.pdf" />
    </div>
  );
}