import React, { useState } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
import Button from '../../ui/button';
import ImagePicker from '../../shared/components/formelements/single_image_picker';
  

//"http://localhost:8000/media/files/singharoysagnik007@gmail.com/ORACLE_REPORT_DOC.pdf"
  
export default function Test(props) {

  const url = props.url;
  let buttonelement,element
      
  pdfjs.GlobalWorkerOptions.workerSrc = 
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [picker,setPicker]=useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  
  /*To Prevent right click on screen*/
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
    
  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  
  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }
  
  function previousPage() {
    changePage(-1);
  }
  
  function nextPage() {
    changePage(1);
  }

  if(props.update){
    buttonelement= <Button
          type="button"
          onClick={()=>setPicker(true)}>Update</Button>
  }

 
  
  return (
    <div>{picker ? <ImagePicker center id={props.id} ft="pdf/image" onInput={props.inputhandler}/> : (<><Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <div className="pagec">
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </div>
            <div className="buttonc">
              <Button type="button" disabled={pageNumber <= 1} onClick={previousPage}>Previous</Button>
              <Button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>Next</Button>
            </div>
            <br/>
            {buttonelement}
        </div></>)}</div>
  );
}