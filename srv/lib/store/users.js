import { Mysql } from './core'

class Users extends Mysql {
  constructor() {
    super()
  }

  async _create({ sub, name, picture }) {
    await this.query(
      `
        INSERT INTO users
          (google_id, name, picture, created_at, updated_at)
        VALUES
          (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `,
      [sub, name, picture]
    )
  }

  async create(profile) {
    await this._create(profile)
    return await this.find(profile.sub, 'google')
  }

  async _update({ sub, name, picture }) {
    await this.query(
      `
        UPDATE
          users
        SET
          name = ?,
          picture = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE
          google_id = ?
      `,
      [name, picture, sub]
    )
  }

  async update(profile) {
    await this._update(profile)
    return await this.find(profile.sub, 'google')
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
