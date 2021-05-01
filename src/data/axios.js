import axios from 'axios'
 
const NGROK = "http://f2f0f23ecb51.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

