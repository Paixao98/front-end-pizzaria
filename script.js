let cart = [];
let modalQt = 1;
let modalKey = 0;

const c = (el)=>{
    return document.querySelector(el);
}
const cs = (el)=>{
    return document.querySelectorAll(el);
}
// a arrow function c é pra encurtar o codigo ela retorna o queryselector como parametro el que é o elemento

pizzaJson.map((item, index)=>{
    let = pizzaItem = c('.models .pizza-item').cloneNode(true);
    //seleciona o elemento html das pizzas. e clona todos os itens
    pizzaItem.setAttribute('data-key', index);
    //aqui set o atributo key pra identicar as pizzas
    
    
         // preecher as informações do pizzaitem
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        // aqui eu peguei o evento de click e com o closest ele procura o .pizzaitem mais proximo e get o atributo data-key na variavelkey
        modalQt = 1;
        modalKey = key;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML=pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML=pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
             size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        c('.pizzaInfo--qt').innerHTML = modalQt;

        //selecionando os itens na modal

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'Flex';
     // essa function adiciona o flex na class do window area pra abrir a modal que adiona as pizzas no css originalmente esta como none
       setTimeout(()=>{
        c('.pizzaWindowArea').style.opacity = 1;
       },200);
       // o set timeout adiciona em ms o tempo de troca do parametro no css, como a opacity foi setado 0 colocamos 1 com 200ms isso gera uma animaçao de abertura de janela

    })
    

    c('.pizza-area').append( pizzaItem );
    //linha que adiciona as pizzas do array usei o .append pois ele adiciona sem substituir oq ja existe o innerhtml substitui


});

// eventos da modal
function closeModal (){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display= 'none';
    },500);
}
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButon').forEach((item)=>{
    item.addEventListener('click', closeModal);

});

c('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalQt > 1){
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }else{

    }

});

c('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;   
});
cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click',()=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');


    });
   
});
c('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey].id+'@'+size;

    let key = cart.findIndex((item)=>item.identifier === identifier);

    if(key > -1){
        cart[key].qt += modalQt;
    }else{
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt
        });
    }

    updateCart();
    closeModal();
});

c('.menu-openner').addEventListener('click', ()=>{
    c('aside').style.left = '0';
});
c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw';
});

function updateCart(){
    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';
       
        let subttal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){

            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            subttal += pizzaItem.price * cart[i].qt;
            let cartItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart [i].size){
                case 0:
                pizzaSizeName ='P';
                break;
                case 1:
                pizzaSizeName ='M';
                break;
                case 2:
                pizzaSizeName ='G';
                break;
            }
            
            let pizzaName = `${pizzaItem.name}(${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                }else{
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                cart[i].qt++;
                updateCart();
            });
            c('.cart').append(cartItem);

        }
        desconto = subttal * 0.1;
        total = subttal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subttal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    }else{c('aside').classList.remove('show');
    c('aside').style.left = '100vw';

    }
}

