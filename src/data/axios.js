import axios from 'axios'
 
const NGROK = "http://196420c1862f.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

