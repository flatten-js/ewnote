import mysql from 'mysql2/promise'
import { timezone } from '../../utils'

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

class Mysql {
  constructor() {}

  date(name, format) {
    return `
      DATE_FORMAT(
        CONVERT_TZ(${name}, 'UTC', '${timezone()}'),
        '${format}'
      )
    `
  }

  async query(sql, params) {
    return await pool.query(sql, params)
  }

  async exec(sql, params) {
    const [[row]] = await this.query(sql, params)
    return row
  }
}

export default Mysql
