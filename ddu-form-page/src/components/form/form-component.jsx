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
import { translations } from "../../translations.jsx"

// === Validation Schema ===
const makeValidationSchema = (t) => Yup.object({
  firstName: Yup.string()
    .matches(/^[\p{L}]{2,50}$/u, t.errFirst)
    .required(t.errFirst),
  
  surname: Yup.string()
    .matches(/^[\p{L}]{2,50}$/u, t.errSurname)
    .required(t.errSurname),

  idNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]{5,20}$/, t.errId)
    .required(t.errId),

  phone: Yup.string()
    .required(t.errPhone)
    .test("len", t.errPhoneLen, function(value) {
      const { phoneCountry } = this.parent;
      const country = allowedCountries.find(c => c.code === phoneCountry);
      if (!country || !value) return false;
      const digits = value.replace(/\D/g, "");
      return digits.length === country.maxLength;
    }),
  phoneCountry: Yup.string().required(),

  email: Yup.string()
    .email(t.errEmail)
    .required(t.errEmail),

  purchaseType: Yup.string()
    .oneOf(["purchase", "gift"], t.errPurchase)
    .required(t.errPurchase),

  files: Yup.array().when("purchaseType", {
    is: "purchase",
    then: (schema) =>
      schema.min(1, t.errFileMin).max(10, t.errFileMax),
    otherwise: (schema) => schema.notRequired(),
  }),

  signature: Yup.string().required(t.errSignature),

  personalData: Yup.bool().oneOf([true], t.errPersonal),
  authorizeInput: Yup.bool().oneOf([true], t.errAuthorize),
  parcelContentApproval: Yup.bool().oneOf([true], t.errParcel),
});


const RegistrationForm = ({ language = "en" }) => {
  const t = translations[language];
  const validationSchema = makeValidationSchema(t);

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
      <SectionTitle>{t.senderInfo}</SectionTitle>

        <SectionContainer>
          <InputsRow>
            <LabeledInput title={t.parcelNumber} name="ParcelNumber" type="text" form={form} disabled={true} ref={(el) => (fieldRefs.current.ParcelNumber = el)} />
          </InputsRow>

          <InputsRow>
            <LabeledInput title={t.senderName} name="SendersName" type="text" form={form} disabled={true} ref={(el) => (fieldRefs.current.SendersName = el)} />
            <LabeledInput title={t.senderSurname} name="SendersSurname" type="text" form={form} disabled={true} ref={(el) => (fieldRefs.current.SendersSurname = el)} />
          </InputsRow>

           <InputsRow>
            <LabeledInput title={t.senderCountry} name="CountryField" type="text" form={form} disabled={true} ref={(el) => (fieldRefs.current.CountryField = el)} />
          </InputsRow>
          
        </SectionContainer>

        <SectionContainer>
          <h5 className="mb-5">{t.shipmentQuestion}</h5>

          <div className="d-flex flex-column gap-3">
            <ShipmentOptionsCard
              icon="fa-solid fa-user"
              title={t.privateTitle}
              description={t.privateDesc}
              selected={selectedShipment === "private"}
              onClick={() => setSelectedShipment("private")}
            />
            <ShipmentOptionsCard
              icon="fa-solid fa-building"
              title={t.companyTitle}
              description={t.companyDesc}
              selected={selectedShipment === "company"}
              onClick={() => setSelectedShipment("company")}
            />
          </div>
        </SectionContainer>

        {selectedShipment === "private" && (
          <>
            <SectionContainer>
              <h5 className="mb-5">{t.fillInfo}</h5>

              <InputsRow>
                <LabeledInput title={t.firstName} name="firstName" type="text" form={form} ref={(el) => (fieldRefs.current.firstName = el)} />
                <LabeledInput title={t.surname} name="surname" type="text" form={form} ref={(el) => (fieldRefs.current.surname = el)} />
              </InputsRow>

              <InputsRow>
                <LabeledInput title={t.idNumber} name="idNumber" type="text" form={form} ref={(el) => (fieldRefs.current.idNumber = el)} />
              </InputsRow>

              <InputsRow>
                  <PhoneInput
                  title={t.phone}
                  language={language}
                  name="phoneNumber"
                  type="text"
                  form={form}
                  placeholder="Phone Number"
                  ref={(el) => (fieldRefs.current.firstName = el)}
                />
              </InputsRow>

              <InputsRow>
                <LabeledInput title={t.email} name="email" type="email" form={form} placeholder="you@example.com" ref={(el) => (fieldRefs.current.email = el)} />
              </InputsRow>

            </SectionContainer>

            <SectionContainer>
              <h5 className="mb-4">{t.purchasedGift}</h5>

              <InputsRow>
              <OptionCard
                title={t.purchase}
                description={t.purchaseDesc}
                icon="fa-shopping-bag"
                checked={form.values.purchaseType === "purchase"}
                onChange={() => form.setFieldValue("purchaseType", "purchase")}
                selected={form.values.purchaseType === "purchase"}
              />

              <OptionCard
                title={t.gift}
                description={t.giftDesc}
                icon="fa-gift"
                checked={form.values.purchaseType === "gift"}
                onChange={() => form.setFieldValue("purchaseType", "gift")}
                selected={form.values.purchaseType === "gift"}
              />
            </InputsRow>

            {form.values.purchaseType === "purchase" && (
             <FlexContainer flexdirection='column' gap='8px'>
                <h5 className="mb-3">{t.upload}</h5>
                <FileLabelContainer>
                  <i className="fa fa-cloud-upload fa-2x mb-2 text-primary"></i>
                  <h6>{t.drag} <span>{t.browse}</span></h6>
                  <p>{t.formats}</p>
                  <p>{t.limits}</p>
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

            <SectionTitle>{t.customsStatement}</SectionTitle>

            <SectionContainer>
              <TitleToggle onClick={() => setShowGoods(!showGoods)} toggled={showGoods} >{t.showItem}</TitleToggle>

              {showGoods && (
                <FlexContainer gap="24px 8px" innerelementswidth="32%" flexwrap="wrap" justifycontent="space-between">
                  <LabeledInput
                    title={t.typeGoods}
                    name="TypeOfGoods"
                    type="text"
                    form={form}
                    disabled={true}
                    ref={(el) => (fieldRefs.current.TypeOfGoods = el)}
                  />
                  <LabeledInput
                    title={t.amount}
                    name="Amount"
                    type="text"
                    form={form}
                    disabled={true}
                    ref={(el) => (fieldRefs.current.Amount = el)}
                  />
                  <LabeledInput
                    title={t.totalValue}
                    name="TotalValue"
                    type="text"
                    form={form}
                    disabled={true}
                    ref={(el) => (fieldRefs.current.TotalValue = el)}
                  />
                </FlexContainer>
              )}

            </SectionContainer>

            <SectionTitle>{t.charges}</SectionTitle>

            <SectionContainer>
              <FlexContainer gap="24px 8px" innerelementswidth="49%" flexwrap="wrap" justifycontent="space-between">
                <LabeledInput
                  title={t.customsDuty}
                  name="CustomsDuty"
                  type="text"
                  form={form}
                  disabled={true}
                  ref={(el) => (fieldRefs.current.CustomsDuty = el)}
                />
                <LabeledInput
                  title={t.vat}
                  name="VAT"
                  type="text"
                  form={form}
                  disabled={true}
                  ref={(el) => (fieldRefs.current.VAT = el)}
                />
                <LabeledInput
                  title={t.brokerage}
                  name="BrokerageCommission"
                  type="text"
                  form={form}
                  disabled={true}
                  ref={(el) => (fieldRefs.current.BrokerageCommission = el)}
                />
                <LabeledInput
                  title={t.totalPayable}
                  name="TotalPayable"
                  type="text"
                  form={form}
                  disabled={true}
                  ref={(el) => (fieldRefs.current.TotalPayable = el)}
                />
              </FlexContainer>
            </SectionContainer>

            <SectionTitle>{t.terms}</SectionTitle>

            <SectionContainer marginbottom="48px">
              <CheckboxInput
                title={
                  <>
                    {t.personalBefore}<a href="#">{t.personalLink}</a>{t.personalAfter}
                  </>
                }
                name="personalData"
                form={form}
                ref={(el) => (fieldRefs.current.personalData = el)}
              />

              <CheckboxInput
                title={
                  <>
                    {t.authorizeBefore}<a href="#">{t.authorizeLink}</a>{t.authorizeAfter}
                  </>
                }
                name="authorizeInput"
                form={form}
                ref={(el) => (fieldRefs.current.authorizeInput = el)}
              />

              <CheckboxInput
                title={t.parcelConfirm}
                name="parcelContentApproval"
                form={form}
                ref={(el) => (fieldRefs.current.parcelContentApproval = el)}
              />
            </SectionContainer>
            

            <h5 className="mb-4">{t.review}</h5>
            <FlexContainer flexdirection="column" gap="16px" marginbottom="24px">
              <p>{t.signP1}</p>
              <p>{t.signP2a}<b>{t.signDraw}</b>{t.signP2b}<b>{t.signFinger}</b>{t.signOr}<b>{t.signStylus}</b>{t.signEnd}</p>
            </FlexContainer>

            <SignaturePad name="signature" form={form} previewLabel={t.signaturePreview} />

            <SubmitButton type="submit" onClick={handleSubmit}>
              {t.continue}
            </SubmitButton>
          </>
        )}
        {selectedShipment === "company" && (
          <>
            <InfoBanner
              title={t.commercialDetected}
              description={t.commercialDesc}
              icon="fa-info-circle"
            />
            <SectionContainer>

              <InputsRow>
                <ContactCard icon="fa-phone" title={t.phoneSupport} descriptionTitle="+48 661 930 999" description="Mon-Fri: 8:00 AM - 4:00 PM (CTE)" />
                <ContactCard icon="fa-envelope" title={t.emailSupport} descriptionTitle="agencjacelna@karex.info.pl" description={t.response24} />
              </InputsRow>

               <InputsRow>
                <ContactCard icon="fa-map-marker" title={t.officeAddress} descriptionTitle=" Karex Paczka sp. Z o.o." description={<> {t.response24} <br /> 42-215 Częstochowa <br /> {t.poland} </> } />
              </InputsRow>
              
            </SectionContainer>
             <SubmitButton type="submit" onClick={handleSubmit}>
              {t.submitBroker}
            </SubmitButton>
          </>
        )}
     
    </form>
  );
}

export default RegistrationForm;