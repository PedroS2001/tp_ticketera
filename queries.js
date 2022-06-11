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
            atendidos: 1
        }
    },
    {
        $limit: 1
    }
])

//Todos los tickets que estan sin resolver
db.tickets.aggregate([
    {
        $match: {
            resuelto: false
        }
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
            cantidad: 1
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
db.tickets.find({
    "cliente.localidad.nombre" : {$in: ["Avellaneda", "Quilmes", "Lanus"]}
})



//CREO INDICE EN LOCALIDADES PARA EMPEZAR A HACER CONSULTAS DE GEOJSON
db.localidades.createIndex({ posicion: "2dsphere" })
db.clientes.createIndex({ ubicacion: "2dsphere" })
db.empleados.createIndex({ camino: "2dsphere" })

//Obtengo un cliente y luego me fijo en que barrio esta
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
    $or:[
        {"apellido": "Gonzalez"},
        {"apellido": "Perez"},
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
    tipo:"tecnico",
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
var tecnico = db.empleados.findOne({"tipo":"tecnico"})
db.clientes.find({
    ubicacion:{
        $near:{
            $geometry: tecnico.area.posicion,
            $maxDistance: 5000
        }
    }
},{
    "localidad.posicion":0,
    "tipo_de_plan.canales":0
})






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



