"use strict";
// Tipo de unión: permite que una variable sea de varios tipos (number o string en este caso)
let id;
id = 101; // Se puede asignar un número
id = "ABC101"; // O se puede asignar un string
// Uso de un tipo de intersección: combina dos tipos (Author y Librarian)
let employee = {
    name: "Juan",
    books: ["Libro 1", "Libro 2"],
    employeeId: 1234 // Es obligatorio incluir las propiedades de ambas interfaces
};
// Muestra la información combinada del empleado
console.log(`Empleado: ${employee.name}, ID: ${employee.employeeId}`);
