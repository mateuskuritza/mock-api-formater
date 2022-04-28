### Instruções para instalação:

OBS: É necessário possuir Docker instalado.

1. Clonar esse repositório para sua máquina

2. Acessar a pasta do repositório e executar os seguintes comandos:

Para iniciar a API fake:
```
docker-compose up
```
Instalar as dependências do projeto:
```
npm i
```
Executar o sistema como desenvolvedor:
```
npm run dev
```
 
3. Nesse momento o servidor estará rodando na porta 4000 (se não for específicada outra como variável de ambiente PORT) e pode ser acessado na URL <em>localhost:4000</em>

### Uso:

Até o momento foi implementada apenas uma rota:

<details>
  <summary>GET /users</summary>
<br>

Essa rota retorna os usuários obtidos a partir da API fake (que passa a rodar após o comando <em>docker-compose up</em> em **localhost:8080/users**) formatados seguindo algumas regras de data, status e pagamento.

</details>