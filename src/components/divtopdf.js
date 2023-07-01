import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const downloadDivAsPDF = (divId, filename) => {
  const div = document.getElementById(divId);

  html2canvas(div)
    .then((canvas) => {
      const pdf = new jsPDF();

      // Calculate the desired width and height of the PDF page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate the aspect ratio of the captured canvas
      const canvasAspectRatio = canvas.width / canvas.height;

      // Calculate the scaled width and height based on the aspect ratio
      let scaledWidth = pdfWidth;
      let scaledHeight = pdfWidth / canvasAspectRatio;

      // If the scaled height exceeds the PDF page height, recalculate the dimensions
      if (scaledHeight > pdfHeight) {
        scaledHeight = pdfHeight;
        scaledWidth = pdfHeight * canvasAspectRatio;
      }

      // Calculate the X and Y coordinates to center the image on the PDF page
      const x = (pdfWidth - scaledWidth) / 2;
      const y = (pdfHeight - scaledHeight) / 2;

      // Add the scaled image to the PDF
      pdf.addImage(canvas, "JPEG", x, y, scaledWidth, scaledHeight);

      // Save the PDF file
      pdf.save(filename);
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
    });
};

export default downloadDivAsPDF;
