import axios from 'axios'
 
const NGROK = "http://fa65eb86387d.ngrok.io"
const instances = axios.create({
    baseURL:`${NGROK}/mainlinkupsadmin/us-central1`
})

export default instances

