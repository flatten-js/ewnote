import { timezone } from '../utils'
import { Mysql } from './core'

class Notes extends Mysql {
  constructor() {
    super()
  }

  async count(id) {
    return await this.query(
      `
        SELECT
          DATE_FORMAT(
            CONVERT_TZ(created_at, 'UTC', '${timezone()}'),
            '%Y-%m-%d'
          ) as date,
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
}

export default new Notes()
