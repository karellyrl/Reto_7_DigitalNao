// Tipo de unión: permite que una variable sea de varios tipos (number o string en este caso)
let id: number | string;
id = 101;  // Se puede asignar un número
id = "ABC101";  // O se puede asignar un string

// Definición de una interfaz para un autor
interface Author {
  name: string;
  books: string[];
}

// Definición de una interfaz para un bibliotecario
interface Librarian {
  employeeId: number;
}

// Uso de un tipo de intersección: combina dos tipos (Author y Librarian)
let employee: Author & Librarian = {
  name: "Juan",
  books: ["Libro 1", "Libro 2"],
  employeeId: 1234  // Es obligatorio incluir las propiedades de ambas interfaces
};

// Muestra la información combinada del empleado
console.log(`Empleado: ${employee.name}, ID: ${employee.employeeId}`);
