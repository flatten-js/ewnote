import { timezone } from '~srv/lib/utils'
import { Mysql } from './core'

class Notes extends Mysql {
  constructor() {
    super()
  }

  async size(id) {
    return await this.exec(
      `
        SELECT
          COUNT(*) as count
        FROM
          notes
        WHERE
          user_id = ?
      `,
      [id]
    )
  }

  async daily(id) {
    return await this.query(
      `
        SELECT
          ${this.date('created_at', '%Y-%m-%d')} as date,
          SUM(page->"$.line") as line,
          COUNT(*) as page
        FROM
          notes
        WHERE
          user_id = ?
        GROUP BY
          date
      `,
      [id]
    )
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

  async open(id, offset) {
    return await this.exec(
      `
        SELECT
          page
        FROM
          notes
        WHERE
          user_id = ?
        ORDER BY
          id
        LIMIT
          ?, 1
      `,
      [id, Number(offset)]
    )
  }
}

export default new Notes()
