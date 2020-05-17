import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { auth } from "../../store/actions/auth";

function validateEmail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Auth extends Component {
  state = {
    signIn: true,
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Пароль",
        errorMessage: "Введите корректный пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
      displayName: {
        value: "новый пользователь",
        label: "Имя, отображаемое на сайте",
        errorMessage: "",
        valid: true,
        touched: true,
      }
    },
  };

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      this.state.formControls.displayName.value,
      true
    );
  };

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      this.state.formControls.displayName.value,
      false
    );
  };

  toggleToRegisterOrSignIn = () => {
    this.setState({
      signIn: !this.state.signIn
    })
  }

  submitHandler = (e) => {
    e.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) return true;

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.trim().length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid,
    });
  };

  renderInputs() {
    let formControls = {...this.state.formControls}
    if (this.state.signIn) {
      let {displayName, ...rest} = formControls
      formControls = rest
    }

    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            
            {this.state.signIn
              ? <React.Fragment>
                <Button
                  type="success"
                  onClick={this.loginHandler}
                  disabled={!this.state.isFormValid}
                >
                  Войти
                </Button> 
                <Button
                  type="primary"
                  onClick={this.toggleToRegisterOrSignIn}
                >
                  Перейти к регистрации
                </Button>
              </React.Fragment>
              : <React.Fragment>
                <Button
                  type="success"
                  onClick={this.registerHandler}
                  disabled={!this.state.isFormValid}
                >
                  Зарегистрироваться
                </Button>
                <Button
                  type="primary"
                  onClick={this.toggleToRegisterOrSignIn}
                >
                  Уже зарегистрированы? Войти
                </Button>
              </React.Fragment>}
            
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, displayName, isLogin) =>
      dispatch(auth(email, password, displayName, isLogin)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
