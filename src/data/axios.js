import axios from 'axios'
 
const NGROK = "http://edef80f97f61.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

