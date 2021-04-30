import axios from 'axios'
 
const NGROK = "http://eaac5c4f2906.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

