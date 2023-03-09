// display value for visible cart 
var carritoVisible = false;

const items = [
    {
        name: 'BOLT UNGU 1 KG',
        image: 'img/bolt-1kg.jpeg',
        price: 'Rp.100'
    }, 
    {
        name: 'BOLT KITTEN 1 KG',
        image: 'img/bolt-kitten-1kg.jpg',
        price: 'Rp.200'
    }, 
    {
        name: 'BOLT KUNING 1 KG',
        image: 'img/bolt-kuning.png',
        price: 'Rp.100'
    }, 
    {
        name: 'BOLT PLUS 1 KG',
        image: 'img/bolt-plus-1kg.jpeg',
        price: 'Rp.100'
    }, 
    {
        name: 'CAT CHOIZE TUNA',
        image: 'img/catczgreen.jpg',
        price: 'Rp.104'
    }, 
    {
        name: 'CAT CHOIZE SALMON',
        image: 'img/catczo.jpg',
        price: 'Rp.103'
    }, 
    {
        name: 'CAT CHOIZE PLUS',
        image: 'img/catczplus.jpg',
        price: 'Rp.102'
    }, 
    {
        name: 'CAT CHOIZE KITTEN',
        image: 'img/catczkitten.jpg',
        price: 'Rp.102'
    },
    {
        name: 'CAT CHOIZE KITTEN PLUS',
        image: 'img/catczkittenplus.jpg',
        price: 'Rp.101'
    },
]

// waiting all element page to load and execute content
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

// display item dasboard
function ready(){
    var htmlProduct = '';
    items.forEach(item => {
        htmlProduct += `
        <div class="item">
            <span class="titulo-item">${item.name}</span>
            <img src="${item.image}" alt="" class="img-item">
            <span class="precio-item">${item.price}</span>
            <button class="boton-item">Pilih Barang</button>
        </div>
        `;
    })
    const container = document.getElementsByClassName('contenedor-items');
    if (container && container.length > 0) {
        container[0].innerHTML = htmlProduct;
    }

    // delete item in cart button
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    // add item quantity button function
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',incrementQuantity);
    }

     // substract item quantity button function 
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',substractQuantity);
    }

    // add item to cart button
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', addToCartButtonClicked);
    }

    // buy button function
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}


// remove all item in cart when buy button is clicked
function pagarClicked(){
    alert("thank you for the purchase");
    // remove all item
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    updateTotalCart();
    hideCart();
}
// function that control button to add cart
function addToCartButtonClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var title = item.getElementsByClassName('titulo-item')[0].innerText;
    var price = item.getElementsByClassName('precio-item')[0].innerText;
    var image = item.getElementsByClassName('img-item')[0].src;
    console.log(image);

    addItemToCart(title, price, image);

    makeCartVisible();
}

// visible Cart
function makeCartVisible(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

// add item to cart
function addItemToCart(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // check duplicate item add to cart
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("Barang sudah ada di dalam keranjang");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    // delete button item in cart
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    // button substract quantity item in cart
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',substractQuantity);

    // button add quantity item in cart
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',incrementQuantity);

    // update total price in cart 
    updateTotalCart();
}
// function increment quantity value from button + item in cart
function incrementQuantity(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var quantityActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    quantityActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = quantityActual;
    updateTotalCart();
}
// decrement quantity value from button - item in cart 
function substractQuantity(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var quantityActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    quantityActual--;
    if(quantityActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = quantityActual;
        updateTotalCart();
    }
}

// remove selected item in cart
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    // update cart price 
    updateTotalCart();

    //check item in cart 
    //if is empty, delete cart
    hideCart();
}
// validation for cart if any set visible else hide
function hideCart(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
// update total cart
function updateTotalCart(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('Rp','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        console.log("jumlah item", cantidad)
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100; 

    document.getElementsByClassName('carrito-precio-total')[0].innerText = 'Rp'+total.toLocaleString("es") + ",00";

    // var bayar = carritoContenedor.getElementsByClassName('carrito-total');
    var pembayaran = carritoContenedor.getElementsByClassName('input-bayar')[0];
    console.log(pembayaran.value)
    var kembalian = pembayaran.value - total;
    console.log(kembalian)
    if(total < pembayaran.value){
        document.getElementsByClassName('kembalian')[0].innerText = 'Rp'+kembalian.toLocaleString("es") + ",00";
    } else{
        document.getElementsByClassName('kembalian')[0].innerText = 'Rp'+ "0,00";
    }
}








