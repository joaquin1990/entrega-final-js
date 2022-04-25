const paymentButton = document.querySelector(".subscribe");
paymentButton.onclick = () => payment();

function payment() {
  setTimeout(showMessage, 2500);
  setTimeout(redirect, 4400);

  function showDiv() {
    document.getElementById("spinnerPlace").innerHTML = `
    <div class="whiteSquare">
    <div style="size:60px" class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
    <h2> Su Pago se esta procesando...</h2>
  </div>
  `;
    setTimeout(function () {
      document.getElementById("spinnerPlace").style.display = "none";
    }, 2300);
  }
  showDiv();
  function showMessage() {
    Swal.fire({
      title: "Su compra se ha realizado con exito!",
      showConfirmButton: false,
      timer: 1800,
    });
  }
  function redirect() {
    window.location.href = "index.html";
  }
  const actualCart = [];
  localStorage.setItem("cart", JSON.stringify(actualCart));
  const originalStock = JSON.parse(localStorage.getItem("cartStock0"));
  localStorage.setItem("realStock", JSON.stringify(originalStock));
}
