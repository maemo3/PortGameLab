//kode untuk token header
const header = {
    "alg": "HS256",
    "ty[": "JWT"
  }
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64')
  console.log(`Ini adalh token untuk header: ${encodedHeader}`)
  
  //kode untuk token payload
  const payload = {
    "username": "Gamelab Indonesia"
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
  console.log(`Ini adalh token untuk header: ${encodedPayload}`)
  
  //kode untuk token signiture
  const crypto = require('crypto')
  const jwtSecret = 'secretkey'
  const signiture = crypto.createHmac('sha256', jwtSecret)
  .update(encodedHeader + '.' + encodedPayload)
  .digest('base64')
  
  console.log(`Ini adalah token untuk signiture : ${signiture}`)
  
  //kode untuk JWT
  const jwt = `${encodedHeader}.${encodedPayload}.${signiture}`
  console.log(`Ini adalah hasil dari token JWT : ${jwt}`)