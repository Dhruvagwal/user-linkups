import axios from 'axios'
 
const NGROK = "http://73f8800e65d3.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

