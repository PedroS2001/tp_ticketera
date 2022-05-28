ticket:{
    fecha: Date,
    hora: Date,
    motivo: "devolucion",
    cliente: {
        nombre: "Juan",
        apellido: "Perez",
        posicion: GPS,
        tipo_de_plan: {
            tipo: "Normal",
            cant_canales: 55,
            canales:[4,5,6,7,8,9,11],
            precio: 1250.55 
        },
        localidad:{
            nombre: "Avellaneda",
            descripcin: "lorem impsu",
            codigo_postal: 5412
        }
    },
    responsables:[
        { 
            "nombre": "emplea",
            "apellido": "ado",
            area: {"nombre": "atencion al cliente", posicion: GPS}
        },
        {
            "nombre": "pepe",
            "apellido" :"messi",
            area: "sistemas"
        }
    ],
    pasos: ["Recepcion", "consulta", "servicio tecnico", "repuestos"],
    resuelto: false,
    finalizado: false

}

tipo_de_plan: {
    tipo: "Normal",
    cant_canales: 55,
    canales:[4,5,6,7,8,9,11],
    precio: 1250.55 
},

cliente: {
    nombre: "Juan",
    apellido: "Perez",
    posicion: GPS,
    tipo_de_plan: {
        tipo: "Normal",
        cant_canales: 55,
        canales:[4,5,6,7,8,9,11],
        precio: 1250.55 
    },
    localidad:{
        nombre: "Avellaneda",
        descripcin: "lorem impsu",
        codigo_postal: 5412
    }
}

localidad:{
    nombre: "Avellaneda",
    descripcin: "lorem impsu",
    codigo_postal: 5412
}

empleado:{
    { 
        "nombre": "emplea",
        "apellido": "ado",
        "area": {"nombre": "atencion al cliente", "posicion": GPS}
    },
}