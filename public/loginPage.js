"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = loginAction;
userForm.registerFormCallback = registerAction;

function loginAction(data) {
  ApiConnector.login(data, answerFromServer => {
    if (answerFromServer.success) {      
      location.reload();
    } else {      
      userForm.setLoginErrorMessage(answerFromServer.error);
    }
  });
}

function registerAction(data) {
  ApiConnector.register(data, answerFromServer => {
    if (answerFromServer.success) {         
      location.reload();
    } else {       
      userForm.setRegisterErrorMessage(answerFromServer.error);
    }
  });
}