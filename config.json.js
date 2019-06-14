const DOMIN = '127.0.0.1' // ip地址或域名
const PREFIX = 'api'  // 前缀
const PORT = '7070'            // '7070', //api 端口；
const __PORT = PORT != '80'? `:${PORT}`:``

const SOCKET_PORT = '2120'            // '2120', //socket 端口；


const config = {
  /**
   * built-in config
   * @type {Vue config}
   **/
  SOCKET: `//${DOMIN}:${SOCKET_PORT}`,
  PREFIX,
  AIP: `//${DOMIN}${__PORT}`,
  AIP_PREFIX: `//${DOMIN}${__PORT}/${PREFIX}`
}

module.exports=config
  