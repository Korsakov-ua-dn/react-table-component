import React from 'react';
import './style.scss';

interface IProps {
  onPrintPdf: () => void;
  onDownloadXlsx: () => void;
}

const Download: React.FC<IProps> = (props) => {
  return (
    <div className="Download">
      <button
        className="Download__btn Download__btn_pdf"
        onClick={props.onPrintPdf}
      ></button>
      <button
        className="Download__btn Download__btn_xls"
        onClick={props.onDownloadXlsx}
      ></button>
    </div>
  );
};

export default React.memo(Download) as typeof Download;
