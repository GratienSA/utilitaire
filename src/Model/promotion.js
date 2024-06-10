class Promotion {
    constructor(
        code,
        pourcentageReduction,
        dateExpiration
    ) {
        this.code = code;
        this.pourcentageReduction = pourcentageReduction;
        this.dateExpiration = dateExpiration;
    }
}

module.exports = { Promotion };
