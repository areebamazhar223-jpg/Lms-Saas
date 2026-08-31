import "./TrustedCompanies.css";


const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Netflix",
  "Adobe",
];


function TrustedCompanies() {

  return (

    <section className="trusted-companies">


      <div className="trusted-container">


        <p className="trusted-title">

          Trusted by learners working at

        </p>



        <div className="company-grid">


          {
            companies.map((company, index) => (

              <div
                className="company-card"
                key={index}
              >

                {company}

              </div>

            ))
          }


        </div>


      </div>


    </section>

  );

}


export default TrustedCompanies;