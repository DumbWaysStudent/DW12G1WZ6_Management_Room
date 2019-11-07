const models = require('../models')
const customers = models.customers

exports.show = async(req,res) =>{
    const result = await customers.findAll()
    res.send(result)
}
exports.detail = async(req,res) =>{
    const customerId = req.params.customerId
    const result = await customers.findOne({where:{id:customerId}})
    res.send(result)
}
exports.add = async(req,res) =>{
    const {name,id_card,phone_number} = req.body
    const result = await customers.create({
        name,
        id_card,
        phone_number,
        image: req.file.path
    })
    res.send(result)
}
exports.edit = async(req,res) =>{
    const customerId = req.params.customerId
    const result = await customers.update(req.body,{where:{id:customerId}})
    res.send(result)
} 