const botaoAlterarTema = document.getElementById("botao-alterar-tema");
const body = document.querySelector("body");
const imagemBotaoTrocaDeTema = document.querySelector(".imagem-botao");

botaoAlterarTema.addEventListener("click", () => {

    body.classList.toggle("modo-escuro");

    const modoEscuroEstaAtivo = body.classList.contains("modo-escuro");
    if(modoEscuroEstaAtivo){
        //body.classList.remove("modo-escuro"); - substituido pelo toglle
        imagemBotaoTrocaDeTema.setAttribute("src", "./src/imagens/sun.png");
    }else{
        //body.classList.add("modo-escuro"); - substituido pelo toglle
        imagemBotaoTrocaDeTema.setAttribute("src","./src/imagens/moon.png");
    }
});
