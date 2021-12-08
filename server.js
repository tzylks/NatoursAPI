import app from './app.js';

// console.log(app.get('env'))
//ENVIORNMENT VARIABLES
// console.log(process.env)

const port = process.env.port || 8000
app.listen(port, () => {
    console.log('App running on port: 8000')
})