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

//Todos los tickets iniciados en un dia en particular       XFALTAX
db.tickets.aggregate([
    {
        $match: {
            fecha_inicio: Date
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



