//--------------------------------Ceritanya ini library------------------------------------------------------
// Fungsi utama yang menerima callback dan parameter tambahan
function performCalculation(a, b, callback) {
  console.log("Menghitung...");
  setTimeout(() => {
    const sum = a + b;
    // Memanggil callback dengan hasil perhitungan dan parameter tambahan sebagai argumen
    callback(sum, a, b);
  }, 2000); // Menunggu 2 detik
}

// Memanggil performCalculation dengan displayResult sebagai callback
performCalculation(5, 10, displayResult);

//-----------------------------Library End-----------------------------------------------------------------
// User panggil Callback
function displayResult(result, a, b) {
  console.log(`Hasil dari ${a} + ${b} adalah ${result}`);
}
