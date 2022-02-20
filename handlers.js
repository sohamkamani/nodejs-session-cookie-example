const uuid = require('uuid')

const users = {
    "user1": "password1",
    "user2": "password2"
}

class Session {
    constructor(username, expiresAt) {
        this.username = username
        this.expiresAt = expiresAt
    }

    isExpired() {
        this.expiresAt < (new Date())
    }
}

const sessions = {}

const signinHandler = (req, res) => {
    const { username, password } = req.body
    if (!username) {
        res.status(401).end()
        return
    }

    const expectedPassword = users[username]
    if (!expectedPassword || expectedPassword !== password) {
        res.status(401).end()
        return
    }

    const sessionToken = uuid.v4()

    // set the expiry time as 120s after the current time
    const now = new Date()
    const expiresAt = new Date(+now + 120 * 1000)

    const session = new Session(username, expiresAt)
    sessions[sessionToken] = session

    res.cookie("session_token", sessionToken, { expires: expiresAt })
    res.end()
}

const welcomeHandler = (req, res) => {
    if (!req.cookies) {
        res.status(401).end()
        return
    }

    const sessionToken = req.cookies['session_token']
    if (!sessionToken) {
        res.status(401).end()
        return
    }

    userSession = sessions[sessionToken]
    if (!userSession) {
        res.status(401).end()
        return
    }
    if (userSession.isExpired()) {
        delete sessions[sessionToken]
        res.status(401).end()
        return
    }

    res.send(`Welcome  ${userSession.username}!`).end()
}

const refreshHandler = (req, res) => {
    if (!req.cookies) {
        res.status(401).end()
        return
    }

    const sessionToken = req.cookies['session_token']
    if (!sessionToken) {
        res.status(401).end()
        return
    }

    userSession = sessions[sessionToken]
    if (!userSession) {
        res.status(401).end()
        return
    }
    if (userSession.isExpired()) {
        delete sessions[sessionToken]
        res.status(401).end()
        return
    }

    const newSessionToken = uuid.v4()

    const now = new Date()
    const expiresAt = new Date(+now + 120 * 1000)
    const session = new Session(userSession.username, expiresAt)
    sessions[newSessionToken] = session

    delete sessions[sessionToken]

    res.cookie("session_token", newSessionToken, { expires: expiresAt })
    res.end()
}

module.exports = {
    signinHandler,
    welcomeHandler,
    refreshHandler
}