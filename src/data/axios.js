import axios from 'axios'
 
const NGROK = "http://4bca7b58191b.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances