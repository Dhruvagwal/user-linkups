import axios from 'axios'
 
const NGROK = "http://3d2d0cb65626.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances