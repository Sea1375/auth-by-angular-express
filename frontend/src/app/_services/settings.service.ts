import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private storagePrefix = 'g2gn_'

  constructor() {

  }

  clearUserSetting() {

    window.localStorage.clear()

  }

  getStorage(key: any, defaultVal?: any) {

    return window.localStorage[this.storagePrefix + key] ?
      JSON.parse(window.localStorage[this.storagePrefix + key]) : defaultVal || false

  }

  setStorage(key: any, val: any) {

    window.localStorage.setItem(this.storagePrefix + key, JSON.stringify(val))

  }

}
