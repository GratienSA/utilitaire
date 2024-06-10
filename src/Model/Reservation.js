class Reservation {
    constructor(
        client,
        utilitaire,
        dateDebut,
        dateFin,
        options
    ) {
        this.client = client;
        this.utilitaire = utilitaire;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.options = options;
    }
}

module.exports = { Reservation };
