class Client {
    constructor(
        firstName,
        lastName,
        licence,
        email,
        password,
        gdpr,
        createdAt,
        isActive
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.licence= licence
        this.role = role
        this.email = email
        this.password = password
        this.gdpr = gdpr
        this.createdAt = createdAt
        this.isActive = isActive
    }
}
module.exports = {Client}
