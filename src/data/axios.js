import axios from 'axios'
 
const NGROK = "http://97f2b503132c.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

