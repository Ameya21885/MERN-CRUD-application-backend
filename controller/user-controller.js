import User from '../model/user.js';

// Get all users
export const getUsers = async (request, response) => {

   
    try{
        const users = await User.find();
        response.status(200).json(users);

    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

// Save data of the user in database
export const addUser = async (req, res) => {
    const user = req.body;
    console.log(req)
    try{
        const newUser = new User(user);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error){
        res.status(409).json({ message: error.message});     
    }
}

// Get a user by id
export const getUserById = async (request, response) => {
    try{
        const user = await User.findOne({_id:request.params.id});
        console.log(user)
        response.status(200).json(user);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

// Save data of edited user in the database
export const editUser = async (request, response) => {
    let user = request.body;

    // const editUser = new User(user);
    try{
        await User.updateOne({_id: request.params.id}, user);
        response.status(201).json({message:"user edited successfully"});
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

// deleting data of user from the database
export const deleteUser = async (request, response) => {
    try{
        await User.deleteOne({_id: request.params.id});
        response.status(201).json("User deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}