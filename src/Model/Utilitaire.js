class Utilitaire {
    constructor(
        modele,
        annee,
        carburant,
        transmission,
        volume,
        places,
        prix_location
    ) {
        this.modele = modele;
        this.annee = annee;
        this.carburant = carburant;
        this.transmission = transmission;
        this.volume = volume;
        this.places = places;
        this.prix_location = prix_location;
    }
}

module.exports = { Utilitaire };
