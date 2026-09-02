import { useFormik } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import LabeledInput from "./inputs/labeled-input.jsx";
import { SectionTitle, SectionContainer, SubmitButton, FileLabelContainer, FlexContainer, ErrorMessage } from "../../styles/global-styles.jsx";
import {InputsRow, TitleToggle} from "./inputs/labeled-input-styles.jsx";
import PhoneInput, { allowedCountries } from "./inputs/select-input.jsx";
import ShipmentOptionsCard from "../shipment-options/shipment-options-card.jsx";
import InfoBanner from '../info-banner/info-banner-component.jsx';
import ContactCard from '../contact-cards/contact-card-component.jsx';
import OptionCard from '../option-select-card/option-select-card-component.jsx';
import {UploadedFileElement} from "../option-select-card/option-select-card-component-styles.jsx";
import CheckboxInput from "./inputs/checkbox-input.jsx"
import SignaturePad from "./signature/signature-component.jsx"

// === Validation Schema ===
const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[\p{L}]{2,50}$/u, "Valid first name is required.")
    .required("Valid first name is required."),
  
  surname: Yup.string()
    .matches(/^[\p{L}]{2,50}$/u, "Valid surname is required.")
    .required("Valid surname is required."),

  idNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]{5,20}$/, "Please enter a valid ID Card Number.")
    .required("Please enter a valid ID Card Number."),

  phone: Yup.string()
    .required("Phone number is required.")
    .test("len", "Invalid phone number length", function(value) {
      const { phoneCountry } = this.parent;
      const country = allowedCountries.find(c => c.code === phoneCountry);
      if (!country || !value) return false;
      const digits = value.replace(/\D/g, "");
      return digits.length === country.maxLength;
    }),
  phoneCountry: Yup.string().required(),

  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please enter a valid email address."),

  purchaseType: Yup.string()
    .oneOf(["purchase", "gift"], "Please select either Purchase or Gift.")
    .required("Please select either Purchase or Gift."),

  files: Yup.array().when("purchaseType", {
    is: "purchase",
    then: (schema) =>
      schema.min(1, "Please upload at least one file.").max(10, "Allowed up to 10 files."),
    otherwise: (schema) => schema.notRequired(),
  }),

  signature: Yup.string().required("Signature is required."),

  personalData: Yup.bool().oneOf([true], "You must agree to personal data processing."),
  authorizeInput: Yup.bool().oneOf([true], "You must authorize the direct agent."),
  parcelContentApproval: Yup.bool().oneOf([true], "You must confirm the parcel content."),
});


const RegistrationForm = () => {

  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showGoods, setShowGoods] = useState(true);
  const fieldRefs = useRef({});

  const handleSubmit = async (values) => {
    const errors = await form.validateForm(values);
    
    if (Object.keys(errors).length > 0) {
      
      const firstErrorField = Object.keys(errors)[0];
      
      const errorElement = fieldRefs.current[firstErrorField];
      
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        errorElement.focus();
      }
      return;
    }

    console.log("Form Submitted", values);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    const validFiles = files.filter((file) => {
      const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
      const maxSize = 10 * 1024 * 1024;
      return allowedTypes.includes(file.type) && file.size <= maxSize;
    });
    form.setFieldValue("files", [...form.values.files, ...validFiles]);
  };

    const form = useFormik({
    initialValues: {
      firstName: "",
      surname: "",
      idNumber: "",
      countryCode: "",
      phoneNumber: "",
      email: "",
      purchaseType: "",
      files: [],
      signature: "",
      personalData: false,
      authorizeInput: false,
      parcelContentApproval: false,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form
      onSubmit={form.handleSubmit}
    >
      <SectionTitle>Sender Information</SectionTitle>

        <SectionContainer>
          <InputsRow>
            <LabeledInput title="Parcel number" name="ParcelNumber" type="text" form={form} disabled={true} ref={(el) => (fieldRefs.current.ParcelNumber = el)} />
          </InputsRow>

          <InputsRow>
            <LabeledInput title="Sender's Name" name="SendersName" type="text" form={form} disabled={true} ref={(el) => (fieldRefs.current.SendersName = el)} />
            <LabeledInput title="Sender's Surname" name="SendersSurname" type="text" form={form} disabled={true} ref={(el) => (fieldRefs.current.SendersSurname = el)} />
          </InputsRow>

           <InputsRow>
            <LabeledInput title="Sender's Country" name="CountryField" type="text" form={form} disabled={true} ref={(el) => (fieldRefs.current.CountryField = el)} />
          </InputsRow>
          
        </SectionContainer>

        <SectionContainer>
          <h5 className="mb-5">Is this shipment for a private individual or a company?</h5>

          <div className="d-flex flex-column gap-3">
            <ShipmentOptionsCard
              icon="fa-solid fa-user"
              title="I am an individual (private parcel)"
              description="Personal shipment with standard processing"
              selected={selectedShipment === "private"}
              onClick={() => setSelectedShipment("private")}
            />
            <ShipmentOptionsCard
              icon="fa-solid fa-building"
              title="I represent a company (commercial shipment)"
              description="Customs clearance for commercial parcels must be arranged directly with our partner."
              selected={selectedShipment === "company"}
              onClick={() => setSelectedShipment("company")}
            />
          </div>
        </SectionContainer>

        {selectedShipment === "private" && (
          <>
            <SectionContainer>
              <h5 className="mb-5">Please fill out the following information to complete customs clearance for your package:</h5>

              <InputsRow>
                <LabeledInput title="First Name" name="firstName" type="text" form={form} ref={(el) => (fieldRefs.current.firstName = el)} />
                <LabeledInput title="Surname" name="surname" type="text" form={form} ref={(el) => (fieldRefs.current.surname = el)} />
              </InputsRow>

              <InputsRow>
                <LabeledInput title="Identification Number (ID Card Number or Passport Number)" name="idNumber" type="text" form={form} ref={(el) => (fieldRefs.current.idNumber = el)} />
              </InputsRow>

              <InputsRow>
                  <PhoneInput
                  title="Contact Phone Number"
                  name="phoneNumber"
                  type="text"
                  form={form}
                  placeholder="Phone Number"
                  ref={(el) => (fieldRefs.current.firstName = el)}
                />
              </InputsRow>

              <InputsRow>
                <LabeledInput title="Email Address" name="email" type="email" form={form} placeholder="you@example.com" ref={(el) => (fieldRefs.current.email = el)} />
              </InputsRow>

            </SectionContainer>

            <SectionContainer>
              <h5 className="mb-4">Purchased / Gift</h5>

              <InputsRow>
              <OptionCard
                title="Purchase"
                description="Items that were purchased (requires invoice/receipt)"
                icon="fa-shopping-bag"
                checked={form.values.purchaseType === "purchase"}
                onChange={() => form.setFieldValue("purchaseType", "purchase")}
                selected={form.values.purchaseType === "purchase"}
              />

              <OptionCard
                title="Gift"
                description="Items sent as a gift (no documentation required)"
                icon="fa-gift"
                checked={form.values.purchaseType === "gift"}
                onChange={() => form.setFieldValue("purchaseType", "gift")}
                selected={form.values.purchaseType === "gift"}
              />
            </InputsRow>

            {form.values.purchaseType === "purchase" && (
             <FlexContainer flexdirection='column' gap='8px'>
                <h5 className="mb-3">Upload Invoice / Receipt</h5>
                <FileLabelContainer>
                  <i className="fa fa-cloud-upload fa-2x mb-2 text-primary"></i>
                  <h6>Drag and drop files here or <span>browse</span></h6>
                  <p>Accepted formats: PDF, PNG, JPG</p>
                  <p>Allowed up to 10 files, each up to 10MB</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="application/pdf,image/png,image/jpeg"
                    name="files"
                  />
                  {form.errors.files && form.touched.files && (
                     <ErrorMessage>{form.errors.files}</ErrorMessage>
                  )}
                </FileLabelContainer>
                {form.values.files.length > 0 && (
                    form.values.files.map((file, index) => (
                      <UploadedFileElement
                        key={index}
                      >
                        <span>{file.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updatedFiles = form.values.files.filter(
                              (_, i) => i !== index
                            );
                            form.setFieldValue("files", updatedFiles);
                          }}
                        >
                         x
                        </button>
                      </UploadedFileElement>
                    ))
                )}
              </FlexContainer>
            )}
            </SectionContainer>

            <SectionTitle>Statement For Customs Declaration</SectionTitle>

            <SectionContainer>
              <TitleToggle onClick={() => setShowGoods(!showGoods)} toggled={showGoods} >Show item</TitleToggle>

              {showGoods && (
                <FlexContainer gap="24px 8px" innerelementswidth="32%" flexwrap="wrap" justifycontent="space-between">
                  <LabeledInput
                    title="Type of goods"
                    name="TypeOfGoods"
                    type="text"
                    form={form}
                    disabled={true}
                    ref={(el) => (fieldRefs.current.TypeOfGoods = el)}
                  />
                  <LabeledInput
                    title="Amount"
                    name="Amount"
                    type="text"
                    form={form}
                    disabled={true}
                    ref={(el) => (fieldRefs.current.Amount = el)}
                  />
                  <LabeledInput
                    title="Total value"
                    name="TotalValue"
                    type="text"
                    form={form}
                    disabled={true}
                    ref={(el) => (fieldRefs.current.TotalValue = el)}
                  />
                </FlexContainer>
              )}

            </SectionContainer>

            <SectionTitle>The following customs and VAT charges have been calculated for your parcel:</SectionTitle>

            <SectionContainer>
              <FlexContainer gap="24px 8px" innerelementswidth="49%" flexwrap="wrap" justifycontent="space-between">
                <LabeledInput
                  title="Customs Duty"
                  name="CustomsDuty"
                  type="text"
                  form={form}
                  disabled={true}
                  ref={(el) => (fieldRefs.current.CustomsDuty = el)}
                />
                <LabeledInput
                  title="VAT"
                  name="VAT"
                  type="text"
                  form={form}
                  disabled={true}
                  ref={(el) => (fieldRefs.current.VAT = el)}
                />
                <LabeledInput
                  title="Brokerage Commission"
                  name="BrokerageCommission"
                  type="text"
                  form={form}
                  disabled={true}
                  ref={(el) => (fieldRefs.current.BrokerageCommission = el)}
                />
                <LabeledInput
                  title="Total Payable"
                  name="TotalPayable"
                  type="text"
                  form={form}
                  disabled={true}
                  ref={(el) => (fieldRefs.current.TotalPayable = el)}
                />
              </FlexContainer>
            </SectionContainer>

            <SectionTitle>Terms and Conditions</SectionTitle>

            <SectionContainer marginbottom="48px">
              <CheckboxInput
                title={
                  <>
                    I agree to <a href="#">the processing of my personal data</a> for the purpose of customs clearance.
                  </>
                }
                name="personalData"
                form={form}
                ref={(el) => (fieldRefs.current.personalData = el)}
              />

              <CheckboxInput
                title={
                  <>
                    I hereby authorize Karex Paczka sp. Z o.o. to make decisions as a customs agent by signing{" "}
                    <a href="#">authorization to act as a direct agent</a>.
                  </>
                }
                name="authorizeInput"
                form={form}
                ref={(el) => (fieldRefs.current.authorizeInput = el)}
              />

              <CheckboxInput
                title="I confirm that the contents of the package are not returned goods, are not subject to temporary clearance, and are not resettlement property."
                name="parcelContentApproval"
                form={form}
                ref={(el) => (fieldRefs.current.parcelContentApproval = el)}
              />
            </SectionContainer>
            

            <h5 className="mb-4">Please Review and Sign</h5>
            <FlexContainer flexdirection="column" gap="16px" marginbottom="24px">
              <p>By signing below, you confirm that the information provided is accurate and complete. You also agree to the terms outlined, including the processing of your personal data for customs clearance and authorization of Karex Paczka sp. Z o.o. as your direct agent in this process.</p>
              <p>To sign, please <b>draw your signature</b> using your <b>finger</b> or <b>stylus</b> in the designated area below.</p>
            </FlexContainer>

            <SignaturePad name="signature" form={form} />

            <SubmitButton type="submit" onClick={handleSubmit}>
              CONTINUE TO PAYMENT
            </SubmitButton>
          </>
        )}
        {selectedShipment === "company" && (
          <>
            <InfoBanner
              title="Commercial Shipment Detected"
              description="Customs clearance for commercial parcels must be arranged directly with our partner agency. Please contact them using the information below to proceed with your shipment."
              icon="fa-info-circle"
            />
            <SectionContainer>

              <InputsRow>
                <ContactCard icon="fa-phone" title="Phone Support" descriptionTitle="+48 661 930 999" description="Mon-Fri: 8:00 AM - 4:00 PM (CTE)" />
                <ContactCard icon="fa-envelope" title="Email Support" descriptionTitle="agencjacelna@karex.info.pl" description="Response within 24 hours" />
              </InputsRow>

               <InputsRow>
                <ContactCard icon="fa-map-marker" title="Office Address" descriptionTitle=" Karex Paczka sp. Z o.o." description={<> Response within 24 hours <br /> 42-215 Częstochowa <br /> Польща </> } />
              </InputsRow>
              
            </SectionContainer>
             <SubmitButton type="submit" onClick={handleSubmit}>
              Submit and Contact Broker
            </SubmitButton>
          </>
        )}
     
    </form>
  );
}

export default RegistrationForm;