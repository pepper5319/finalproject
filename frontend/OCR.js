import RNTesseractOcr from 'react-native-tesseract-ocr';
import React from 'react';

class OCR extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      imgPath: this.props.uri
  }
  getText = _ => {
RNTesseractOcr.recognize(imgPath)
  .then((result) => {
    this.setState({ ocrResult: result });
    console.log("OCR Result: ", result);
  })
  .catch((err) => {
    console.log("OCR Error: ", err);
  })
  .done();
    }
export default OCR;
