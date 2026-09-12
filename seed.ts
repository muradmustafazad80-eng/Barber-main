import pg from 'pg'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres'
})

async function main() {
  try {
    // Köhnə statik məlumatları silirik
    await pool.query('DELETE FROM "Service"')
    await pool.query('DELETE FROM "BusinessSetting"')

    // Canlı test xidmətlərini və iş saatlarını real SQL ilə birbaşa bazaya yazırıq
    await pool.query(
      'INSERT INTO "Service" (id, name, price, duration, category, "createdAt") VALUES ($1, $2, $3, $4, $5, NOW())',
      ['s1', 'Saç Kəsimi', 20, 30, 'Hair']
    )
    await pool.query(
      'INSERT INTO "Service" (id, name, price, duration, category, "createdAt") VALUES ($1, $2, $3, $4, $5, NOW())',
      ['s2', 'Saqqal Təraşı', 10, 20, 'Beard']
    )
    await pool.query(
      'INSERT INTO "BusinessSetting" (id, key, value) VALUES ($1, $2, $3)',
      ['b1', 'working_hours', 'Hər gün: 09:00 – 21:00']
    )

    console.log('--- SEED DATA UGURLA HAZIRLANDI ---')
  } catch (err) {
    console.error(err)
  } finally {
    await pool.end()
  }
}

main()
