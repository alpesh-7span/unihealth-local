import React, {createContext} from 'react';
import {createRoot} from 'react-dom/client';
import { EventCalendar, defaultCalendars, defaultEditorShape, RestDataProvider} from "@dhx/trial-eventcalendar"
import '@dhx/trial-eventcalendar/dist/event-calendar.css'
import { useEffect, useRef, useState } from "react"
import { appointment_type } from "../data/data"
import ClientAppointment from "../events-component/ClientAppointment"

export const CalendarContext = createContext();

const Calendar = (props) => {
  const calendar = useRef(); 

  const editorShape = appointment_type;

  const views = [
    {
      id: "week",
      label: "Week",
      layout: "week",
    },
    {
      id: "day",
      label: "Day",
      layout: "day",
    },
    {
      id: "month",
      label: "Month",
      layout: "month",
    },
    { 
      id: "year", 
      label: "Year", 
      layout: "year",  
    },
    {
      id: "agenda",
      label: "Agenda",
      layout: "agenda",
    },
    {
      id: "timeline",
      label: "Timeline",
      layout: "timeline",
      config: {
        unassignedCol: true,
        sections: [
          {
            label: "Andy Warh",
            id: "1",
            img: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_07.jpg",
          },
          {
            label: "James Tamer",
            id: "2",
            img: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_03.jpg",
          },
          {
            label: "Kristian Miley",
            id: "3",
            img: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_04.jpg",
          },
          {
            label: "Polina Azarko",
            id: "4",
            img: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_05.jpg",
          },
          {
            label: "Vladimir Volkov",
            id: "5",
            img: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_06.jpg",
          },
        ],
      },
    },
    {
      id: "hour_timeline",
      label: "Hour Timeline",
      layout: "timeline",
      config: {
        unassignedCol: true,
        step: [1, "hour"],
        header: [
          { unit: "day", step: 1, format: "d MMM" },
          { unit: "hour", step: 1, format: "H" },
        ],
      },
    },
  ];
  
  const config = {
    viewControl: "auto",
    views: views,
    timeRange: [0, 24], 
    dimPastEvents: true,
    editorOnDblClick: false,
    createEventOnDblClick: false
  };

  useEffect(()=> {
    
    const event_calendar = new EventCalendar(calendar.current, {
      events: props.events,
      date: props.date,
      config,
      editorShape,
    });

    
    const add_event_btn = document.querySelector('.wx-event-calendar-left div[data-id="add"]');
    add_event_btn.addEventListener('click', (e) => {
      setTimeout(()=>{
        const radioButtons = document.querySelectorAll('.wx-event-calendar-editor-wrapper .field .group-item input[type="radio"]');
        radioButtons.forEach((radio) => {
          radio.addEventListener('change', (event) => {
            
            const selectedValue = event.target.value;
            const targetDiv = document.querySelector('.wx-event-calendar-editor-wrapper .field .group-item input:checked').closest('.group-item');
            const blankElement = document.createElement('div');
            blankElement.id = "patient-list-wrapper"
            targetDiv.appendChild(blankElement);
            const targetEle = document.getElementById('patient-list-wrapper');

            if(selectedValue === 'client_appointment') {
              if(document.getElementById('custom-html') !== null) {
                document.getElementById('patient-list-wrapper').remove();
              }
              if(document.getElementById('patient-details') !== null) {
                document.getElementById('patient-details').remove();
              }
              createRoot(targetEle).render(
                <CalendarContext.Provider value={event_calendar}>
                  <ClientAppointment />
                </CalendarContext.Provider>
              );

            } else if(selectedValue === 'another_type') {
              if(document.getElementById('custom-html') !== null) {
                document.getElementById('patient-list-wrapper').remove();
              }
              if(document.getElementById('patient-details') !== null) {
                document.getElementById('patient-details').remove();
              }

              targetDiv.insertAdjacentHTML('beforeend', '');

            } else {
              if(document.getElementById('custom-html') !== null) {
                document.getElementById('patient-list-wrapper').remove();
              }
              if(document.getElementById('patient-details') !== null) {
                document.getElementById('patient-details').remove();
              }
            }
          });
        });
      },0)
    });

  }, []);

  // useEffect(()=> {
  //     return()=> {
  //         calendar.current.innerHTML = "";
  //     }
  // })

  return (
    <>
      <div ref={calendar} className="event-calendar-block" style={{width: '100%', height: '100%'}}></div>
    </>
  )
}
export default Calendar