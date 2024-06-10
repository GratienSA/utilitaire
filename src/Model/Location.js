class Location {
    constructor(
        client,
        utilitaire,
        dateDebut,
        dateFin,
        equipementsLoues,
        prixTotal
    ) {
        this.client = client;
        this.utilitaire = utilitaire;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.equipementsLoues = equipementsLoues;
        this.prixTotal = prixTotal;
    }
}

module.exports = { Location };
