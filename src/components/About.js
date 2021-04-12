import React from "react";

function About() {
  return (
    <div className="container padding-top">
      <h1>O nama</h1>
      <div className="row bg-light shadowDiv">
        <div className="col-1"></div>
        <div className="col-4 mt-4">
          <p>
            Portal <b>Auto diler</b> predstavlja najposjećeniji i najpopularniji
            internet portal u Crnoj Gori za prodaju i kupovinu polovnih
            automobila, motocikala, kamiona, auto djelova i plovila.
          </p>
          <p>
            <b>Adresa:</b> 64 Bulevar Save Kovačevića, Podgorica
          </p>
          <p>
            <b>Telefon:</b> 069-012-210
          </p>
          <p>
            <b>Email:</b> autodiler@gmail.com
          </p>
        </div>
        <div className="col-2"></div>
        <div className="col-5 mt-1">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Podgorica,Ginta%C5%A1+(Auto%20diler)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default About;
