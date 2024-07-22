import React, { useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import ResultDisplay from "./ResultDisplay";
// import CreditCard from "./CreditCard";
// import ResultDisplay from "./ResultDisplay";
// import LoanCard from "./LoanCard";

export default function LoanForm() {
  const [creditInput, setCreditInput] = useState({
    dependants: "",
    education: "",
    selfEmployed: "",
    income: "",
    loanAmount: "",
    loanTerm: "",
    cibilScore: "",
  });
  const [scoreOutput, setScoreOutput] = useState("");
  function handleChange(event) {
    const { name, value } = event.target;
    setCreditInput((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/loanEligibility",
        creditInput
      );
      setScoreOutput(response.data.prediction);
      console.log(response.data);
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <>
      {/* Form Section */}
      <div className="d-flex justify-content-center">
        <div className="col-md-11 border p-2 bg-body-secondary rounded-4">
          <form
            action=""
            method=""
            className="need-validation mt-5"
            noValidate
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="col-md-10 bg-body-secondary container">
              <div className="d-flex justify-content-center">
                <div className="col-md-12 ">
                  <div className="col-md-12 p-3 d-flex justify-content-evenly">
                    {/* No.Of Dependants */}
                    <div className="col-md-4 border p-1">
                      <FormInput
                        label="Number of Dependants"
                        type="number"
                        name="dependants"
                        placeholder=""
                        onChange={handleChange}
                      />
                    </div>
                    {/* Education */}
                    <div className="col-md-4 border p-1">
                      <label
                        htmlFor="education"
                        className="col-md-12 fw-bold fs-5 form-label text-center"
                      >
                        Education
                      </label>
                      <div className="d-flex justify-content-center">
                        <div className="col-md-5">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="education"
                            id="Graduate"
                            value={1}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="Graduate" className="form-label">
                            Graduate
                          </label>
                        </div>
                        <div className="col-md-5">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="education"
                            id="NotGraduate"
                            value={0}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="NonGraduate" className="form-label">
                            Non Graduate
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 p-3 d-flex justify-content-evenly">
                    {/* Income anum */}
                    <div className="col-md-4 border p-1">
                      <FormInput
                        label="Income (per anum)"
                        type="number"
                        name="income"
                        placeholder=""
                        onChange={handleChange}
                      />
                    </div>
                    {/* Self Employed */}
                    <div className="col-md-4 border p-1">
                      <label
                        htmlFor="selfEmployed"
                        className="col-md-12 fw-bold fs-5 form-label text-center"
                      >
                        Self Employed
                      </label>
                      <div className="d-flex justify-content-center mt-1">
                        <div className="col-md-5 mx-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="selfEmployed"
                            id="Yes"
                            value={1}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="Graduate" className="form-label">
                            YES
                          </label>
                        </div>
                        <div className="col-md-5">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="selfEmployed"
                            id="No"
                            value={0}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="NonGraduate" className="form-label">
                            NO
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 p-3 d-flex justify-content-evenly">
                    {/* Loan Ammount */}
                    <div className="col-md-4 border p-1">
                      <FormInput
                        label="Loan Amount"
                        type="number"
                        name="loanAmount"
                        placeholder=""
                        onChange={handleChange}
                      />
                    </div>
                    {/* Loan Term */}
                    <div className="col-md-4 border p-1">
                      <FormInput
                        label="Loan Term (in years)"
                        type="number"
                        name="loanTerm"
                        placeholder=""
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 p-3 d-flex justify-content-evenly">
                    {/* CIBIL Score */}
                    <div className="col-md-4 border p-1">
                      <FormInput
                        label="CIBIL Score"
                        type="number"
                        name="cibilScore"
                        placeholder=""
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn w-25 btn-success rounded-5 fs-5 mt-3"
                >
                  submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {scoreOutput ? (
        scoreOutput ? (
          <ResultDisplay
            statement={"You Are Eligible For Loan"}
            information={"ELIGIBLE"}
          />
        ) : (
          <ResultDisplay
            statement={"You Are Not Eligible For Loan"}
            information={"NOT ELIGIBLE"}
          />
        )
      ) : (
        <ResultDisplay
          statement={"Know Your Credit Score by Entering Details In Above Form"}
          information={""}
        />
      )}
    </>
  );
}
