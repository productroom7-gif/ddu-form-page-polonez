import { useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import {CanvasWrapper, ClearSignButton} from "./signature-component-styles"
import { FlexContainer } from "../../../styles/global-styles";

const SignaturePad = ({ name, form }) => {
  const sigRef = useRef();

  const clear = () => {
    sigRef.current.clear();
    form.setFieldValue(name, "");
  };

  const save = () => {
    if (!sigRef.current.isEmpty()) {
      const dataUrl = sigRef.current.getTrimmedCanvas().toDataURL("image/png");
      form.setFieldValue(name, dataUrl);
    }
  };

  useEffect(() => {
    const resize = () => {
      if (sigRef.current) {
        const canvas = sigRef.current.getCanvas();
        const parent = canvas.parentNode;
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        sigRef.current.clear(); // prevent distortion after resize
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      <CanvasWrapper>
        <FlexContainer justifycontent='flex-end'>
            <ClearSignButton type="button" className="clear" onClick={clear} >
                <i className="fa-solid fa-trash-can"></i>
            </ClearSignButton>
        </FlexContainer>
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          canvasProps={{
            className: "sigCanvas",
            style: { width: "100%", height: "100%" },
          }}
          onEnd={save}
        />
      </CanvasWrapper>

      {form.values[name] && (
        <div style={{ marginTop: "10px" }}>
          <p>Signature Preview:</p>
          <img
            src={form.values[name]}
            alt="Signature Preview"
            style={{ border: "1px solid #ddd", maxWidth: "300px" }}
          />
        </div>
      )}
    </>
  );
};

export default SignaturePad;