import axios from 'axios'
 
const NGROK = "http://069ce2f7c45c.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

