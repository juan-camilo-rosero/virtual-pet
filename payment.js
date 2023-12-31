import stripeKeys from "./stripe-keys.js";

const d = document,
$fragment = d.createDocumentFragment()

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

           $product.classList.add("shop-product")
           $imgDiv.classList.add("shop-image")
           $desc.classList.add("shop-desc")
           $name.classList.add("shop-product-name")
           $btn.classList.add("buy-product")

           $img.setAttribute("src", "assets/images/money.png")
           $img.setAttribute("alt", "dinero")

           $name.textContent = `${productData[0].name} (0.${el.unit_amount} USD)`
           $btn.textContent = "Comprar"

           $imgDiv.appendChild($img)
           $desc.appendChild($name)
           $desc.appendChild($btn)
           $product.appendChild($imgDiv)
           $product.appendChild($desc)

           $fragment.appendChild($product)
        });

        $shop.appendChild($fragment)
        
    } catch (err) {
        console.log(err);
    }

}