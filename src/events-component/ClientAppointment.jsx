import PatientData from "./PatientData"
import { useState } from "react";
import { patient_data } from "../data/data";
import clsx from "clsx";

const ClientAppointment = () => {
    const [query, setQuery] = useState("");
    const [patientData, setPatientData] = useState(patient_data);
    const [patientDupData, setPatientDupData] = useState(patient_data);

    // const sortIt = (a, b) => {
    //     if (a > b) {
    //         return 1;
    //     } else if (a < b) {
    //         return -1;
    //     } else {
    //         return 0;
    //     }
    // };
   
    const PatientList = () => {
        setPatientData(
            patientDupData
            .filter((item) => {
                return (
                    query !== ""
                    ? item?.firstName
                        ?.toLowerCase()
                        .includes(query.toLowerCase()) || item?.lastName
                        ?.toLowerCase()
                        .includes(query.toLowerCase())
                    : true
                )
            })
            // .sort((a, b) =>
            //     sortIt(a.firstName, b.firstName)
            // )
        );
    }

    return (
        <>
            <div id="custom-html">
                <div className="field">
                    <label htmlFor="search-patient" className="custom-label">Patient Details</label> 
                    <div className="field-control">
                        <input 
                            id="search-patient" 
                            type="search" 
                            placeholder=""
                            value={query}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                setQuery(inputValue);
                                if (inputValue === '') {
                                    setPatientData(patient_data);
                                    setPatientDupData(patient_data);
                                }
                              }}
                        />
                        <button disabled={ query ? false : true} onClick={PatientList} type="button" className={clsx("secondary")}>Find</button>
                    </div>
                </div>
                <PatientData data={patientData} />
            </div>
        </>
    )
}

export default ClientAppointment;