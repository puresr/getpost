const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const users = require('../../Users');


//get all users
router.get('/', (req, res) => res.json(users));

//Get single users
router.get('/:id', (req, res) => {
    let found = users.some(user => user.id === req.params.id)
    if(found){
        res.json(users.filter(user => user.id === req.params.id))
    } else{
        res.status(400).json({ msg: `No uesrs with the id of ${req.params.id}` });
    }
})


//create users
router.post('/' , (req, res) =>{
    const newUser ={
        id: uuid.v4(),
        name: req.body.name,
        lastname: req.body.lastname,
        birth: req.body.birth
    }
    if(!newUser.name || !newUser.lastname){
        return res.status(400).json({ msg: 'Please inclde a name and lastname'});
    }

    users.push(newUser);
    res.json(users);
})

//Update Users
router.put('/:id', (req, res) => {
    let found = users.some(user => user.id === req.params.id)

    if (found){
        const updUser = req.body;
        users.forEach(user => {
            if (user.id ==parseInt(req.params.id)){
                user.name = updUser.name ? updUser.name : user.name;
                user.lastname = updUser.lastname ? updUser.lastname : user.lastname;
                user.birth =updUser.birth ? updUser.birth :user.lastname;
            
                res.json({ msg:'User update', user});
            }
        })
    }else{
        res.status(400).json({ msg: `No user eith the id od ${res.params.id}`})
    }
})
module.exports = router;