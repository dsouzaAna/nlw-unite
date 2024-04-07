let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Participante 3",
    email: "participante3@gmail.com",
    dataInscricao: new Date(2024, 0, 3, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Participante 4",
    email: "participante4@gmail.com",
    dataInscricao: new Date(2024, 3, 4, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Participante 5",
    email: "participante5@gmail.com",
    dataInscricao: new Date(2024, 4, 5, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Participante 6",
    email: "participante6@gmail.com",
    dataInscricao: new Date(2024, 5, 6, 19, 23),
    dataCheckIn: new Date(2024, 5, 9, 20, 20)
  },
  {
    nome: "Participante 7",
    email: "participante7@gmail.com",
    dataInscricao: new Date(2024, 6, 7, 19, 23),
    dataCheckIn: new Date(2024, 6, 10, 20, 20)
  },
  {
    nome: "Participante 8",
    email: "participante8@gmail.com",
    dataInscricao: new Date(2024, 7, 8, 19, 23),
    dataCheckIn: new Date(2024, 7, 11, 20, 20)
  },
  {
    nome: "Participante 9",
    email: "participante9@gmail.com",
    dataInscricao: new Date(2024, 8, 9, 19, 23),
    dataCheckIn: new Date(2024, 8, 12, 20, 20)
  },
  {
    nome: "Participante 10",
    email: "participante10@gmail.com",
    dataInscricao: new Date(2024, 9, 10, 19, 23),
    dataCheckIn: new Date(2024, 9, 13, 20, 20)
  }
];


const criarNovoPaticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs (Date.now())
  .to(participante.dataCheckIn)

//condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `

  }

  return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `
 }


const atualizarLista = (participantes) =>{
  let output = ""
  //estrutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarNovoPaticipante(participante)
  }

  //substituir informacao do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante ja existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert ('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer fazer check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  //encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  //atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  //atualizar a lista de participantes
  atualizarLista(participantes)
}