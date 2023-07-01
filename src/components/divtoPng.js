import html2canvas from "html2canvas";

const downloadDivAsJPEG = (divId, filename, quality) => {
  const div = document.getElementById(divId);

  html2canvas(div)
    .then((canvas) => {
      // Convert canvas to base64 JPEG data URL
      const dataURL = canvas.toDataURL("image/jpeg", quality);

      // Create an <a> tag to trigger the download
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = filename;

      // Simulate a click on the link to trigger the download
      link.click();
    })
    .catch((error) => {
      console.error("Error generating screenshot:", error);
    });
};

export default downloadDivAsJPEG;
