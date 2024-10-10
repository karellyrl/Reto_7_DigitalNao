"use strict";
// Declaración de una enumeración para representar el estado de un libro
var BookStatus;
(function (BookStatus) {
    BookStatus[BookStatus["Available"] = 0] = "Available";
    BookStatus[BookStatus["Reserved"] = 1] = "Reserved";
    BookStatus[BookStatus["Loaned"] = 2] = "Loaned"; // 2
})(BookStatus || (BookStatus = {}));
// Variable que almacena el estado actual del libro
let currentStatus = BookStatus.Available;
// Verificación y muestra del estado del libro
console.log("Estado actual del libro:", currentStatus === BookStatus.Available ? "Disponible" : "No disponible");
