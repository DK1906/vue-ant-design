const bodyParser = require('body-parser')

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlNhbHR5IEZpc2gifQ.w32ltJH4xTm51E9-NezlNpFQh8C_Od31m7he6K_5yig'

module.exports = app => {
  app.use(bodyParser.json())
  // 登录模拟
  app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body
    if (username === 'admin' && password === 'admin') {
      res.json({
        code: 200,
        data: {
          token: TOKEN
        }
      })
    } else {
      res.json({
        code: 201,
        msg: '账号或密码错误'
      })
    }
  })

  // 用户信息获取模拟
  app.get('/api/auth/info', (req, res) => {
    const { authorization = null } = req.headers
    if (TOKEN === authorization) {
      res.json({
        code: 200,
        data: {
          id: 1,
          name: 'admin',
          permission: [
            'node-authorization-information',
            'department-management',
            'user-management',
          ]
        }
      })
    } else {
      res.status(401).json({
        code: 401,
        msg: '登录失效'
      })
    }
  })
}
