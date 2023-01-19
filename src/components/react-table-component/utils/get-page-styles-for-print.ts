export const getPageStylesForPrint = (width: number, height: number): string => {
  // Convert px to mm
  const coefficient = 0.2636;
  return `
      @media print {
        html, body {
          background-color: #ffffff;
        } 
        @page {
          size: ${width * coefficient + 30}mm ${height * coefficient + 30}mm; 
          margin: 10mm;
        }
      }
    `;
};
