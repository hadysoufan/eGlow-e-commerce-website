import { useState } from 'react';
import './sign-in-form.styles..scss';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
} from '../../utils/firebase/firebase.util';

import FormInput from '../form-input/form-input.component';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);

      resetFormField();
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          alert('Invalid email');
          break;

        case 'auth/wrong-password':
          alert('Inalid Password');
          break;

        default:
          console.log(error);
      }
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already Have an Account?</h2>
      <span>Sign in with email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          title="Invalid email address"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
