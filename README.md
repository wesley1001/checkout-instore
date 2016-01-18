# Checkout inStore - Mobile app

## O que é o *VTEX inStore*

  O *VTEX inStore* é uma solução que revoluciona a experiência de compra em lojas físicas. Utilizando um equipamento pequeno e sem fio, os vendedores poderão atender seus clientes de forma personalizada e efetuar todo o processo da venda, desde a ajuda na escolha dos produtos até o pagamento e entrega dos produtos.

## Estrutura
O inStore é dividido em alguns projetos que cuidam cada um da sua responsabilidade na stack.

  - [(*mobile.checkout-instore*)](https://github.com/vtex/mobile.checkout-instore) - App mobile que exibe uma loja da VTEX numa webview e liga a aplicação da webview aos recursos nativos, como por exemplo, pagamentos *chip&pin*.

  - [(*checkout-instore*)](https://github.com/vtex/checkout-instore) - Single page application que contém a lógica de negócios, identificação do vendedor, carrinho e seletor de meio de pagamento.

  - [(*mobile.vtex-pinpad*)](https://github.com/vtex/mobile.vtex-pinpad) - Projeto que cuida do pedaço do código que realiza transações.

  - [(*api.checkout-instore*)](https://github.com/vtex/api.checkout-instore) - Middleware que realiza algumas operações do inStore no ambiente da VTEX.

## Documentação

- Para rodar o projeto na sua máquina local veja o [Guia de desenvolvimento](https://github.com/vtex/checkout-instore/tree/master/DEVELOPMENT.md)
- Para entender como usar o inStore você pode consultar o [Guia para lojistas](https://github.com/vtex/mobile.checkout-instore/tree/master/docs/user-guide.md)
- Detalhes da configuração no ambiente VTEX são abordados no [Guia de configuração](https://github.com/vtex/mobile.checkout-instore/tree/master/docs/configuration-guide.md)
- Para configurações avançadas recomendamos o [Guia de configurações avançadas](https://github.com/vtex/mobile.checkout-instore/tree/master/docs/advanced-configuration-guide.md)
