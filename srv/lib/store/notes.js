import { Mysql } from './core'

class Notes extends Mysql {
  constructor() {
    super()
  }

  async add(id, page) {
    await this.query(
      `
        INSERT INTO notes
          (user_id, page, created_at)
        VALUES
          (?, ?, CURRENT_TIMESTAMP)
      `,
      [id, JSON.stringify(page)]
    )
  }
}

export default new Notes()
