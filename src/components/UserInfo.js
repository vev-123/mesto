class UserInfo {
  constructor({userName, userInfo, userAvatar}) {
    this._user = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
    this._avatar = document.querySelector(userAvatar);
  }

  // возвращает объект с данными пользователя когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo() {
    const userData = {
      name: this._user.textContent,
      profession: this._userInfo.textContent,
      id: this._userId,
      avatar: this._avatar
    }
    return userData;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._user.textContent = data.name;
    this._userInfo.textContent = data.profession;
    this._userId = data.id;
    this._avatar.src = data.avatar;
  }

  //id
  getUserId() {
    return this._userId;
  }

  //ава
  getUserAvatar() {
    return this._avatar.src;
  }

}

export {UserInfo};