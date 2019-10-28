const models = require('../models')
const customers = models.customers
const rooms = models.rooms
const orders = models.orders

exports.show = async(req,res) =>{
    const result = await orders.findAll({
        include: [
        {
            model : rooms,
            as: "rooms"
        },
        {
            model : customers,
            as : "customers"
        }
    ]
    })
    res.send(result)
}
exports.checkRoom = async(req,res) =>{
    const roomId = req.params.roomId
    const result = await orders.findOne({
        include: [
        {
            model : rooms,
            as: "rooms"
        },
        {
            model : customers,
            as : "customers"
        }
        ],
        order : [
            ['createdAt','DESC']
        ],
        where:{room_id:roomId}
    })
    res.send(result)
}
exports.orderCheckOut = async(req,res) => {
    const idOrder = req.params.idOrder;
    const result = orders.update(
    {
        is_done: true,
        is_booked: false
    },
    {
        where: {
            id: idOrder
        } 
    }
    )
    res.send(result) 
}
exports.orderCheckIn = async(req,res) => {
    const result = orders.create(req.body)
    res.send(result) 
}
 