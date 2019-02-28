# Desafio Cubos
Processo Seletivo: Backend - Leonardo Farias

Projeto desenvolvido com Node.js e Typescript.

## Instalação

Para instalar as dependências do projeto utilize(ou se preferir utilize yarn):

* ``` npm install```

## Testes

Para executar os testes basta executar o código abaixo na raiz do projeto.

* ``` npm run test```

## Database

Os dados do projeto estão armazedados no arquivo: **database.json**. Você pode encontrá-lo no diretório src/database.json

## Endpoints

#### Cadastro de regra de atendimento

```localhost:3000/regras``` **POST**

Existe 3 formas de cadastrar no endpoint de regra de atendimento:

- Um dia especifico, por exemplo: irá atender dia 25/06/2018 nos intervalos de 9:30 até 10:20 e de 10:30 até as 11:00 

Exemplo:

```
{
  "daily": false,
  "weekly": false,
  "day": "25/06/2018",
  "days_of_the_week": [],
  "intervals": [
    { "start": "9:30", "end": "10:20" },
    { "start": "10:30", "end": "11:00" },
  ]
}
```

- Diáriamente, por exemplo: irá atender todos os dias das 9:30 até as 10:10

```
{
  "daily": true,
  "weekly": false,
  "day": false,
  "days_of_the_week": [],
  "intervals": [
    { "start": "9:30", "end": "10:10" },
  ]
}
```

- Semanalmente, por exemplo: irá atender todas segundas e quartas das 14:00 até as 14:30

```
{
  "daily": false,
  "weekly": true,
  "day": false,
  "days_of_the_week": [
    {"day": false},
    {"day": "monday"},
    {"day": false},
    {"day": "wednesday"},
    {"day": false},
    {"day": false},
    {"day": false}
	],
  "intervals": [
    { "start": "14:00", "end": "14:30" },
  ]
}
```

**Observação**:

- Todas os dados são validados, para não cadastrar registro já existentes.
- Existem validações de datas: Não cadastrar o start maior que o end, não deixar o end do primeiro intervalo ser maior que o start do próximo intervalo.
- Não se pode cadastrar uma regra semanal junto com diariamente e nem com um dia específico.
- Não se pode cadastrar uma regra diariamente junto com uma semanal ou dia específico.
- Não se pode cadastrar uma regra diária junto com uma regra semanal ou regra diária.
- Precisa informar pelo menos uma regra pra realizar o cadastro com sucesso.

#### Apagar regra

```localhost:3000/regras``` **DELETE**

Para apagar as regras você deve utilizar o mesmo conteúdo na hora do cadastro, mas lembre-se mudar o método da requisição para **DELETE**.

Exemplo:

```
{
  "daily": true,
  "weekly": false,
  "day": false,
  "days_of_the_week": [],
  "intervals": [
    { "start": "9:30", "end": "10:10" },
  ]
}
```

#### Listar regras

```localhost:3000/regras``` **GET**

Para buscar as regras cadastrar no primeiro endpoint, basta chamar a rota acima.

Exemplo de resposta dessa rota:

```
{
    "regras": [
        {
            "daily": true,
            "weekly": false,
            "day": false,
            "days_of_the_week": [
                {
                    "day": false
                },
                {
                    "day": false
                },
                {
                    "day": "tuesday"
                },
                {
                    "day": "wednesday"
                },
                {
                    "day": "thursday"
                },
                {
                    "day": false
                },
                {
                    "day": "saturday"
                }
            ],
            "intervals": [
                {
                    "start": "10:00",
                    "end": "17:00"
                }
            ]
        }
    ]
}
```

#### Horários disponíveis

```localhost:3000/regras?start=25-01-2018&end=27-01-2018``` **GET**

- Este endpoint deve retornar os horários disponíveis, baseado nas regras criadas anteriormente, considerando um intervalo de datas informadas na requisição.

**Observação**:

- Se uma regra for do tipo diariamente, ela sempre cai nesse filtro.
- Se for de uma data específica, se estiver no range das datas informadas deve retornar.
- Se for do tipo semanal, verifico se o dia da regra está de acordo com a data informada para poder mostrar na resposta da requisição. Por exemplo:

Se a regra é de terça-feira e eu busco pela data 22/01/2019(que é uma terça-feira) o registro deverá aparecer.





