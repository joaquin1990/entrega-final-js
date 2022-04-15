// Estas dos funciones las utilizamos para agilizar un poco, para hacer el codigo un poco mas corto:
function getStorage() {
  let storage = JSON.parse(localStorage.getItem("cart")) || [];
  return storage;
}
function setStorage(array) {
  localStorage.setItem("cart", JSON.stringify(array));
}

// Con este fragmento de codigo contamos cuantos items hay en el cart independientemente de si alguno de los items se repite, cuenta como mas de uno. Tambien esta adentro de la funcion de addToCart porque sino cuando se ejecuta la funcion no se actualiza

function cartLength() {
  const bringCart = getStorage();
  if (bringCart !== null) {
    let cartCounter = 0;
    for (prods of bringCart) {
      cartCounter += prods.cantidad;
    }
    document.getElementById("prod-quantity").innerHTML = cartCounter;
  }
}
cartLength();

// Funcion para empezar a trabajar con una base de datos traida desde un archivo JSON:
let bringProducts = [];
let cart;
let testing;
fetch("/js/data.json")
  .then((res) => res.json())
  .then((data) => {
    bringProducts = data;
  })
  .then(() => generateCards(bringProducts))
  .then(() => localStorage.setItem("cartStock0", JSON.stringify(bringProducts)))
  .then(() => (testing = JSON.parse(localStorage.getItem("cartStock0"))))
  .then(() => console.log(testing))
  .then(() => saleProducts())
  .then(() => (cart = getStorage()));

// Para soluionar el problema de asyncronicidad que estoy teniendo, hice estas dos funciones para que el programa sea funcional. Posteriormente sacar esta funcion para que todo funcione mejor.
let upToDateStock;
function solvingAsyncronicProblem() {
  setTimeout(defineUpToDateStock, 1000);
}
function defineUpToDateStock() {
  upToDateStock = JSON.parse(localStorage.getItem("cartStock0"));
}
solvingAsyncronicProblem();

// Validacion de si el cart en el local storage es null, o si tiene elementos adentro con un ternario.
function stockValidation() {
  let cartStorage = getStorage();
  localStorage.getItem("cart") != null ? (cart = cartStorage) : (cart = []);
}
stockValidation();

// Esta viene a ser nuestra Base de datos:
// const products = [
//   {
//     id: 0,
//     title: "Vela de Rosa",
//     price: 760,
//     stock: 2,
//     image: "./images/hogar-holístico.jpeg",
//     status: "normal",
//     cantidad: 0,
//   },
//   {
//     id: 1,
//     title: "Vela de Vainilla",
//     price: 730,
//     stock: 2,
//     image: "./images/hogar-holístico.jpeg",
//     status: "offer",
//     cantidad: 0,
//   },
//   {
//     id: 2,
//     title: "Aromatizante de lavanda",
//     price: 550,
//     stock: 3,
//     image: "./images/hogar-holístico.jpeg",
//     status: "normal",
//     cantidad: 0,
//   },
//   {
//     id: 3,
//     title: "Aromatizante Night",
//     price: 550,
//     stock: 4,
//     image: "./images/hogar-holístico.jpeg",
//     status: "normal",
//     cantidad: 0,
//   },
//   {
//     id: 4,
//     title: "Aromatizante Daytime",
//     price: 530,
//     stock: 3,
//     image: "./images/hogar-holístico.jpeg",
//     status: "normal",
//     cantidad: 0,
//   },
//   {
//     id: 5,
//     title: "Aromatizante Morning",
//     price: 540,
//     stock: 1,
//     image: "./images/hogar-holístico.jpeg",
//     status: "offer",
//     cantidad: 0,
//   },
//   {
//     id: 6,
//     title: "Aromatizante de Eucaliptus",
//     price: 500,
//     stock: 0,
//     image: "./images/hogar-holístico.jpeg",
//     status: "normal",
//     cantidad: 0,
//   },
//   {
//     id: 7,
//     title: "Aromatizante de Limon",
//     price: 540,
//     stock: 3,
//     image: "./images/hogar-holístico.jpeg",
//     status: "offer",
//     cantidad: 0,
//   },
//   {
//     id: 8,
//     title: "Vela de Pino",
//     price: 740,
//     stock: 2,
//     image: "./images/hogar-holístico.jpeg",
//     status: "normal",
//     cantidad: 0,
//   },
// ];
// console.log(products);
// Con la funcion generateCards, a traves de un forEach recorre el parametro de la funcion (deberia ser un array), y va agregando a traves de un forEach todos los productos al cardAccumulator. La funcion temrina con otra funcion “showCardsInHTML“ que tiene como parametro el cardAccumulator variable let de la actual funcion.
function generateCards(productsToShow) {
  let cardAccumulator = ``;
  productsToShow.forEach((arrayElement) => {
    cardAccumulator += `<div class="col mb-5">
        <div class="card h-100">
            <!-- sale badge-->
            <div class="badge bg-dark text-white position-absolute" style="top: 2.5rem; right: 0.5rem">
                ${arrayElement.status === "offer" ? "En Oferta" : ""}
            </div>
            <!-- stock badge-->
            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">
                ${arrayElement.stock > 0 ? "Stock disponible" : "Sin stock"}
            </div>
            <!-- Product image-->
            <img class="card-img-top" src="${arrayElement.image}" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4"> 
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${arrayElement.title}</h5>
                    <!-- Product price-->
                    <input value="1" min="1" id="cantidad-${
                      arrayElement.id
                    }" type="number" placeholder="cantidad">
                    $${arrayElement.price}
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent" >
                <div class="text-center">
                    <button onclick="trigger(${
                      arrayElement.id
                    });renderCart()" id="${arrayElement.id}" 
                    class="btn btn-outline-dark mt-auto cardButton" href="#">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    </div>`;
  });
  showCardsInHTML(cardAccumulator);
}

// Con esta funcion mostramos las cards en el HTML, con el cardAccumulator como parametro, que es la variable que se creo arriba que almaceno las cards del objeto que se le pida que recorra.
function showCardsInHTML(cards) {
  document.getElementById("product-list").innerHTML = cards;
}

// Probando como cuando se haga click que nos traiga el id para ponerelo como parametro en la funcion de addtocart(). Aca cambie la forma de manejar el evento, en la entrega anterior estaba en el onClick en las cards que se generaban. Con esta funcion lo modifique para que se realiza de esta otra forma.
function trigger(e) {
  const variableId = parseInt(e);
  addToCart(variableId);
}

// Estas dos lineas son para setear el "cartStock0", y para crear la variable upToDateStock para poder manejar el stock en el storage.
// localStorage.setItem("cartStock0", JSON.stringify(products));
// const upToDateStock = JSON.parse(localStorage.getItem("cartStock0"));

// Funcion "addToCart()" para agregar productos al cart.
function addToCart(id) {
  // Verificacion de stock disponible:
  const quantityValue = parseInt(
    document.getElementById("cantidad-" + id).value
  );
  if (quantityValue > upToDateStock[id].stock && upToDateStock[id].stock > 0) {
    return swal(
      `Contamos unicamente con ${
        upToDateStock[id].stock
      } unidades de "${upToDateStock[id].title.toLocaleUpperCase()}".`,
      "Mil disculpas!"
    );
  } else if (upToDateStock[id].stock < 1) {
    generateCards(upToDateStock);
    return swal(
      `No contamos con mas "${upToDateStock[id].title.toLocaleUpperCase()}".`,
      "Mil disculpas!"
    );
  }
  // Modificacion de stock:
  console.log(upToDateStock);
  let modifiedStock = upToDateStock[id].stock - quantityValue;
  upToDateStock[id].stock = modifiedStock;
  localStorage.setItem("cartStock", JSON.stringify(upToDateStock));
  let selectedProduct = upToDateStock.find((element) => element.id === id);
  let index = cart.findIndex((prod) => prod.id === id);
  console.log(index);
  if (index !== -1) {
    cart[index].cantidad = cart[index].cantidad + quantityValue;
    swal(
      `Se ha agregado "${upToDateStock[
        id
      ].title.toLocaleUpperCase()}" al carrito`,
      "Muchas gracias!",
      "success"
    );
    setStorage(cart);
  } else {
    // Me gustaria entender la segunda parte de esto, cantidad:1, es una forma de modificar la propiedad a la vez que estamos concatenando cosas??
    cart.push({ ...selectedProduct, cantidad: 1 * quantityValue });
    swal(
      `Se ha agregado "${upToDateStock[
        id
      ].title.toLocaleUpperCase()}" al carrito`,
      "Muchas gracias!",
      "success"
    );
    setStorage(cart);
  }
  cartLength();
}

// Funcion renderCart, lo que hace es agregar en la seccion del HTML los productos que se van seleccionando.
const tbody = document.querySelector(".tbody");
function renderCart() {
  cart = getStorage();
  tbody.innerHTML = "";
  cart.map((item) => {
    const tr = document.createElement("tr");
    const content = `
    <th scope="row">1</th>
    <td class="table__products">
    <img src=${item.image}  alt="">
    <h6 class="title">${item.title}</h6>
    </td>
    <td class="table__price"><p>$ ${item.price}</p></td>
    <td class="table__cantidad">
    <input type="number" min="1" value=${item.cantidad} class="input__elemento">
    <button class="delete btn btn-danger">x</button>
    </td>
    
    `;
    tr.innerHTML = content;
    tbody.append(tr);
  });
}

//Con esta funcion buscamos los productos, a traves del filter.
function searchProduct() {
  const productSearchedName = document
    .getElementById("searched-product")
    .value.toUpperCase()
    .trim();
  const findedProducts = upToDateStock.filter((product) =>
    // Usar en vez de products lo del localstorage
    product.title.toUpperCase().match(productSearchedName)
  );
  if (findedProducts.length > 0) {
    generateCards(findedProducts);
  } else
    swal(
      `Por el momento no contamos con "${productSearchedName}"`,
      "Lo sentimos!"
    );
}

// Funcion para que ande el enter en el buscador.
function startEnter() {
  const input = document.getElementById("searched-product");
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("search-button").click();
    }
  });
}
startEnter();

// Funcion para que se muestren los productos en oferta unicamente al presionar el enlace "oferta"
let backUp;
function saleProducts() {
  backUp = JSON.parse(localStorage.getItem("cartStock0"));
  const saleProducts = backUp.filter((product) => product.status == "offer");
  const saleButton = document.getElementById("sale-product");
  saleButton.onclick = () => generateCards(saleProducts);
}

// Condicional para que se corra o no la funcion de saleProduct()
// let loadTest = JSON.parse(localStorage.getItem("cartStock"));
// console.log(loadTest);
// backUp === null ? console.log("No hay datos") : saleProducts();

// WindowOnload
window.onload = function () {
  const storage = JSON.parse(localStorage.getItem("cart"));
  if (storage) {
    cart = storage;
  }
  renderCart();
};

// - Poner todo adentro de una funcion con parametro e, que se dispare con un evento, y que tambien sea asyncrona, osea que se cargue despues de que se hayan traido los datos de la base de datos.
// -
// -
