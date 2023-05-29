import {createRoot} from 'react-dom/client';
import AppointmentSchedule from "./AppointmentSchedule";
import { CalendarContext } from '../components/Calendar';
import { useContext } from 'react';

const PatientData = (props) => {

  const event_calendar = useContext(CalendarContext);

  const patient_data = props.data;
  const handleRowClick = (index) => {
    console.log(`Clicked row with index ${index}`);

    const targetDiv = document.querySelector('#appointment_form input:checked').closest('.form-group');
    const blankElement = document.createElement('div');
    blankElement.id = "patient-details"
    targetDiv.appendChild(blankElement);
    const targetEle = document.getElementById('patient-details');

    createRoot(targetEle).render(
      <CalendarContext.Provider value={event_calendar}>
        <AppointmentSchedule dataId={index} />
      </CalendarContext.Provider>
    );
    
    const element = document.getElementById('patient-list-wrapper');
    const computedStyle = window.getComputedStyle(element);
    const isCurrentlyVisible = computedStyle.display !== 'none';

    if (isCurrentlyVisible) {
      element.style.display = 'none';
    }

  };

  return (
    <table className="patient-list">
      <thead>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>DOB</th>
          <th>Last 4 SSN</th>
        </tr>
      </thead>
      <tbody>
        {patient_data.map((row, index) => (
          <tr key={index} onClick={() => handleRowClick(row.id)}>
            <td>{row.lastName}</td>
            <td>{row.firstName}</td>
            <td>{row.dob}</td>
            <td>{row.last4SSN}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PatientData;