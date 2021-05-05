import { Mysql } from './core'

class Notes extends Mysql {
  constructor() {
    super()
  }

  get sample() {
    return [
      'my-notebook',
      'This is your first English vocabulary notebook. You can use it as is, or create a new notebook to categorize it.'
    ]
  }

  async create(id, name, description) {
    await this.query(
      `
        INSERT INTO notes
          (user_id, name, description, created_at, updated_at)
        VALUES
          (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `,
      [id, name, description]
    )
  }

  async _update(id) {
    await this.query(
      `
        UPDATE
          notes
        SET
          updated_at = CURRENT_TIMESTAMP
        WHERE
          id = ?
      `,
      [id]
    )
  }

  async exists(id, name) {
    return this.exec(
      `
        SELECT
          COUNT(*) as count
        FROM
          notes
        WHERE
          user_id = ?
        AND
          name = ?
      `,
      [id, name]
    )
  }

  async delete(id, name) {
    await this.query(
      `
        DELETE FROM
          notes
        WHERE
          user_id = ?
        AND
          name = ?
      `,
      [id, name]
    )
  }

  async all(id) {
    return await this.query(
      `
        SELECT
          id,
          name,
          description,
          ${this.date('updated_at', '%b %d, %Y')} as update_date
        FROM
          notes
        WHERE
          user_id = ?
        ORDER BY
          updated_at DESC
      `,
      [id]
    )
  }

  async size(id, name) {
    return await this.exec(
      `
        SELECT
          pages.count
        FROM
          notes,
          (
            SELECT
              note_id,
              count(*) as count
            FROM
              pages
            GROUP BY
              note_id
          ) as pages
        WHERE
          notes.id = pages.note_id
        AND
          user_id = ?
        AND
          name = ?
      `,
      [id, name]
    )
  }

  async daily(id) {
    return await this.query(
      `
        SELECT
          pages.*
        FROM
          notes,
          (
            SELECT
              note_id,
              ${this.date('created_at', '%Y-%m-%d')} as date,
              COUNT(*) as page,
              SUM(page->"$.line") as line
            FROM
              pages
            GROUP BY
              note_id,
              date
          ) as pages
        WHERE
          notes.id = pages.note_id
        AND
          user_id = ?
      `,
      [id]
    )
  }

  async open(id, name, offset) {
    return await this.exec(
      `
        SELECT
          notes.name,
          notes.description,
          page
        FROM
          notes
        LEFT JOIN
          (
            SELECT
              note_id,
              page
            FROM
              pages
            ORDER BY
              id
          ) as pages
        ON
          notes.id = pages.note_id
        WHERE
          user_id = ?
        AND
          name = ?
        LIMIT
          ?, 1
      `,
      [id, name, Number(offset)]
    )
  }
}

export default new Notes()
