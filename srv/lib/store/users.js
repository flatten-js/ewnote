import { Mysql } from './core'

class Users extends Mysql {
  constructor() {
    super()
  }

  async _create({ sub, name, picture }) {
    await this.query(
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

    return await this.exec(
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
  }
}

export default new Users()
