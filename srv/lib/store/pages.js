import { Mysql } from './core'

class Pages extends Mysql {
  constructor() {
    super()
  }

  async filing(id, page) {
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
}

export default new Pages()
