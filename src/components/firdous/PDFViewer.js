import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function PdfViewer({ fileUrl }) {
    return (
        <div style={{ height: '750px', width: '100%', marginTop: '20px' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
                <Viewer fileUrl={`${fileUrl}`} />
            </Worker>
        </div>
    );
}

export default PdfViewer;
