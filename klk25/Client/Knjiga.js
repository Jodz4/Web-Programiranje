export class Knjiga{
    constructor(id, naslov, autor, godina, izdavac, broj, izdata=false){
        this.id = id;
        this.naslov = naslov;
        this.autor = autor;
        this.godina = godina;
        this.izdavac = izdavac;
        this.broj = broj; 
        this.izdata = izdata;
    }
}