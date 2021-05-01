import axios from 'axios'
 
const NGROK = "http://d2ebc5b0c97a.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

