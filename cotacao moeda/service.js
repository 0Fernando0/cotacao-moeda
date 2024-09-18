const URL = "https://economia.awesomeapi.com.br/json/last/USD-BRL";

document.body.onload = carregarPagina();
bid = 0.00

function getValue(id){
    let moeda = Number(document.getElementById(id).value);
    return moeda;
}

function setValue(id,value){
    document.getElementById(id).value = value.toFixed(2);
}

function ajustarReal(){
    let moedaUsd = getValue("usd");
    let calculo = moedaUsd * bid;
    setValue("brl",calculo)
}

function ajustarDolar(){
    let moedaBrl = getValue("brl");
    let calculo = moedaBrl / bid;
    setValue("usd",calculo)
}

async function carregarService(){
    let moeda = await requestCoin();
    bid = moeda;
    let moeda_format = Number(moeda).toLocaleString("pt-BR",{style: "currency", currency: "BRL"})
    document.querySelector("#cotacao_agora").textContent = moeda_format;    
}


async function carregarPagina(){
    carregarService()
    setInterval(() => {
        carregarService()
    },30000)
    
}

async function requestCoin(){
    const resp = await fetch(URL);
    if(resp.status != 200){return;}
    const obj = await resp.json();
    const moeda = obj["USDBRL"].bid
    return moeda;
}