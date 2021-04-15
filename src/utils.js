export default {
  crush(min, max, n) {
    return Math.max(min, Math.min(n, max))
  },
  remaining(min, max, n) {
    return max - this.crush(min, max, n)
  },
  shuffle(array) {
    // A simple algorithm
    return array.slice().sort(() => Math.random() - 0.5)
  },
  cookie: {
    get(key) {
      const cookie = document.cookie
      if (!cookie) return
      return cookie.split('; ').find(row => row.startsWith(key)).split('=')[1]
    },
    delete(key) {
      return document.cookie = `${key}=;max-age=0;`
    }
  }
}
