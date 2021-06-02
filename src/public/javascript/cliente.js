document.getElementById('BtnSalvar').addEventListener('click', async (e) => {
    e.preventDefault();
    const cliente = {
        id: document.getElementById('txtIDcliente').value || 0,
        nome: document.getElementById('nome').value,
        sobreNome: document.getElementById('sobrenome').value
    }
    if (cliente.id === "" || cliente.id === 0) {
        const response = await axios.post('/cliente/save', cliente)
        const json = response.data
        document.getElementById('txtIDcliente').value = json.id
        alert("Cliente adicionado!")
    } else {
        const response = await axios.put('/cliente/editar', cliente)
        const json = response.data
        console.log(json)
        alert("Cliente editado!")
    }
})

document.getElementById('btnPesquisar').addEventListener('click', async (e) => {
    e.preventDefault();
    const cliente = {
        id: document.getElementById('txtIDcliente').value || 0,
        nome: document.getElementById('nome').value,
        sobreNome: document.getElementById('sobrenome').value
    }
    if (!cliente)
        cliente = 'null'
    const response = await axios.get('/cliente/read', cliente)
    const json = response.data
    $("#TableCliente tbody").empty()
    for (const item of json) {
        $("#TableCliente tbody").append(`
                    <tr> 
                        <td>${item.idCliente}</td> 
                        <td>${item.nome || ''}</td>
                        <td>${item.sobreNome || ''}</td>
                        <td>
                          <button class="btn btn-dark" onclick="Editar(${item.idCliente})">Editar</button>
                        </td>
                        <td>
                            <button class="btn btn-danger"  onclick="Excluir(this,${item.idCliente})">Excluir</button>
                        </td>
                    </tr>
                `);
    }
    console.log(json)
})

async function Editar(id) {
    const response = await axios.get(`/cliente/read/${id}`)
    const json = response.data
    console.log("registro editar", json)
    document.getElementById('txtIDcliente').value = json[0].idCliente
    document.getElementById('nome').value = json[0].nome
    document.getElementById('sobrenome').value = json[0].sobreNome
}

async function Excluir(index, id) {
    const response = await axios.delete(`/cliente/excluir/${id}`)
    let i = index.parentNode.parentNode.rowIndex;
    document.getElementById("TableCliente").deleteRow(i);
    document.getElementById("FormCadliente").reset();
    return alert("Cliente foi excluido")
}