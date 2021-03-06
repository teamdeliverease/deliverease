import { Formik, Form } from 'formik';
import { GENERIC_ERROR_MESSAGE } from '../../constants';
import TextInput from '../FormPrimitives/TextInput';
import PhoneNumberInput from '../FormPrimitives/PhoneNumberInput';
import SelectInput from '../FormPrimitives/SelectInput';
import CheckBoxInput from '../FormPrimitives/CheckBoxInput';
import RadioInput from '../FormPrimitives/RadioInput';
import Modal from '../Modal';
import VolunteerTermsOfUse from '../FormPrimitives/VolunteerTermsOfUse';
import { postVolunteer } from '../../api/volunteers';
import { trackSignUp } from '../../utils/analytics';

const languageOptions = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'Mandarin', label: 'Mandarin' },
  { value: 'Cantonese', label: 'Cantonese' },
  { value: 'Other', label: 'Other' },
];

const VolunteerForm = ({ onSubmitted }) => {
  const handleSubmit = async (formData, setSubmitting) => {
    try {
      // disable submit button while waiting on api call
      setSubmitting(true);
      await postVolunteer(formData);
      onSubmitted();
      trackSignUp('volunteer');
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      alert(GENERIC_ERROR_MESSAGE);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        email: '',
        language: [],
        hasCar: null,
        termsAgreement: false,
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
    >
      {(props) => (
        <div className="form-wrapper">
          <Form className="text-center flex-wrap px-lg-5">
            <div className="form-row">
              <TextInput colWidth="6" maxLength="64" name="firstName" placeholder="First Name" />
              <TextInput colWidth="6" maxLength="64" name="lastName" placeholder="Last Name" />
            </div>
            <PhoneNumberInput name="phone" placeholder="Phone Number" />
            <TextInput maxLength="256" name="address" placeholder="Address" />
            <TextInput maxLength="256" type="email" name="email" placeholder="Email" />
            <SelectInput name="language" options={languageOptions} placeholder="Languages Spoken" />
            <RadioInput name="hasCar">Do you have a car you&apos;d be willing to drive?</RadioInput>
            <CheckBoxInput name="termsAgreement">
              <>
                I agree and certify to the{' '}
                <Modal
                  title="Volunteer Terms and Conditions"
                  linkText="Terms of Use"
                  linkColor="blue"
                >
                  <VolunteerTermsOfUse />
                </Modal>
              </>
            </CheckBoxInput>
            <button
              disabled
              style={{ cursor: 'not-allowed' }}
              className="btn btn-primary btn-submit mx-auto"
              type="submit"
            >
              Sign up
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default VolunteerForm;
