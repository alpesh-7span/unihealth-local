import React, { useContext, useState } from "react";
import { patient_details } from "../data/data";
import { CalendarContext } from "../components/Calendar";

const AppointmentSchedule = (props) => {
    const patient_id = props.dataId;

    const [patinentDetails, setPatientDetails] = useState(patient_details);
    
    const CancelAppointment = () => {
        const element = document.getElementById('patient-list-wrapper');
        const computedStyle = window.getComputedStyle(element);
        const isCurrentlyVisible = computedStyle.display !== 'block';

        if (isCurrentlyVisible) {
            element.style.display = 'block';
        }

        if(document.getElementById('patient-details') !== null) {
            document.getElementById('patient-details').remove();
        }
    }

    const event_calendar = useContext(CalendarContext);
    const ReviewAppointment = () => {
        const filteredData = {
            id: patient_details.quickview[0].id,
            type: patient_details.appointment[0].department.selectedValue,
            start_date: new Date(patient_details.appointment[0].date + ' ' + patient_details.appointment[0].time),
            end_date: new Date(patient_details.appointment[0].date + ' ' + patient_details.appointment[0].time),
            text: patient_details.appointment[0].providerGroup
        };
        filteredData.end_date.setHours(filteredData.end_date.getHours() + 1);
        
        event_calendar.parse(
            [ 
                filteredData
            ] 
        );
        event_calendar.closeEditor();
    }

    const handleDateChange = (index, value) => {
        setPatientDetails((prevState) => {
          const updatedDetails = [...prevState.appointment];
          updatedDetails[index].date = value;
          return { ...prevState, appointment: updatedDetails };
        });
    };
    
    const handleTimeChange = (index, value) => {
        setPatientDetails((prevState) => {
          const updatedDetails = [...prevState.appointment];
          updatedDetails[index].time = value;
          return { ...prevState, appointment: updatedDetails };
        });
    };
    
    const handleDepartmentChange = (index, value) => {
        setPatientDetails((prevState) => {
            const updatedDetails = [...prevState.appointment];
            updatedDetails[index].department.selectedValue = value;
            return { ...prevState, appointment: updatedDetails };
        });
    };

    return (
        <>
            <div className="patient-details-wrapper">
                <div className="quick-view">
                    <h4>QuickView</h4>
                    <ul>
                        {
                            patinentDetails?.quickview.map((data,index)=> {
                                return (
                                    <React.Fragment key={index}>
                                        <li>
                                            <span>DOB</span>
                                            <span>{data.dob}</span>
                                        </li>
                                        <li>
                                            <span>First name</span>
                                            <span>{data.firstName}</span>
                                        </li>
                                        <li>
                                            <span>Last Name</span>
                                            <span>{data.lastName}</span>
                                        </li>
                                        <li>
                                            <span>Sex</span>
                                            <span>{data.sex}</span>
                                        </li>
                                        <li>
                                            <span>Phone</span>
                                            <span>{data.phone}</span>
                                        </li>
                                        <li>
                                            <span>Address</span>
                                            <span>{data.address}</span>
                                        </li>
                                        <li>
                                            <span>Email</span>
                                            <span>{data.email}</span>
                                        </li>
                                    </React.Fragment>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="appointment-details">
                    <h4>Appointment Details</h4>
                    <div className="appointment-form">
                        {
                            patinentDetails?.appointment.map((data,index)=> {
                                return (
                                    <React.Fragment key={index}>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="provide-group">Provider Group</label>
                                                <input id="provide-group" type="text" disabled defaultValue={data.providerGroup} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="appointment-date">Date</label>
                                                <input 
                                                    id="appointment-date" 
                                                    type="date" 
                                                    value={data.date}
                                                    onChange={(e) => {
                                                        handleDateChange(index, e.target.value);
                                                    }}
                                                     />
                                            </div>
                                        </div>
                                        <div className="form-row full-width">
                                            <div className="form-group">
                                                <label htmlFor="appointment-time">Time</label>
                                                <input 
                                                    type="time" 
                                                    name="appointment-time" 
                                                    id="appointment-time" 
                                                    value={data.time}
                                                    onChange={(e) => {
                                                        handleTimeChange(index, e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row full-width">
                                            <div className="form-group">
                                                <label htmlFor="department">Department</label>
                                                <select 
                                                    name="department" 
                                                    id="Department" 
                                                    value={data.department.selectedValue}
                                                    onChange={(event) => {
                                                        handleDepartmentChange(
                                                            index,
                                                            event.target.value
                                                        );
                                                    }}                          
                                                >
                                                    {
                                                        data?.department?.options.map((option,index) => {
                                                            return (
                                                                <React.Fragment key={index}>
                                                                    <option value={option.value}>{option.label}</option>
                                                                </React.Fragment>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="btn-wrapper">
                    <button className="border-btn" onClick={CancelAppointment}>Cancel</button>
                    <button className="secondary" onClick={ReviewAppointment}>Review</button>
                </div>
            </div>
        </>
    )
}

export default AppointmentSchedule;