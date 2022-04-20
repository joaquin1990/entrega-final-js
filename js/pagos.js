const paymentButton = document.querySelector(".subscribe");
paymentButton.onclick = () => payment();

function payment() {
  setTimeout(showMessage, 2500);
  function showDiv() {
    console.log("funciona");
    document.getElementById("spinnerPlace").innerHTML = `
    <div class="whiteSquare">
    <div style="size:60px" class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
    <h2> Procesando Pagos...</h2>
  </div>
  `;
    setTimeout(function () {
      document.getElementById("spinnerPlace").style.display = "none";
    }, 2300);
  }
  showDiv();
  function showMessage() {
    swal(`Su compra se ha realizado con exito`, "Muchas gracias!", "success");
  }
}
