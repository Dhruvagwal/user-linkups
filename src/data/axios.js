import axios from 'axios'
 
const NGROK = "http://308f65402866.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances