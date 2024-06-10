class Facture {
    constructor(
        client,
        utilitaire,
        dateDebut,
        dateFin,
        montantTotal,
        statut
    ) {
        this.client = client;
        this.utilitaire = utilitaire;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.montantTotal = montantTotal;
        this.statut = statut;
    }
}

module.exports = { Facture };
