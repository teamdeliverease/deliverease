import { useField } from 'formik';

const CheckBoxInput = ({ label, isRequired = true, ...props }) => {
  props.type = props.type || 'text';
  if (isRequired && props.placeholder) {
    props.placeholder += '*';
  }
  const [field, meta] = useField(props);

  return (
    <div className={`form-group mb-3 mb-md-2`}>
      <label className="sr-only" htmlFor={props.id || props.name}>
        {label || props.placeholder || props.name}
      </label>

      <div className="form-check mb-3 full-width">
        {isRequired ? (
          <input required type="checkbox" className="form-check-input" />
        ) : (
          <input type="checkbox" className="form-check-input" />
        )}

        <label className="form-check-label" htmlFor="requester-terms">
          {props.children}
        </label>
      </div>
    </div>
  );
};

export default CheckBoxInput;

{
  /* <label class="form-check-label" for="requester-terms">
          I agree to the
          <a href data-toggle="modal" data-target="#requesterModal" class="terms-link">
            Terms of Use
          </a>
        </label> */
}
