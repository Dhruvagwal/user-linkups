import axios from 'axios'
 
const NGROK = "http://88fce6acf7ed.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

