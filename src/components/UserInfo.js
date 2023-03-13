class UserInfo {
  constructor({userName, userInfo}) {
    this._user = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
  }

  // возвращает объект с данными пользователя когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo() {
    const userData = {
      name: this._user.textContent,
      profession: this._userInfo.textContent
    }
    return userData;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._user.textContent = data.name;
    this._userInfo.textContent = data.profession;
  }
}

export {UserInfo};