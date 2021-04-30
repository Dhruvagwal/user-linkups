import axios from 'axios'
 
const NGROK = "http://ba9587d321fd.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

