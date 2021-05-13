import axios from 'axios'
 
const NGROK = "http://e82a3e62ff02.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances