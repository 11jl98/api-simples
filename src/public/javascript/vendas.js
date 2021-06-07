document.getElementById('BtnSalvarVenda').addEventListener('click', function (e) {
    e.preventDefault();

    SalvarVenda()
})

async function SalvarVenda(){
    let dados ={
        idVenda: document.getElementById('txtCodVenda').value || 0,
        idCliente: document.getElementById('txtCliente').value == 0 ? null : document.getElementById('txtCliente').value,
        valor: document.getElementById('txtValorTotal').value || 0.00,
        dadosAdicional: document.getElementById('txtDadosAdicionais').value,
    }
    if (dados.idCliente === null)
        return toastr.info("Selecione o Cliente para continuar");

    if (dados.idVenda == "" || dados.idVenda == "0") {
      const response = await axios.post('/vendas/save', dados)
      const json = response.data
      console.log(json)
      document.getElementById('txtCodVenda').value = json.insertId
      alert("Pedido salvo com sucesso")
    }
    else{
      const response = await axios.post('/vendas/editar', dados)
      const json = response.data
      alert("Venda editada!")

    }
}

document.getElementById('BtnSalvarPeca').addEventListener('click',async(e)=>{
    e.preventDefault();

})