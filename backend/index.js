const express = require('express');
const cors = require('cors');
const app = express();
path = require('path')
const dotenv = require('dotenv'),
{ Client } = require('pg')

dotenv.config()
const client = new Client({
    connectionString: process.env.PGURI
})
client.connect()

app.use(cors())
port = process.eventNames.PORT || 3000

app.get('/api', async (_request, response) => {
    const {rows} = await client.query(
        'SELECT * FROM userInformation'
    )
    response.send(rows)
})

app.use(express.static(path.join(path.resolve(), 'dist')))
app.listen(port, () => {
    console.log(`Redo på http://localhost:${port}/`)
})


//I backendmappen: 
// Skapa .env fil 
// skriv i .env filen: PGURI=postgres://postgres:password@user/postgres
// OBS! byt ut password mot ditt lösenord samt user till din user
