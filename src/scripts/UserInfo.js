export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector}) {
    this._nameElement = nameSelector;
    this._jobElement = jobSelector;
    this._avatar = avatarSelector;
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };

    return userInfo;
  }

  setUserInfo(inputValuesObject) {
    this._nameElement.textContent = inputValuesObject.name;
    this._jobElement.textContent = inputValuesObject.about;
    this.setUserAvatar(inputValuesObject)
  }

  setUserAvatar(inputValuesObject) {
    this._avatar.src = inputValuesObject.avatar
  }
}