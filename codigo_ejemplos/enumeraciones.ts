// Declaración de una enumeración para representar el estado de un libro
enum BookStatus {
    Available,  // 0
    Reserved,   // 1
    Loaned      // 2
  }
  
  // Variable que almacena el estado actual del libro
  let currentStatus: BookStatus = BookStatus.Available;
  
  // Verificación y muestra del estado del libro
  console.log("Estado actual del libro:", currentStatus === BookStatus.Available ? "Disponible" : "No disponible");
  