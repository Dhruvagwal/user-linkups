import axios from 'axios'
 
const NGROK = "http://93b26e7cadcc.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

