const express = require('express');
const cors = require('cors');
const app = express();

port = process.env.PORT || 5173

app.use(cors())
app.get('/api', (_request, response) => {
    response.send({Hello: 'world!'})
})

app.listen(port,() => {console.log(`Redo på http://localhost:${port}`)})