# Nice Gadgets

# Design:

      - [Figma](<https://www.figma.com/file/novGM5DyRXWa4ssuyR4pMo/Phone-catalog-(V2)?node-id=0%3A1&t=jvOqLnx99GvkDR0F-0>)

## (\*) TODO Tasks

### Search

Show `input:search` in the header when a page contains a `ProductList` to search in.

1. Save the `Search` value in the URL as a `?query=value` to apply on page load
1. Show `There are no phones/tablets/accessories/products matching the query` instead of `ProductList` when needed.
1. Add `debounce` to the search field.

### Other

1. Implement your own API with Node.js and Express.
1. Use PostgreSQL DB.
1. Save Orders to the DB after checkout.
1. Show the list of orders with all the saved orders at `/orders`.
1. Create Order details page at `/orders/:orderId` with ability to edit or cancel an order.
1. Implement the login/register functionality and show the author's email of each order in the list.
1. Restrict order editing only to its author.
