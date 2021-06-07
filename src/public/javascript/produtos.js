document.getElementById('BtnSalvar').addEventListener('click', async (e) => {
    e.preventDefault();
    const produtos = {
        id: document.getElementById('txtIDprodutos').value || 0,
        nome: document.getElementById('nome').value,
        valor: document.getElementById('valor').value
    }
    if (produtos.id === "" || produtos.id === 0) {
        const response = await axios.post('/produtos/save', produtos)
        const json = response.data
        document.getElementById('txtIDprodutos').value = json.id
        alert("produtos adicionado!")
    } else {
        const response = await axios.put('/produtos/editar', produtos)
        const json = response.data
        console.log(json)
        alert("produtos editado!")
    }
})

document.getElementById('btnPesquisar').addEventListener('click', async (e) => {
    e.preventDefault();
    const produtos = {
        id: document.getElementById('txtIDprodutos').value || 0,
        nome: document.getElementById('nome').value,
        valor: document.getElementById('valor').value
    }
    if (!produtos)
        produtos = 'null'
    const response = await axios.get('/produtos/read', produtos)
    const json = response.data
    $("#Tableprodutos tbody").empty()
    for (const item of json) {
        $("#Tableprodutos tbody").append(`
                    <tr> 
                        <td>${item.idProduto}</td> 
                        <td>${item.nome || ''}</td>
                        <td>${item.valor || ''}</td>
                        <td>
                          <button class="btn btn-dark" onclick="Editar(${item.idProduto})">Editar</button>
                        </td>
                        <td>
                            <button class="btn btn-danger"  onclick="Excluir(this,${item.idProduto})">Excluir</button>
                        </td>
                    </tr>
                `);
    }
    console.log(json)
})

async function Editar(id) {
    const response = await axios.get(`/produtos/read/${id}`)
    const json = response.data
    console.log("registro editar", json)
    document.getElementById('txtIDprodutos').value = json[0].idProduto
    document.getElementById('nome').value = json[0].nome
    document.getElementById('valor').value = json[0].valor
}

async function Excluir(index, id) {
    const response = await axios.delete(`/produtos/excluir/${id}`)
    let i = index.parentNode.parentNode.rowIndex;
    document.getElementById("Tableprodutos").deleteRow(i);
    document.getElementById("FormProd").reset();
    return alert("Produto foi excluido")
}