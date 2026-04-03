require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function setupDatabase() {
  try {
    console.log('Connecting to Neon database...');
    const client = await pool.connect();
    
    console.log('Reading schema.sql...');
    const schema = fs.readFileSync('./schema.sql', 'utf8');
    
    console.log('Executing schema...');
    await client.query(schema);
    
    console.log('✅ Database schema created successfully!');
    client.release();
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await pool.end();
  }
}

setupDatabase();
