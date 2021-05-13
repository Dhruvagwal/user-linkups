import axios from 'axios'
 
const NGROK = "http://a9ff990dd168.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances