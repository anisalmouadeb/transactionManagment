/**
 * @swagger
 * definitions:
 *  Transaction:
 *   type: object
 *   properties:
 *    montant:
 *     type: number
 *     description: montant de transaction
 *     example: 500
 *    description:
 *     type: string
 *     description: description de transaction
 *     example: 'description'
 *    type:
 *     type: string
 *     description: type de transaction crediter ou debiter
 *     example: 'crediter'
 *    account:
 *     type: number
 *     description: id de compte relier a la transaction
 *     example: '61c24d564c77750e4c2212a6'
 *  Account:
 *   type: object
 *   properties:
 *    libelle:
 *     type: string
 *     description: libelle du compte
 *     example: 'AccountName'
 *    solde:
 *     type: number
 *     description: solde de compte
 *     example: '1000'
 *    isActive:
 *     type: boolean
 *     description: statue de compte activer/desactiver
 *     example: 'true'
 */



/**
  * @swagger
  * /transactions:
  *  post:
  *   summary: create transaction
  *   description: create transaction
  *   tags: ["Transactions operations"]
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/Transaction'
  *   responses:
  *    201:
  *     description: transaction created succesfully
  *    500:
  *     description: failure in creating transaction
  */

/**
 * @swagger
 * /transactions:
 *  get:
 *   summary: get all transactions
 *   tags: ["Transactions operations"]
 *   description: get all transactions
 *   responses:
 *    200:
 *     description: success
 */

/**
 * @swagger
 * /transactions/account/{account_id}:
 *  get:
 *   summary: get transactions by account
 *   tags: ["Transactions operations"]
 *   description: get transactions by account
 *   parameters:
 *    - in: path
 *      name: account_id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the account
 *      example: 61c24d564c77750e4c2212a6
 *   responses:
 *    200:
 *     description: success
 */

/**
 * @swagger
 * /transactions/{transaction_id}:
 *  get:
 *   summary: get transaction
 *   tags: ["Transactions operations"]
 *   description: get transaction
 *   parameters:
 *    - in: path
 *      name: transaction_id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the transaction
 *      example: 61c261e77c199b5e261157f6
 *   responses:
 *    200:
 *     description: success
 */


/**
 * @swagger
 * /transactions/lasts:
 *  get:
 *   summary: get last 10 transactions
 *   tags: ["Transactions operations"]
 *   description: get last 10 transactions
 *   responses:
 *    200:
 *     description: success
 */

/**
 * @swagger
 * /transactions/{transaction_id}:
 *  delete:
 *   summary: delete trasaction
 *   tags: ["Transactions operations"]
 *   description: delete trasaction
 *   parameters:
 *    - in: path
 *      name: transaction_id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the trasaction
 *      example: 61c261e77c199b5e261157f6
 *   responses:
 *    200:
 *     description: success
 */


/**
  * @swagger
  * /accounts:
  *  post:
  *   summary: create account
  *   tags: ["Accounts operations"]
  *   description: create account
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/Account'
  *   responses:
  *    201:
  *     description: account created succesfully
  *    500:
  *     description: failure in creating account
  */

/**
 * @swagger
 * /accounts:
 *  get:
 *   summary: get all accounts
 *   tags: ["Accounts operations"]
 *   description: get all accounts
 *   responses:
 *    200:
 *     description: success
 */

/**
 * @swagger
 * /accounts/active:
 *  get:
 *   summary: get all active accounts
 *   tags: ["Accounts operations"]
 *   description: get all active accounts
 *   responses:
 *    200:
 *     description: success
 */

/**
 * @swagger
 * /accounts/account/{account_id}:
 *  get:
 *   summary: get account
 *   tags: ["Accounts operations"]
 *   description: get account
 *   parameters:
 *    - in: path
 *      name: account_id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the account
 *      example: 61c24d564c77750e4c2212a6
 *   responses:
 *    200:
 *     description: success
 */

/**
 * @swagger
 * /accounts/{id}:
 *  patch:
 *   summary: update account
 *   tags: ["Accounts operations"]
 *   description: update account
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the account
 *      example: 61c24d564c77750e4c2212a6
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/Account'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Account'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Account'
 */


/**
 * @swagger
 * /accounts/{account_id}:
 *  delete:
 *   summary: delete account
 *   tags: ["Accounts operations"]
 *   description: delete account
 *   parameters:
 *    - in: path
 *      name: account_id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the account
 *      example: 61c261e77c199b5e261157f6
 *   responses:
 *    200:
 *     description: success
 */