
//#region Inserto tickets

db.tickets.insertOne({
    "fecha": new Date("2022/5/27"),
    "motivo": "devolucion",
    "cliente": {
        "nombre": "Juan",
        "apellido": "Perez",
        "posicion": 777,
        "tipo_de_plan": {
            "tipo": "Normal",
            "cant_canales": 10,
            "canales": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            "precio": 1500.50
        },
        "localidad": {
            "nombre": "Avellaneda",
            "descripcion": "lorem impsu",
            "codigo_postal": 5412
        }
    },
    "responsables": [
        {
            "nombre": "emplea",
            "apellido": "ado",
            "area": { "nombre": "atencion al cliente", "posicion": 888 }
        },
        {
            "nombre": "pepe",
            "apellido": "messi",
            "area": "sistemas"
        }
    ],
    "pasos": ["Recepcion", "consulta", "servicio tecnico", "repuestos"],
    "resuelto": false,
    "finalizado": false
})

db.tickets.insertOne({
    "fecha": new Date("2022/5/27"),
    "motivo": "no me gusto",
    "cliente": {
        "nombre": "Pablo",
        "apellido": "Gonzalez",
        "posicion": 777,
        "tipo_de_plan": {
            "tipo": "Premium",
            "cant_canales": 20,
            "canales": [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            "precio": 2500
        },
        "localidad": {
            "nombre": "Avellaneda",
            "descripcion": "Zona sur",
            "codigo_postal": 1092
        }
    },
    "responsables": [
        {
            "nombre": "Rodrigo",
            "apellido": "Quintero",
            "area": { "nombre": "atencion al cliente", "posicion": 888 }
        }
    ],
    "pasos": ["Recepcion"],
    "resuelto": false,
    "finalizado": true
})

db.tickets.insertOne({
    "fecha": new Date(),
    "motivo": "devolucion",
    "cliente": {
        "nombre": "Juan",
        "apellido": "Perez",
        "posicion": 777,
        "tipo_de_plan": {
            "tipo": "Normal",
            "cant_canales": 10,
            "canales": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            "precio": 1500.50
        },
        "localidad": {
            "nombre": "Avellaneda",
            "descripcion": "lorem impsu",
            "codigo_postal": 5412
        }
    },
    "responsables": [
        {
            "nombre": "emplea",
            "apellido": "ado",
            "area": { "nombre": "atencion al cliente", "posicion": 888 }
        },
        {
            "nombre": "pepe",
            "apellido": "messi",
            "area": "sistemas"
        }
    ],
    "pasos": ["Recepcion", "consulta", "servicio tecnico", "repuestos"],
    "resuelto": false,
    "finalizado": false
})

//#endregion

//#region inserto Clientes
db.clientes.insertOne({
    "nombre": "Juan",
    "apellido": "Perez",
    "posicion": 777,
    "tipo_de_plan": {
        "tipo": "Normal",
        "cant_canales": 10,
        "canales": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "precio": 1250.55
    },
    "localidad": {
        "nombre": "Avellaneda",
        "descripcion": "Zona sur",
        "codigo_postal": 1092
    }
})

db.clientes.insertOne({
    "nombre": "Pablo",
    "apellido": "Gonzalez",
    "posicion": 777,
    "tipo_de_plan": {
        "tipo": "Premium",
        "cant_canales": 20,
        "canales": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "precio": 2500
    },
    "localidad": {
        "nombre": "Avellaneda",
        "descripcion": "Zona sur",
        "codigo_postal": 1092
    }
})

//#endregion

//#region inserto localidades
db.localidades.insertOne({
    "nombre": "Florencio varela",
    "descripcion": "pais del noba",
    "codigo_postal": 1888
})

db.localidades.insertOne({
    "nombre": "Avellaneda",
    "descripcion": "Zona sur",
    "codigo_postal": 1092
})
//#endregion

//#region inserto planes
db.planes.insertOne({
    "tipo": "Premium",
    "cant_canales": 20,
    "canales": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    "precio": 2500.50
})

db.planes.insertOne({
    "tipo": "Normal",
    "cant_canales": 10,
    "canales": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "precio": 1250.55
})

//#endregion

//#region inserto empleados

db.empleados.insertOne({
    "nombre": "emple",
    "apellido": "ado",
    "area": {
        "nombre": "atencion al cliente",
        "posicion": 777
    }
})
//#endregion


//#region Location Point para clientes
//La Boca
{
    "type": "Point",
    "coordinates": [
            -58.36117744445801,
            -34.63419661490388
        ]
}

//Constitucion
{
    "type": "Point",
    "coordinates": [
            -58.38563919067382,
            -34.62579225932789
        ]
}

//Balvanera
{
    "type": "Point",
    "coordinates": [
            -58.39774131774902,
            -34.60820392067226
        ]
}

//Otro Balvanera
{
    "type": "Point",
    "coordinates": [
            -58.400487899780266,
            -34.60735619576232
        ]
}

//Palermo
{
    "type": "Point",
    "coordinates": [
            -58.416624069213874,
            -34.58665489383671
        ]
}

//Avellaneda
{
    "type": "Point",
    "coordinates": [
            -58.36306571960449,
            -34.66431111283041
        ]
}

//#endregion
