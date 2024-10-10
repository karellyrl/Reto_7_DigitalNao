// Declaración de un array de strings (colección de títulos de libros)
let bookTitles: string[] = ["TypeScript Guide", "Nest.js in Action"];

// Declaración de una tupla con valores de diferentes tipos
let book: [string, string, number] = ["1234-5678", "TypeScript Basics", 2021];

// Declaración de un set (colección de valores únicos)
let uniqueBooks: Set<string> = new Set(["Book 1", "Book 2", "Book 1"]);  // No permite duplicados
uniqueBooks.add("Book 3");  // Agregar un nuevo libro al set

// Declaración de un map (colección de pares clave-valor)
let bookAuthors: Map<string, string> = new Map();
bookAuthors.set("1234-5678", "Juan Rivera");  // Asignar un autor a un ISBN
bookAuthors.set("5678-1234", "Blanca López");  // Asignar otro autor a un ISBN diferente

// Muestra las colecciones en la consola
console.log("Libros:", bookTitles);
console.log("Libro con ISBN y año:", book);
console.log("Autores de libros:", bookAuthors);
