# Path

- C:\Program Files\MongoDB\Server\8.0
- C:\Users\ricar\AppData\Local\Programs\mongosh

# comandos

- net start MongoDB
- net stop MongoDB

- mongod
- mongoimport

- mongosh

## entrando no sheel do comando acima, podemos usar os comandos abaixo

- show dbs //mostra as dbs
- use nomebanco //usa ou cria, tbm vai entrar nesse banco já

se não adicionar dados no banco, nao vai aparecer no show dbs

- db.colelction_inicial.insertOne({nome: "Ric", idade: 36}) //cria a collection e já adiciona um documento
- db.colelction_inicial.findOne({}) //traz o primeiro que encontra
- db.colelction_inicial.findOne({nome: "Ri2c"}) //traz o primeiro com o where
