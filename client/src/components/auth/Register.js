import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Popup from "../common/Popup";
import styles from "./styles.module.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      gdpr: false,
      showPopup: false,
      errors: {}
    };

    this.togglePopup = this.togglePopup.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.errors, "next props erros");
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    this.setState({ [e.target.name]: e.target.checked });
    console.log("gdpr change", e.target.checked);
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      gdpr: this.state.gdpr
    };

    console.log("gdpr state", this.state.gdpr);

    this.props.registerUser(newUser, this.props.history);
  };

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className>
        <div className>
          <div className={styles.mainForm}>
            <h1 className={styles.title}>Registracija</h1>
            <p className={styles.subtitle}>Napravite Vaš račun na Repete.hr!</p>
            <form
              className={styles.formRegister}
              noValidate
              onSubmit={this.onSubmit}
            >
              <TextFieldGroup
                placeholder="Ime i prezime"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
                selected={true}
                className={styles.signUpFields}
              />
              <TextFieldGroup
                placeholder="E-mail adresa"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
                selected={true}
                className={styles.signUpFields}
              />
              <TextFieldGroup
                placeholder="Lozinka"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
                selected={true}
                className={styles.signUpFields}
              />
              <TextFieldGroup
                placeholder="Potvrda lozinke"
                name="password2"
                type="password"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
                selected={true}
                className={styles.signUpFields}
              />
              <input
                type="checkbox"
                name="gdpr"
                value={this.state.gdpr}
                onChange={this.onCheck}
                error={errors.gdpr}
              />
              <span>
                {" "}
                Pročitao/la sam i slažem se s{" "}
                <button onClick={this.togglePopup}>
                  uvjetima i pravilima oglašavanja
                </button>
                na Repeticije.hr.
                {errors.gdpr && (
                  <div className="invalid-feedback">{errors.gdpr}</div>
                )}
              </span>
              {this.state.showPopup ? (
                <Popup
                  closePopup={this.togglePopup}
                  text="Opći uvjeti oglašavanja na mrežnim stranicama Apartmanija.hr
                Korištenjem usluga internetske stranice Apartmanija.hr (Stranica), izjavljujete da ste upoznati i suglasni s Općim uvjetima oglašavanja na mrežnim stranicama Apartmanija.hr. 
                
                Opći uvjeti su skup pravila koji određuju odnose između Vlasnika Stranice (i osoba ovlaštenih za zastupanje, administratora stranice), Naručitelja oglasa (Oglašivač) te Korisnika usluga Oglašivača. Oglašivač može oglašavati turističke smještajne kapacitete i/ili proizvode i usluge pratećih industrija. 
                
                Točnost i istinitost podataka pojedinog oglasa
                Oglašivač je vlasni(k)ca oglašenog smještajnog objekta te, kao takva/takav posjeduje svu potrebnu dokumentaciju za iznajmljivanje turističkog smještaja ili je ovlašteni predstavnik iznajmljivača. Osim turističkog smještaja, Oglašivač je i onaj koji na Stranici promovira proizvode i usluge pratećih industrija. Oglašivač je odgovoran za promociju svojih usluga i proizvoda sukladno važećem Zakonu o zaštiti potrošača. 
                Oglašivač preuzima potpunu odgovornost za tekstualne i slikovne informacije koje postavlja na Stranicu te jamči njihovu točnost, potpunost i istinitost, kvalitetu, sigurnost i legalnost ponuđenih proizvoda i usluga. 
                Oglašivač prihvaća obvezu unošenja izmjena prezentiranih tekstualnih i slikovnih informacija putem administracijskog sučelja ako se detalji oglašene ponude promijene. 
                Oglašivač se obvezuje da prihvaća račune u elektroničkom obliku, sukladno čl.80. Zakona o porezu na dodanu vrijednost i čl.161. Pravilnika o porezu na dodanu vrijednost, izdane od Do-bra putnička agencija d.o.o.
                
                Zaštita privatnosti i korištenje osobnih podataka
                Vaša privatnost nam je važna i nikada ne zloupotrebljavamo podatke koje ste dobrovoljno ostavili na Stranici. Vlasnik Stranice se obvezuje poštivati anonimnost i privatnost na Stranici, u onoj mjeri u kojoj to dopušta priroda naših odnosa i poslovanja. 
                
                Oglašivači i Korisnici usluga Stranice pristaju da Vlasnik Stranice prikupi osobne podatke:
                1. Ime i Prezime
                2. Adresa
                3. Telefonski broj
                4. E-mail adresa
                5. OIB 
                
                Ostali podaci:
                1. Fotografije profila 
                2. Fotografije smještajnog objekta
                3. Dodatne informacije profila (spol, znanje jezika, druge vještine)
                4. Dodatne informacije o uslugama i proizvodima 
                
                Prema Zakonu o zabrani i sprječavanju obavljanja neregistrirane djelatnosti (NN 6/11), članak 7. stavak (2) Naručitelj oglasa je dužan prilikom naručivanja oglasa navesti podatke o svojem identitetu: tvrtku i sjedište tvrtke, OIB, ime i prezime odgovorne osobe ili ime i prezime naručitelja, OIB i njegovo prebivalište, odnosno boravište. 
                
                Sukladno stavku (3) istoga Zakona koji kaže: Zabranjeno je objavljivati oglase ako naručitelj oglasa ne dostavi podatke iz stavka 2. ovoga članka, Vlasnik Stranice je dužan prikupiti navedene podatke, a iste će pohranjivati i obrađivati u skladu s Uredbom o zaštiti osobnih podataka (GDPR EU 2016/679 EUROPSKOG PARLAMENTA I VIJEĆA od 27. travnja 2016.) kako slijedi: 
                
                Osobni podaci su neophodni kako bi Oglašivaču i Korisniku omogućili korištenje usluga Stranice te ćemo iste pohraniti i koristiti u promotivne svrhe usluga i proizvoda Oglašivača. Osim oglašavanja, osobne podatke ćemo koristiti u svrhu obrade knjigovodstvene dokumentacije prema propisima iz Zakona o računovodstvu, Zakona o PDV-u, Zakona o porezu na dobit te ostalih pravnih propisa koji uređuju poslovanje pravnih subjekata. Prilikom plaćanja usluga Vlasnika Stranice, kontrolor podataka o plaćanjima zahtijeva određene financijske podatke (kao što su bankovni račun ili podaci o kreditnoj kartici) kako bi obradili plaćanja i bili u skladu s važećim zakonom. Takvi podaci će se koristiti isključivo u navedenu svrhu. 
                Osobni podaci mogu biti dostavljeni nadležnim inspektorima središnjih tijela državne uprave (Članak 8. Zakon o zabrani i sprječavanju obavljanja neregistrirane djelatnosti (NN 6/11)). Osobne podatke Oglašivača ćemo tako dostaviti isključivo na službeni zahtjev nadležnih tijela za što nije potreban pristanak Oglašivača, sukladno stavku (4), članak 7. istoga Zakona: Organizacija za oglašavanja obvezna je tijelima iz članka 8. ovoga Zakona na njihov zahtjev dati na uvid podatke o naručitelju oglasa propisane stavkom 2. ovoga članka.
                E-mail adresa Oglašivača i Korisnika se može koristiti u svrhu informiranja o uslugama, promotivnim akcijama, izmjenama Opći uvjeti oglašavanja na mrežnim stranicama Apartmanija.hr i drugih pravila poslovanja Stranice. Oglašivač i Korisnik u svakom trenutku može zatražiti obustavu dotoka informacija o uslugama i promotivnim akcijama Stranice. 
                Osim osobnih podataka, Oglašivač može u svrhu što bolje prezentacije svojih usluga na Stranici pružiti dodatne informacije poput osobnih interesa, spola, vještina (jezika kojima se služi) ili dodataka svojoj ponudi. Oglašivač pristaje da su te informacije javne i vidljive svima, a Vlasnik Stranice ih nema pravo kopirati, obrađivati niti pohranjivati. 
                Osim navedenih podataka, Oglašivač i Korisnik mogu na neki drugi način pružiti informacije prilikom popunjavanja obrazaca, provođenja pretraživanja, ažuriranja, odgovaranja na ankete, sudjelovanja u promocijama ili korištenja posebnih ponuda Stranice. Tako prikupljene informacije su anonimne, a Vlasnik Stranice se obvezuje da će ih koristiti isključivo u tu svrhu i da ih neće proslijediti trećim stranama.
                Oglašivač može komentirati objave na forumima Stranice. Tako prikupljene informacije su javne i vidljive svima, a za vjerodostojnost i daljnju upotrebu pruženih informacija, Oglašivač odgovara sam.
                Komentari Korisnika (ocjene, recenzije) usluga Oglašivača će biti objavljeni na Stranici, a za što nije potrebna privola Oglašivača. Vlasnik Stranice ne kontrolira i ne odgovara za informacije pružene od strane Korisnika, a koje bi mogle uključivati informacije o Oglašivaču. Bilo kakav zahtjev prema informacijama o otkrivanju osobnih podataka, Oglašivač treba uputiti Korisniku. U slučaju pritužbe Oglašivača na neistinitost i zahtjeva za brisanje komentara Korisnika, Vlasnik Stranice može od Oglašivača i Korisnika zatražiti dodatne informacije, koje će upotrijebiti isključivo u svrhu utvrđivanja opravdanosti zahtjeva za brisanje komentara Korisnika.
                Osobne podatke koje nam proslijedite korištenjem Stranice, odnosno interaktivnim formama za prikupljanje podataka koje se nalaze na ovim Stranicama (privatni upit, logiranje i sl.), koristit ćemo isključivo u skladu s Uredbom o zaštiti osobnih podataka (GDPR EU 2016/679 EUROPSKOG PARLAMENTA I VIJEĆA od 27. travnja 2016.). 
                
                U svakom trenutku možete zatražiti uvid o načinu čuvanja, korištenja i distribucije Vaših osobnih podataka od Vlasnika Stranice, a rok za dostavu traženoga je 15 dana od dana podnošenja zahtjeva. Zahtjev možete uputiti u pisanom obliku ili putem elektroničke pošte. 
                
                U svakom trenutku možete zatražiti izmjenu ili potpuno brisanje svih svojih osobnih i drugih podataka. 
                
                Vaši prikupljeni osobni podaci neće biti korišteni ni u kakve svrhe osim onih za koji su prethodno navedeni. Njima se neće postupati na neprimjeren način, neće biti predmetom tajne obrade, neće biti prodani trećoj strani, a njihova eventualna distribucija prema osobama koje nisu ovlaštene raspolagati njima može biti omogućena isključivo uz pisanu suglasnost Oglašivača i Korisnika. 
                
                Vaši osobni podaci su zabilježeni u pisanoj formi i u elektroničkom obliku i čuvaju se u prostorijama Vlasnika Stranice. Prikupljenim podacima, pristup ima Vlasnik Stranice, administrator Stranice i računovođa Stranice. Svim ostalim osobama, uvid u Vaše osobne podatke nije omogućen. Rok za čuvanje poslovne dokumentacije s Vašim osobnim podacima je 11 godina. Po isteku toga roka, Vaši osobni podaci bit će uništeni. 
                
                Ostalu komunikaciju ili materijale koje nam pošaljete, kao što su pohvale, komentari, prijedlozi i sl. nećemo tretirati kao povjerlji"
                />
              ) : null}
              <br />
              <input
                type="submit"
                value="Pretraga"
                className={styles.submitButton}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
