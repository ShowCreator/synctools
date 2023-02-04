export default class Utils {
  static getCurrentLocale(): string {
    return navigator?.language?.split('-')[0] || 'en'
  }

  static async makeSync(): Promise<void> {
    await window.mainApi.send('makeSync')
  }
}

export const { getCurrentLocale, makeSync } = Utils
