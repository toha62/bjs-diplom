"use strict";

const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logoutButton.action = logoutAction;
moneyManager.addMoneyCallback = data => profileWidgetAction(ApiConnector.addMoney, data, 'Баланс успешно пополнен');
moneyManager.conversionMoneyCallback = data => profileWidgetAction(ApiConnector.convertMoney, data, 'Конвертация успешно выполнена');
moneyManager.sendMoneyCallback = data => profileWidgetAction(ApiConnector.transferMoney, data, 'Перевод успешно выполнен');
favoritesWidget.addUserCallback = data => favoritesWidgetAction(ApiConnector.addUserToFavorites, data, 'Пользователь успешно добавлен');
favoritesWidget.removeUserCallback = data => favoritesWidgetAction(ApiConnector.removeUserFromFavorites, data, 'Пользователь успешно удален');

ApiConnector.current(answerFromServer => {  
  if (answerFromServer.success) {
    ProfileWidget.showProfile(answerFromServer.data);
  }
});

getRates();
setInterval(getRates, 60000);

ApiConnector.getFavorites(answerFromServer => {
  if (answerFromServer.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(answerFromServer.data);
    moneyManager.updateUsersList(answerFromServer.data);
  }
});

function logoutAction() {
  ApiConnector.logout(answerFromServer => {
    if (answerFromServer.success) {           
      location.reload();
    }
  });
}

function getRates() {
  ApiConnector.getStocks(answerFromServer => {    
    if (answerFromServer.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(answerFromServer.data);
    }
  });
}
/*
function addMoneyAction(data) {
  ApiConnector.addMoney(data, answerFromServer => {    
    if (answerFromServer.success) {
      ProfileWidget.showProfile(answerFromServer.data);
      moneyManager.setMessage(answerFromServer.success, 'Баланс успешно пополнен');
    } else {
      moneyManager.setMessage(answerFromServer.success, answerFromServer.error);
    }
  });
}

function conversionMoneyAction(data) {
  ApiConnector.convertMoney(data, answerFromServer => {    
    if (answerFromServer.success) {
      ProfileWidget.showProfile(answerFromServer.data);
      moneyManager.setMessage(answerFromServer.success, 'Конвертация успешно выполнена');
    } else {
      moneyManager.setMessage(answerFromServer.success, answerFromServer.error);
    }
  });
}

function sendMoneyAction(data) {
  ApiConnector.transferMoney(data, answerFromServer => {    
    if (answerFromServer.success) {
      ProfileWidget.showProfile(answerFromServer.data);
      moneyManager.setMessage(answerFromServer.success, 'Перевод успешно выполнен');
    } else {
      moneyManager.setMessage(answerFromServer.success, answerFromServer.error);
    }
  });
}
*/

function profileWidgetAction(actionFunc, data, successMessage) {
  actionFunc(data, answerFromServer => {    
    if (answerFromServer.success) {
      ProfileWidget.showProfile(answerFromServer.data);
      moneyManager.setMessage(answerFromServer.success, successMessage);
    } else {
      moneyManager.setMessage(answerFromServer.success, answerFromServer.error);
    }
  });
}

function favoritesWidgetAction(actionFunc, data, successMessage) {
  actionFunc(data, answerFromServer => {    
    if (answerFromServer.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(answerFromServer.data);
      moneyManager.updateUsersList(answerFromServer.data);
      favoritesWidget.setMessage(answerFromServer.success, successMessage);
    } else {
      favoritesWidget.setMessage(answerFromServer.success, answerFromServer.error);
    }
  });
}

/*
function addUserAction(data) {
  ApiConnector.addUserToFavorites(data, answerFromServer => {    
    if (answerFromServer.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(answerFromServer.data);
      moneyManager.updateUsersList(answerFromServer.data);
      favoritesWidget.setMessage(answerFromServer.success, 'Пользователь успешно добавлен');
    } else {
      favoritesWidget.setMessage(answerFromServer.success, answerFromServer.error);
    }
  });
}

function removeUserAction(data) {
  ApiConnector.removeUserFromFavorites(data, answerFromServer => {    
    if (answerFromServer.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(answerFromServer.data);
      moneyManager.updateUsersList(answerFromServer.data);
      favoritesWidget.setMessage(answerFromServer.success, 'Пользователь успешно удален');
    } else {
      favoritesWidget.setMessage(answerFromServer.success, answerFromServer.error);
    }
  });
}
*/