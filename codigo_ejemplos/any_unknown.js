"use strict";
// Uso del tipo 'any', que permite cualquier tipo de valor
let randomValue = 10;
randomValue = "Ahora soy un string"; // El valor se puede cambiar sin restricciones
// Uso del tipo 'unknown', que también acepta cualquier tipo, pero requiere verificación antes de usar
let unknownValue = "Podría ser cualquier cosa";
// Verificación del tipo antes de usar el valor de 'unknown'
if (typeof unknownValue === 'string') {
    console.log(unknownValue.toUpperCase()); // Operación válida solo si es un string
}
else {
    console.log("No es un string");
}
