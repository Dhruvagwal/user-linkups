import instances from 'axios'

const getServices = ()=>{
    return instances.get(`/api/users/read`)
}