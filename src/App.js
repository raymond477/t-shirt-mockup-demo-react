import './App.css';
import * as fabric from 'fabric'; // Ini library javascript harus di install dulu
import { useRef, useEffect } from 'react';
import Footer from './components/Footer';

const App = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  useEffect(() => {
    fabricCanvas.current = new fabric.Canvas(canvasRef.current);
    fabricCanvas.current.setDimensions({ width: 300, height: 300 });

    return () => {
      fabricCanvas.current.dispose();
    };
  }, []);

  const TambahGambar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imgElement = document.createElement('img');
      imgElement.src = event.target.result;

      imgElement.onload = function () {
        const image = new fabric.Image(imgElement, {
          left: 50,
          top: 50,
        });
        image.scaleToWidth(100);
        fabricCanvas.current.add(image);
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <input
        type="file"
        accept="image/*"
        onChange={TambahGambar}
        style={{
          position: 'absolute',
          top: '14%',
          left: '45%',
          fontFamily: 'Arial',
          fontSize: 15,
        }}
      />
      <canvas
        ref={canvasRef}
        width="300"
        height="300"
        style={{
          border: '1px dotted white',
          position: 'absolute',
          top: '30%',
          left: '42%',
        }}
      ></canvas>
      <h1 className="heading-1">T-Shirt Mockup Demo</h1>
      <Footer />
    </div>
  );

}

export default App; 
