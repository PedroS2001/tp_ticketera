tickets:{
    fecha_inicio: Date,
    fecha_fin: Date,
    motivo: "devolucion",
    cliente: {
        nombre: "Juan",
        apellido: "Perez",
        dni: 12345678,
        ubicacion: {
            "type": "Point",
            "coordinates":[123,132]
        },
        tipo_de_plan: {
            tipo: "Normal",
            cant_canales: 55,
            canales:[4,5,6,7,8,9,11],
            precio: 1250.55 
        },
        localidad:{
            nombre: "Avellaneda",
            descripcion: "lorem impsu",
            codigo_postal: 5412,
            posicion: {
                "type": "Polygon",
                "coordinates": [
                    [123,124],
                    [123,122],
                    [122,125]
                ]
            },
        }
    }
    responsables:[
        { 
            "idEmpleado":1, 
            "nombre": "emplea",
            "apellido": "ado",
            "dni": 12345678,
            area: {
                "nombre": "atencion al cliente",
                posicion: {
                    "type": "Point",
                    "coordinates":[123,132]
                }
            }
        },
        {
            "idEmpleado":1, 
            "nombre": "pepe",
            "apellido" :"messi",
            "dni": 12345678,
            area: {
                "nombre": "atencion al cliente",
                posicion: {
                    "type": "Point",
                    coordinates:[123,132]
                }
                }
        }
    ],
    pasos: [ "atencion al cliente", "servicio tecnico"],
    resuelto: false,
    finalizado: false

}

planes: {
    tipo: "Normal",
    cant_canales: 10,
    canales:[4,5,6,7,8,9,11],
    precio: 1250.55 
},

clientes: {
    nombre: "Juan",
    apellido: "Perez",
    dni: 12345678,
    ubicacion: {
        "type": "Point",
        "coordinates":[123,132]
    },
    tipo_de_plan: {
        tipo: "Normal",
        cant_canales: 55,
        canales:[4,5,6,7,8,9,11],
        precio: 1250.55 
    },
    localidad:{
        nombre: "Avellaneda",
        descripcion: "lorem impsu",
        codigo_postal: 5412,
        posicion: {
            "type": "Polygon",
            "coordinates": [
                [123,124],
                [123,122],
                [122,125]
            ]
        },
    }
}

localidades:{
    nombre: "Avellaneda",
    descripcion: "lorem impsu",
    codigo_postal: 1092,
    posicion: {
        "type": "Polygon",
        "coordinates": [
            [123,124],
            [123,122],
            [122,125]
        ]
    }
}

empleados:{
    {
        "idEmpleado":1, 
        "nombre": "emple",
        "apellido": "ado",
        "dni": 12345678,
        "area": {"nombre": "atencion al cliente", "posicion": GPS},
        "tipo": "tecnico",
        "posicion": {
            "type": "LineString",
            "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]
        },
        "camino": Linestring
    }
}


oficinas:{
    "idOficina": 1,
    "nombre": "oficina de empaquetado",
    "posicion": {
        "type": "Point",
        "coordinates":[123,132]
    },
    "area_cobertura": {
        "type": "Polygon",
        "coordinates": [
            [123,124],
            [123,122],
            [122,125]
        ]
    }
}