import axios from 'axios'
 
const NGROK = "http://facc88e2d9e1.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances