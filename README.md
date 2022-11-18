### Gerenciador de Taredas
Nesse gerenciador de tarefas será permitido a criação de um usuário com name e usermane,
bem como fazer o CRUD de todos(task):
- Criar um novo TODOS;
- Listar todos os TODOS;
- Alterar o **title** e **deadline** de um TODO existente;
- Marcar um TODO como feito;
- Excluir um TODO;

#### Rotas da aplicação
**POST** /users
A rota deve receber **name** e **username** dentro do corpo da requisição

```js
{ 
	id: 'uuid', // precisa ser um uuid
	name: 'Danilo Vieira', 
	username: 'danilo', 
	todos: []
}
```

**GET** /users
A rota retorna todos os usuários criados

**GET** /todos
A rota deve receber, pelo header da requisição, uma propriedade **username** contendo o username do usuário e retornar uma lista com todas as tarefas desse usuário.

**POST** /todos
A rota deve receber **title** e **deadline** dentro do corpo da requisição e, uma propriedade **username** contendo o username do usuário dentro do header da requisição. Ao criar um novo todo, ele deve ser armazenada dentro da lista **todos** do usuário que está criando essa tarefa.

```js
  { 
	id: 'uuid', // precisa ser um uuid
	title: 'Nome da tarefa',
	done: false, 
	deadline: '2021-02-27T00:00:00.000Z', 
	created_at: '2021-02-22T00:00:00.000Z'
}
```
OBS: A deadline deve ser passada da seguinte forma:
  "ANO-MÊS-DIA" (por exemplo "2022-11-17")

**PUT** /todos/:id
A rota deve receber, pelo header da requisição, uma propriedade **username** contendo o username do usuário e receber as propriedades **title** e **deadline** dentro do corpo. É preciso alterar apenas o **title** e o **deadline** da tarefa que possua o **id** igual ao **id** presente nos parâmetros da rota.

**PATCH** /todos/:id/done
A rota deve receber, pelo header da requisição, uma propriedade **username** contendo o username do usuário e alterar a propriedade done para true no todo que possuir um **id** igual ao **id** presente nos parâmetros da rota.

**DELETE** /todos/:id
A rota deve receber, pelo header da requisição, uma propriedade **username** contendo o username do usuário e excluir o todo que possuir um **id** igual ao **id** presente nos parâmetros da rota.

#### Iniciar o servidor
Para iniciar o servidor basta rodar no terminal o comando **yarn dev**
