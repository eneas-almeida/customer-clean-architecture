# Kafka

Documentação: https://kafka.js.org/docs/getting-started

## Perguntas

-   Onde salvar os eventos?
-   Como recuperar de forma rápida e simples de forma que o feedback entre um processo e outro ou memos entre um sistema e outro possa acontecer de forma fluída e em tempo real?
-   Como escalar?
-   Como ter resiliência e alta disponibilidade?

## Vantagens

-   Desenvolvido em Java;
-   Opensource;
-   Alta capacidade de processar requisições;
-   Latência extramamente baixa (2ms);
-   Escalável;
-   Armazenamento, as mensagens ficam guardadas, banco de dados otimizado;
-   Alta disponibilidade;
-   Se conecta com quase tudo, existe drivers para várias tecnologias, existem muitas bibliotecas prontas.

## Quem usa?

-   Linkedin;
-   Netflix;
-   Uber;
-   Twitter;
-   Dropbox;
-   Spotify;
-   PayPal;
-   Bancos.

## Como funciona?

-   O produto, envia uma mensagem para o Kafka, fica armazenado em um broker, que possui um banco de dados próprio, o consumidor ler as mensagens dos brokers.

<img src="./media/kafka/kafka-1.png" />

## Tópicos

São canais de comunicações responsáveis por receber e disponibilizar os dados enviados para o Kafka.

<img src="./media/kafka/kafka-2.png" />

Os tópicos podem ser lidos por multiplos sistemas, diferentemente do RabbitMQ que ao ler um tópico, a mensagem desaparece, não podendo ser lido por multiplos sistemas.

<img src="./media/kafka/kafka-3.png" />

Quando é enviado uma mensagem, através de um tópico, vai sendo armazenada de forma enfileirada e quando é armazenada, a mensagem ganha um tipo de id, chamado de offset, com isso a mensagem pode ser reprocesada, exemplo, voltar no offset 2 e reprocessar.

### Anatomia de uma mensagem

A mensagem **(offset)** é composta por 4 partes:

    - Cabeçalho: pode ser metadados;
    - Key: contexto da mensagem, garante a ordem de entrega da mensagem;
    - Value: payload, o próprio JSON;
    - Timestamp.

<img src="./media/kafka/kafka-4.png" />

## Partições

Como demonstrado abaixo, cada tópico pode ter uma ou mais partições, garantindo a distribuição e resiliência dos dados.

<img src="./media/kafka/kafka-5.png" />

Quando uma mensagem é enviada, através de um tópico, é enviada para uma das 3 partições (round-robin), como ilustrada na imagem acima, isso garante diversas estratégias para o cosumidor, diminuindo o risco da mensagem ser entregue e aumentando a quantidade de consumidores.

**Exemplo:** uma hipótese de envio de 1500 mensangens, é possível enviar 500 mensagens para a partição 1, 500 para partição 2 e 500 para partição 3, fica mais rápido a leitura em determinadas partições.

### Partições distribuídas

<img src="./media/kafka/kafka-7.png" />

As partições distribuídas garantem resiliência, onde, caso um broker caia, as outras partições terão os backups das mensagens em outros brokers.

-   **Comum:** 2 replicators.
-   **Casos críticos:** 3 replicators.

### Partição líder

Como ilustrado na imagem a baixo, cada broker tem uma partição líder, dessa forma, necessariamente, o cosumidor ler a partição líder.

<img src="./media/kafka/kafka-8-1.png" />

Quando um broker cai, o gerenciador do Kafka elege uma partição líder, como demonstado na imagem abaixo.

<img src="./media/kafka/kafka-8-2.png" />

## Keys

<img src="./media/kafka/kafka-6.png" />

As **keys garantem as ordens de entregas**, alocando as mensagens em uma mesma partição, entretanto se não tiver a necessidade de uma leitura ordenada, apenas basta não informar uma key, que o Kafka irá definir através do seu algoritmo, em qual partição irá ficar aquela mensagem.

## Garantia de entregas

### Producer

<img src="./media/kafka/kafka-9-1.png" />

Quando é enviado uma mensagem, sempre é recebido pelo **Leaader**, dentro da mensagem é pasado um parametro **Ack**.

-   **Ack=0**: O producer não recebe uma confirmação do Kafka que a mensagem foi gravada, entretanto, como o Kafka não fica a todo tempo notifiando o producer, se torna mais rápido o processamento de mensagens, é importante estar ciente que pode perder a mensagem e não vai fazer falta.

<img src="./media/kafka/kafka-9-2.png" />

-   **Ack=1:**: O producer recebe uma confirmação do Kafka que a mensagem foi gravada, entretanto se o broker A (Leader) cai e não teve tempo hábil de replicar para os **followers**, o Producer acredita que a mensagem foi guarda, entretanto, a mensagem é perdida.

<img src="./media/kafka/kafka-9-3.png" />

-   **Ack=-1:**: O Producer recebe uma confirmação do Kafka que a mensagem foi gravada pelo Leader, que por sua vez, o Leader replica as mensagens para os Followers, que por sua vez, os Followers notifica ao Leader que as mensagens foram salvas, que por sua vez, o Leader notifica o Producer que a mensagem foi gravada, essa é a opção mais segura, entretanto é a mais custosa.

## Informações

O Kafka não trabalha igual ao RabbitMQ, ele salva as mensagens em disco, o RabbitMQ em memória.

## Recomendações mínimas

-   Um cluster com 3 brokers.

## Zookeeper
