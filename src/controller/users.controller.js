// const UserServices = require('../dao/mongo/services/users.services')
const UserService = require('../services/users.service');
const Service = new UserService()


const getUser = async (req,res)=>{
    try{
        const users = await Service.getAll();
        return res.status(200).json({
            status: 'success',
            msg: 'Users founds',
            data: users,
        })
    }
    catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
}

const getUserById = async (req, res) => {
    try {
        const uid = req.params.uid;
        const user= await  Service.getById(uid)
        return user? 
        res.status(200).json({
            status: 'success', 
            msg: 'User Get by ID',
            data:user,
        }):
        res.status(200).json({
            status: 'error',
            msg: 'User not found',                                                             
            data: user,
        })
    } 
    catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
      });
    }
}

const postUser = (req, res) => {
    res.redirect('/session/login')
} 

const rolUserById = async (req,res)=>{
    try{
        let _id = req.params.uid
        const user = await  Service.getById(_id)
        console.log(user)
        if(user.rol === 'User'){
            user.rol= 'Premium' 
            await Service.updateOne(_id, user.firstName, user.lastName, user.email, user.age, user.password, user.rol)
            return res.status(201).json({
                status: 'success',
                msg: 'User update rol: Premium',
            });

        }else{
            user.rol= 'User'
            await Service.updateOne(_id, user.firstName, user.lastName, user.email, user.age, user.password, user.rol)
            return res.status(201).json({
                status: 'success',
                msg: 'User update rol: User',
            });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
}

const delUserById =  async (req, res) => {
    try {
    const uid = req.params.uid;
    await Service.deletedOne(uid)
    return res.status(200).json({
        status: 'success',
        msg: 'User deleted',
        data: {},
    });
    } catch (e) {
    console.log(e);
    return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
    });
    }
}

const putUserById = async (req, res) => { 
    try {
        const uid = req.params.uid;
        const { firstname, lastname,  email, age, password, rol } = req.body;
        const data= req.body
        console.log(uid)
        await Service.updateOne(uid, firstname, lastname,  email, age, password, rol)
        return res.status(201).json({
            status: 'success',
            msg: 'User update',
            data:data,
        });
    } 
    catch (e) {
        console.log(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
}

 
module.exports = {
    getUser,
    getUserById,
    postUser,
    delUserById,
    putUserById,
    rolUserById
}
