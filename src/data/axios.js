import axios from 'axios'
 
const NGROK = "http://fd8dd260fc1b.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

