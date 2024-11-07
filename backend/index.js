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
app.use(express.json())
port = process.env.PORT || 3000

//GET ALL USERS - FLYTTAD FRÅN RAD 55 TILL 19 /Jonathan
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

//GET SINGLE USER
app.get('/api/user/:id', async (request, response) => {
    const userId = request.params.id;
    try {
        const result = await client.query(
            'SELECT * FROM userinformation WHERE id = $1;',
            [userId]
        )
        if (result.rows.length > 0) {
            response.send(result.rows[0]);
        } else {
            response.status(404).json({ error: 'User not found' });
        }
    }catch (error) {
        console.error(error)
        response.status(500).json({error: 'User not found'})
    }
})

//UPDATE
app.put ('/api/user/:id', async (request, response) => {
    const userId = request.params.id;
    const {firstname, lastname, company, professionalrole, area, webbaddress, phonenumber, email} = request.body
try{
    const result = await client.query(
        'UPDATE userInformation SET firstname = $1, lastName = $2, company = $3, professionalrole = $4, area = $5, webbaddress = $6, phonenumber = $7, email = $8 WHERE id = $9 RETURNING *;',
        [firstname, lastname, company, professionalrole, area, webbaddress, phonenumber, email, userId]
    );
    response.status(200).json(result.rows[0]);
} catch (error) {
    console.error(error);
    response.status(500).json({error: 'Failed to update user'})
}

})

//CREATE A NEW USER
app.post('/api/user', async (request, response) => {
    const { username, firstname, lastname, password, company, professionalrole, area, webbaddress, phonenumber, email } = request.body;

    try {
        const result = await client.query(
            'INSERT INTO userInformation (username, firstname, lastname, password, company, professionalrole, area, webbaddress, phonenumber, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;',
            [username, firstname, lastname, password, company, professionalrole, area, webbaddress, phonenumber, email]
        );

        response.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Failed to create user' });
    }
});


//I backendmappen: 
// Skapa .env fil 
// skriv i .env filen: PGURI=postgres://postgres:password@user/postgres
// OBS! byt ut password mot ditt lösenord samt user till din user
