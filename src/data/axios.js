import axios from 'axios'
 
const NGROK = "http://a47ff5ba2684.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances