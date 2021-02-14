import listRepository from '../repositories/list-repository'
import userRepository from '../repositories/user-repository'
import {comparePasswords} from "../helpers/password";

const register = async ({email, password}) => {
    const list = await listRepository.create({
        title: 'My tasks',
        tasks: [
            { title: 'Do dishes', completed: false },
            { title: 'Walk the dog', completed: true },
        ]
    })

    const user = await userRepository.create({ email, password })

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

export default {
    register,
    login
}
