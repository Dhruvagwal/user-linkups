import axios from 'axios'
 
const NGROK = "http://f459419bb2cc.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

