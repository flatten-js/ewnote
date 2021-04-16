import { pool } from '../mysql'

class Users {
  constructor() {}

  async _create({ sub, name, picture }) {
    return await pool.query(
      `
        INSERT INTO users
          (google_id, name, picture, updated_at)
        VALUES
          (?, ?, ?, CURRENT_TIMESTAMP)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          picture = VALUES(picture),
          updated_at = VALUES(updated_at)
      `,
      [sub, name, picture]
    )
  }

  async create(profile) {
    await this._create(profile)
    return this.find(profile.sub, 'google')
  }

  async find(id, provider) {
    const name = [provider, 'id'].filter(Boolean).join('_')

    const [[profile]] = await pool.query(
      `
        SELECT
          id, name, picture
        FROM
          users
        WHERE
          ${name} = ?
      `,
      [id]
    )

    return profile
  }
}

export default new Users()
