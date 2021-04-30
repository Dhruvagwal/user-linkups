import axios from 'axios'
 
const NGROK = "http://62c13b95aeba.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

