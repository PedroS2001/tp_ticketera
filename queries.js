//La cantidad de tickets que atendio cada empleado
db.tickets.aggregate([
    {
        $unwind: "$responsables"
    },
    {
        $group: {
            _id: "$responsables.nombre",
            atendidos: { $sum: 1 }
        }
    }
])

//El empleado que mas tickets atendio
db.tickets.aggregate([
    {
        $unwind: "$responsables"
    },
    {
        $group: {
            _id: "$responsables.nombre",
            atendidos: { $sum: 1 }
        }
    },
    {
        $sort: {
            atendidos: -1
        }
    },
    {
        $limit: 1
    }
])

//La cantidad de tickets de cada cliente
db.tickets.aggregate([
    {
        $unwind: "$cliente"
    },
    {
        $group: {
            _id: { dni: "$cliente.dni", nombre: "$cliente.nombre", apellido: "$cliente.apellido" },
            tickets: { $sum: 1 }
        }
    }
])

//Cual es el motivo por el que llegan mas tickets
db.tickets.aggregate([
    {
        $group: {
            _id: "$motivo",
            cantidad: { $sum: 1 }
        }
    },
    {
        $sort: {
            cantidad: -1
        }
    },
    {
        $limit: 1
    }
])

//El motivo que mas hay v2
db.tickets.aggregate([
    {
        $sortByCount: '$motivo'
    },
    {
        $limit: 1
    }
])

//Todos los tickets que estan sin resolver
db.tickets.aggregate([
    {
        $match:{
            resuelto: false
        }
    }
])

// La cantidad de tickets en el mes de mayo
db.tickets.find(
    {
        $and: [
            {
                fecha_inicio: { $lte: new Date("2022/5/31") }
            },
            {
                fecha_inicio: { $gte: new Date("2022/5/1") }
            }
        ]
    }
).count()

//Todos los tickets de clientes de Zona Sur
db.tickets.find(
    {
        "cliente.localidad.nombre": { $in: ["Avellaneda", "Quilmes", "Lanus"] }
    }
)

//Todos los tickets que se resolvieron en 1 solo paso
db.tickets.find(
    {
        $and: [
            {
                pasos: {
                    $size: 1
                }
            },
            {
                resuelto: true
            }
        ]
    }
)

//Todos los que no tengan plan normal
db.clientes.find(
    {
        "tipo_de_plan.tipo": { $ne: "Normal" }
    }
)


//CREO INDICE EN LOCALIDADES PARA EMPEZAR A HACER CONSULTAS DE GEOJSON
db.localidades.createIndex({ posicion: "2dsphere" })
db.clientes.createIndex({ ubicacion: "2dsphere" })
db.empleados.createIndex({ camino: "2dsphere" })

//Obtengo un cliente y luego me fijo en que barrio esta segun su ubicacion
var cliente = db.clientes.findOne({});

db.localidades.findOne({
    posicion:
    {
        $geoIntersects:
        {
            $geometry: cliente.ubicacion
        }
    }
},
    { "nombre": 1 }
)
//tambien podria hacer cliente.localidad.nombre xq la localidad esta en el cliente.
//Ahora con esto (consultas compuestas) y el lookup me parece que me quedan mas chicos los tickets


//Todos los clientes que su apelllido sea Gonzalez o Perez que esten en una localidad
var localidad = db.localidades.findOne({});
db.clientes.find({
    $or: [
        { "apellido": "Gonzalez" },
        { "apellido": "Perez" },
    ],
    ubicacion:
    {
        $geoWithin:
        {
            $geometry: localidad.posicion
        }
    }
})


//Si hay algun tecnico que pase a 2km de un cliente
var cliente = db.clientes.findOne({});
db.empleados.find({
    tipo: "tecnico",
    camino:
    {
        $near:
        {
            $geometry: cliente.ubicacion,
            $maxDistance: 2000
        }
    }
})


//Todos los clientes que estan cercca del tecnico
var tecnico = db.empleados.findOne({ "tipo": "tecnico" })
db.clientes.find({
    ubicacion: {
        $near: {
            $geometry: tecnico.area.posicion,
            $maxDistance: 5000
        }
    }
}, {
    "localidad.posicion": 0,
    "tipo_de_plan.canales": 0
})

//las localidades de los cliente si no tuvieran localidaad en su cuerpo
db.clientes.aggregate([
    {
        $lookup:
        {
            from: "localidades",
            localField: "localidad.nombre",
            foreignField: "nombre",
            as: "nombreLocalidad"
        }
    },
    {
        $project: {
            "nombreLocalidad": 1
        }
    }
])






//CREO INDICE DE TEXTO
db.tickets.createIndex(
    {
        "motivo": "text",
        "cliente.nombre": "text",
        "cliente.apellido": "text",
        "cliente.tipo_de_plan.tipo": "text",
        "cliente.localidad.nombre": "text",
        "cliente.localidad.descripcion": "text",
        "responsables.nombre": "text",
        "responsables.apellido": "text",
        "pasos": "text"
    },
    {
        weights:
        {
            "motivo": 100,
            "cliente.nombre": 90,
            "cliente.apellido": 90,
            "cliente.tipo_de_plan.tipo": 50,
            "cliente.localidad.nombre": 50,
            "cliente.localidad.descripcion": 40,
            "responsables.nombre": 60,
            "responsables.apellido": 60,
            "pasos": 70
        },
        name: "TextIndex"
    }
)

//Busco los que el cliente o el responsable sean Gonzalez
db.tickets.find({
    $text: {
        $search: "Gonzalez"
    }
}).count()


db.tickets.find({
    $text: {
        $search: "Gonzalez"
    }
},
{
    "cliente.apellido":1,
    "responsables.apellido":1,
    score: { $meta: "textScore" }
}).sort( { score: { $meta: "textScore" } } ).pretty()








//AYUDA DATETIME
var obj = findOne();
db.tickets.aggregate([
    {
        $project: {
            _id: 0,
            diaDelMes: { $dayOfMonth: obj.fecha },
            mes: { $month: obj.fecha },
            anio: { $year: obj.fecha },
            hora: { $hour: obj.fecha },
            minuto: { $minute: obj.fecha },
            segundo: { $second: obj.fecha },
            diaDelAnio: { $dayOfYear: obj.fecha },
            diaDeLaSemana: { $dayOfWeek: new Date() },
            semana: { $week: new Date() },
            milisegundo: { $millisecond: new Date() }
        }
    }
]).pretty()



db.ships.aggregate([
    {

        $match: { Name: "MSC Zoe" }
    },
    {
        $lookup:
        {
            from: "containers",
            localField: "Name",
            foreignField: "shipName",
            as: "cargo"
        }
    },
    {
        $project: {
            nave: "$Name",
            cantidadCargo:
            {
                $size: "$cargo"
            }
        }
    },
    {

        $out: "vistaejer3"
    }
])
