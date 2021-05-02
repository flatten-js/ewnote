import { Mysql } from './core'
import { notes } from './'

class Pages extends Mysql {
  constructor() {
    super()
  }

  async _filing(id, page) {
    await this.query(
      `
        INSERT INTO pages
          (note_id, page, created_at)
        VALUES
          (?, ?, CURRENT_TIMESTAMP)
      `,
      [id, JSON.stringify(page)]
    )
  }

  async filing(id, page) {
    await this._filing(id, page)
    await notes._update(id)
  }
}

export default new Pages()
