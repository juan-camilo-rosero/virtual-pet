import stripeKeys from "./stripe-keys.js";

const d = document,
ls = localStorage,
$fragment = d.createDocumentFragment()

function formatPrice(num) {
    const decimals = (Math.abs(num) % 100).toString().padStart(2, '0');
    const wholePart = Math.floor(Math.abs(num) / 100);
    return `$${wholePart}.${decimals}`;
}

export async function payment() {

    try {

        let prices, products

        const $shop = d.querySelector(".shop-products"),
        
        fetchOptions = {
            headers: {
                Authorization: `Bearer ${stripeKeys.secret}`
            }
        },

        responses = await Promise.all([
            fetch("https://api.stripe.com/v1/products", fetchOptions),
            fetch("https://api.stripe.com/v1/prices", fetchOptions)
        ]),

        json = await Promise.all(responses.map((res) => (res.ok ? res.json() : Promise.reject(res))))

        products = json[0].data
        prices = json[1].data

        const $h3 = d.createElement("h3")

        $h3.textContent = "Compras reales :0"

        $fragment.appendChild($h3)

        prices.forEach(el => {

            
            let productData = products.filter(product => product.id === el.product)
            const $product = d.createElement("figure"),
            $imgDiv = d.createElement("div"),
            $img = d.createElement("img"),
            $desc = d.createElement("div"),
            $name = d.createElement("p"),
            $btn = d.createElement("button")
            
            if (productData[0].name === "$20000") return
            
           $product.classList.add("shop-product")
           $imgDiv.classList.add("shop-image")
           $desc.classList.add("shop-desc")
           $name.classList.add("shop-product-name")
           $btn.classList.add("buy-product")

           $img.setAttribute("src", "assets/images/money.png")
           $img.setAttribute("alt", "dinero")

           $name.textContent = `${productData[0].name} (${formatPrice(el.unit_amount)} USD)`
           $btn.textContent = "Comprar"

           $imgDiv.appendChild($img)
           $desc.appendChild($name)
           $desc.appendChild($btn)
           $product.appendChild($imgDiv)
           $product.appendChild($desc)

           $btn.addEventListener("click", async e => {

            const id = el.id,
            stripe = Stripe(stripeKeys.public),
            details = {
                lineItems:[{price: id, quantity: 1}],
                mode: "payment",
                successUrl: location.href,
                cancelUrl: location.href
            }

            // Create stripe session

            try {
                const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${stripeKeys.secret}`,
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `payment_method_types[]=card&line_items[0][price_data][currency]=usd&line_items[0][price_data][product_data][name]=${productData[0].name}&line_items[0][price_data][unit_amount]=${el.unit_amount}&line_items[0][quantity]=1&mode=payment&success_url=${location.href}&cancel_url=${location.href}`,
              })

              if (res.ok) {
                const session = await res.json();
          
                // Guarda el ID de la sesión en el localStorage
                ls.setItem('sessionId', session.id);
                const sessionProduct = productData[0].name.match(/\d+/g).join("")
                ls.setItem("sessionProduct", sessionProduct)
          
                // Redirecciona al usuario a la página de pago de Stripe
                window.location.href = session.url;
              } else {
                // Si la solicitud no fue exitosa, manejar el error
                const errorData = await res.json();
                throw new Error(errorData.error.message);
              }
            } catch (err) {
                console.log(err);
            }

            
           })

           $fragment.appendChild($product)
        });

        $shop.appendChild($fragment)
        
    } catch (err) {
        console.log(err);
    }

}

export async function validatePayment() {
    let sessionId = ls.getItem("sessionId")
    if(!sessionId) return

    try {
        const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
          headers: {Authorization: `Bearer ${stripeKeys.secret}`}
        }),
        data = await res.json()

        if(data.payment_status === "paid"){
            const money = parseInt(ls.getItem("money")),
            newMoney = parseInt(ls.getItem("sessionProduct"))

            ls.setItem("money", newMoney + money)
            d.querySelector(".money p").textContent = (newMoney + money)

            ls.removeItem("sessionId")
            ls.removeItem("sessionProduct")
        }
        else {
            ls.removeItem("sessionId")
            ls.removeItem("sessionProduct")
        }
    } catch (err) {
        alert("Hubo un error al procesar el pago :(")
        console.log(err);
    }

}