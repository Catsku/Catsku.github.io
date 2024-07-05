const products=[
    {id:1, name:'VESTIDO BUSTIER MAEVE', price:179.90, image:'roupas/vestido.png', categoria:'Vestido'},
    {id:2, name:'VESTIDO BUSTIER RENDA', price:159.90, image:'roupas/vestido2.png', categoria:'Vestido'},
    {id:3, name:'VESTIDO MODELADOR', price:269.90, image:'roupas/vestido3.png', categoria:'Vestido'},
    {id:4, name:'VESTIDO SELENA', price:239.90, image:'roupas/vestido4.png', categoria:'Vestido'},
    {id:5, name:'CORSET SAMANTHA', price:169.90, image:'roupas/corset.png', categoria:'Corset'},
    {id:6, name:'VESTIDO CLOE', price:259.90, image:'roupas/vestido5.png', categoria:'Vestido'},
    {id:7, name:'VESTIDO SOPHIE', price:169.90, image:'roupas/vestido6.png', categoria:'Vestido'},
    {id:8, name:'VESTIDO ANNE', price:199.90, image:'roupas/vestido7.png', categoria:'Vestido'},
    {id:9, name:'VESTIDO SAMIRA', price:189.90, image:'roupas/vestido8.png', categoria:'Vestido'}
];

let cart=[];

function addToCart(product_id){
    const product = products.find(p => p.id === product_id);
    if(product){
        const cartItem = cart.find(item => item.id === product.id);
        if(cartItem){
            cartItem.quantidade +=1;
        }else{
            cart.push({...product, quantidade:1});
        }
        renderCart();
        updateCartCount();
    }
}

function removeFromCart(product_id){
    cart = cart.filter(item => item.id !== product_id);
    renderCart();
    updateCartCount();
}

function renderCart(){
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cart.forEach(item =>{
        const li = document.createElement('li');
        li.style.display= 'block';
        li.style.marginBottom= '10px';
        li.style.marginRight= '30px';
        
        const desc = document.createElement('span');
        desc.textContent = `${item.name} - R$ ${item.price.toFixed(2)}  x  ${item.quantidade}`;
        desc.style.marginRight= '10px';

        const removeButton = document.createElement('button');
        const lixeira = document.createElement('img');
        lixeira.src='icones/lixeira.png';
        lixeira.style='width: 20px; heigth: auto; '

        lixeira.onclick=  ()=> removeFromCart(item.id);
        
        const img=document.createElement('img');
        img.src = item.image;
        img.style = 'width= 15px; height=auto;';
        img.style.width = '40px'; // Ajuste o tamanho conforme necessário
        img.style.height = 'auto';
        img.style.marginRight = '10px'; 
        img.style.marginLeft= '0px'; 
        img.style.border = '1px solid black';

        li.appendChild(img);
        li.appendChild(desc);
        li.appendChild(lixeira);
        cartList.appendChild(li);
    });

    atualizarTotal();

    if(cart.length>0){
        //remover botão de compra anterior
        document.getElementById('comprar').innerHTML='';
        
        const link_comprar = document.createElement('a');
        link_comprar.textContent = "Comprar produtos";
        let mensagem = "Olá! Naveguei no site da loja e escolhi os seguintes produtos:%0A%0A"; 
        
        cart.forEach(item=>{
            mensagem+=`-> *${item.quantidade}* ${item.name}%0A`;    
        });
        mensagem.replace(' ','%20');
        
        link_comprar.href='https://wa.me/5512981424750?text='+mensagem;
        link_comprar.className='btn btn-success comprar_btn';
        link_comprar.target='_blank';
        link_comprar.style.display='block';
        document.getElementById('comprar').appendChild(link_comprar);
    }
}

function atualizarTotal(){
    const valorTotal = cart.reduce((acumulado, item) => acumulado + item.price * item.quantidade, 0);
    document.getElementById('total-value').innerHTML= valorTotal.toFixed(2);
}

function carrinho_preto(){
    document.getElementById('carrinho').src='icones/carrinho-preto.png';
}
function carrinho_branco(){
    document.getElementById('carrinho').src='icones/carrinho-branco.png';
}   

function updateCartCount() {
    const cartCount = cart.reduce((acc, item) => acc + item.quantidade, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

function createAndFilterProductCards(products,category) {
    const container = document.querySelector('.allCards'); // Certifique-se de que este contêiner existe no seu HTML
    container.innerHTML='';
    if(category=='all'){
        document.getElementById('categoria').innerHTML= 'Todos os Produtos';
    }else{
        document.getElementById('categoria').innerHTML= category;
    }


    products.forEach(product => {
        // Criação dos elementos
        if(category=='all'){
            const colDiv = document.createElement('div');
            colDiv.className = 'col-lg-3 col-md-4 col-sm-6 mb-4 justify-content-center justify-itens-center';
            
            const cardDiv = document.createElement('div');
            cardDiv.className = `card produto ${product.categoria}`;
            cardDiv.style = 'width: 18rem; box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.523);';
            
            const img = document.createElement('img');
            img.src = product.image;
            img.className = 'card-img-top';
            img.alt = product.name;
            
            const cardBodyDiv = document.createElement('div');
            cardBodyDiv.className = 'card-body';
            
            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.textContent = product.name;
            
            const cardPrice = document.createElement('p');
            cardPrice.textContent = `R$${product.price.toFixed(2)}`;
            
            const button = document.createElement('a');
            button.className = 'btn btn-primary';
            button.textContent = 'Adicionar ao carrinho';
            button.onclick = () => addToCart(product.id);
            
            // Construção da estrutura
            cardBodyDiv.appendChild(cardTitle);
            cardBodyDiv.appendChild(cardPrice);
            cardBodyDiv.appendChild(button);
            
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBodyDiv);
            
            colDiv.appendChild(cardDiv);
            
            container.appendChild(colDiv);

        }else if(product.categoria == category){
            const colDiv = document.createElement('div');
            colDiv.className = 'col-lg-3 col-md-4 col-sm-6 mb-4 justify-content-center justify-itens-center';
            
            const cardDiv = document.createElement('div');
            cardDiv.className = `card produto ${product.categoria}`;
            cardDiv.style = 'width: 18rem; box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.523);';
            
            const img = document.createElement('img');
            img.src = product.image;
            img.className = 'card-img-top';
            img.alt = product.name;
            
            const cardBodyDiv = document.createElement('div');
            cardBodyDiv.className = 'card-body';
            
            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.textContent = product.name;
            
            const cardPrice = document.createElement('p');
            cardPrice.textContent = `R$${product.price.toFixed(2)}`;
            
            const button = document.createElement('a');
            button.className = 'btn btn-primary';
            button.textContent = 'Adicionar ao carrinho';
            button.onclick = () => addToCart(product.id);
            
            // Construção da estrutura
            cardBodyDiv.appendChild(cardTitle);
            cardBodyDiv.appendChild(cardPrice);
            cardBodyDiv.appendChild(button);
            
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBodyDiv);
            
            colDiv.appendChild(cardDiv);
            
            container.appendChild(colDiv);
        }
    });
}

// Chame a função após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    createAndFilterProductCards(products,'all');
    renderCart();
    updateCartCount(); 
});