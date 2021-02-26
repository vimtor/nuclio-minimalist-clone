import listRepository from '../repositories/list-repository'
import userRepository from '../repositories/user-repository'
import {comparePasswords} from "../helpers/password";

const register = async ({email, password}) => {

    let user = await userRepository.findByEmail(email)
    if(user){
        return false;
    }
    const list = await listRepository.create({
        title: 'My tasks',
        tasks: [
            { title: 'Do dishes', completed: false },
            { title: 'Walk the dog', completed: true },
        ]
    })

    user = await userRepository.create({ email, password })

    await listRepository.updateById(list._id, { owners: [user._id] })
    return userRepository.updateById(user._id, { lists: [list._id] })
}

const login = async ({email, password}) => {
    const user = await userRepository.findByEmail(email)
    const equalPasswords = await comparePasswords({plain: password, hash: user.password});
    if (equalPasswords) {
        return user
    }
    return null
}
const getUsersEmails = async (id) => {
    const usersInfo = await userRepository.getAllUsers(id);
    
    const length = Object.keys(usersInfo).length;
    let emails = [];

    for (let i = 0; i < length; i++){
        emails.push(usersInfo[i].email);
    }
   
    return emails;
}

const getOwners = async (owners, id) => {
    let ownersEmails = [];
       
    // Email del user para filtrar los emails menos quien está logged
    const userInfo = await userRepository.getUser(id);
    const userLoggedEmail = userInfo[0].email;
        
    //  Devolver los Owners de la lista, si no está logged y es Owner va dentro de Owners emails
    await Promise.all(owners.map(async id => {
        
        const response = userRepository.findById(id);
        const user = await response;
        if(user.email !== userLoggedEmail){
            ownersEmails.push(user.email);
            }
        }

    ))
  
    return ownersEmails;
}
export default {
    getUsersEmails,
    getOwners,
    register,
    login
}
