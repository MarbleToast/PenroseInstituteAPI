import { Pool } from "pg"

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "penrose",
    port: 5432
})

pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", client, err)
    process.exit(-1)
})

export default pool
