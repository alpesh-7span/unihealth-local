import { EventCalendar, defaultCalendars, defaultEditorShape, de, en, ru, uid, RestDataProvider } from "@dhx/trial-eventcalendar"
import '@dhx/trial-eventcalendar/dist/event-calendar.css'
import { useEffect, useRef } from "react"

const Calendar1 = (props) => {

    // const restProvider = new RestDataProvider(url);

    const calendar = useRef()

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
        config: {
          maxEventsPerCell:2
        }
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
        },
      },
      {
        id: "hour_timeline",
        label: "Hour Timeline",
        layout: "timeline",
        config: {
          unassignedCol: true,
          step: [1, "week"],
          header: [
            { unit: "week", step: 1, format: "d MMM" }
          ],
          sections: [
              {
                label: "Andy Warh",
                id: "1",
                img: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_07.jpg",
                color: "#ff0000",
                surname: "Andy Warhhh",
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
    ];
      
    const config = {
      viewControl: "dropdown",
      views: views,
      dimPastEvents: true,
      dateClick: false
    };

    const editorShape = [
      ...defaultEditorShape,
      {
          type: "combo", // or "combo"
          key: "priority_key",
          label: "Event priority",
          options: [
              { id: 1, label: "high" },
              { id: 2, label: "medium" },
              { id: 3, label: "low" }
          ],
          config: {
              disabled: false,
              placeholder: "Select priority"
          },
      },
    ]
      
    const calendars = [
        ...defaultCalendars,
        {
            id: "moviex",
            label: "Custom Movie",
            readonly: false,
            active: false,
            color: {
                background: "#CEEDC3",
                border: "#77D257",
                textColor: "#3e98db"
            }
        }
    ];

    // const url = "https://docs.dhtmlx.com/event-calendar-backend";
    // const restProvider = new RestDataProvider(url);
    
    useEffect(()=> {
      // Promise.all([
      //   restProvider.getEvents(),
      //   restProvider.getCalendars(),
      // ]).then(([events, calendars]) => {
      //   console.log(events, 'events');
      //   console.log(calendars, 'calendars');
        // const event_calendar = new EventCalendar("#root", {
        //   events,
        //   calendars,
        //       config: { 
        //         timeRange: [ 8, 21 ] 
        //       },
        //       mode: "day",
        //   date: new Date("2023-02-10T00:00:00")
        // });
        // event_calendar.api.setNext(restProvider);
      // });

      const cl = new EventCalendar(calendar.current,{
          events: props.events,
          config,
          date: props.date,
          mode: "week",
          calendars,
          editorShape
      });

      // const state = cl.api.getState();
      // console.log(state, 'state');
      // console.log(state.editorShape({key: "priority_key"}), 'state.editorShape');
      // cl.addCalendar({calendar: {
      //     id: "restx",
      //     label: "Custom Rest",
      //     readonly: false,
      //     active: true,
      //     color: {
      //         background: "#EDD1EC",
      //         border: "#AD44AB",
      //         textColor: "#3e98db"
      //     }
      // }})
      // console.log(cl.getCalendar({id: "restx"}))


      // cl.openEditor({ id: 1 });
      // cl.api.exec("set-mode", { mode: "day" });

      // cl.createEvent();
    //   const calendar_data = cl.getCalendar({ id: "work" });
    // console.log(calendar_data);
    // cl.hideEventInfo();

    // cl.parse({ calendars });
    // const serialized_data = cl.serialize();
    // console.log(serialized_data);
    // cl.setLocale(de);
      // cl.showEventInfo({ id: "3" });
      // cl.api.intercept("select-event", (obj) => {
      //     if(obj.id == 2){
      //         console.log("ID is " + obj.id);
      //         return false;
      //     }
      // });
      // const stores = cl.api.getStores();
      // console.log(stores);
      // cl.api.on("add-calendar", (obj) => {
      //     console.log(obj);
      // });

      // const specificDate = new Date("Sun May 21 2023 00:00:00 GMT+0530");

      // if (specificDate.getHours() === 0 && specificDate.getMinutes() === 0 && specificDate.getSeconds() === 0) {
      //   // Perform something if the time is 00:00:00
      //   console.log("The time is 00:00:00");
      // } else {
      //   // Perform something if the time is not 00:00:00
      //   console.log("The time is not 00:00:00");
      // }

      // const eventBox = document.querySelectorAll('.wx-event-calendar-event-box');

      // eventBox.forEach((events)=> {
      //   // Date of events
      //   const specificDate = new Date(event_calendar.getEvent({ id: events.getAttribute('data-id') }).start_date);
      //   // Today's date
      //   const today = new Date();
      //   // Compare the dates
      //   if (specificDate < today) {
      //     events.classList.add('past-events');
      //   }
      // })

      // cellCss: date => {
      //   const hour = new Date(date).getHours();
      //   if (hour >= 12 && hour <= 14) {
      //     return "custom-disabled-time";
      //   }
      //   return "";
      // }

      // event_calendar.api.intercept("add-calendar", (obj) => {
      //   const found = calendars.some(item => item.label === obj.calendar.label);
      //   if (found) {
      //       console.log('The label value exists in the calendars array.');
      //       return false;
      //   }
      // })

      // On calendar add
      // event_calendar.api.on("add-calendar", (obj) => {
      //     console.log(obj);
      // });

      // On event add
      // event_calendar.api.on("add-event", (obj) => {
      //     console.log(obj);
      // });

      // const saveButton = document.getElementById('test');
      // saveButton.addEventListener('click', (e) => {
      //   event_calendar.parse(
      //     [ 
      //       {
      //         id: "123",
      //         type: "work",
      //         start_date: new Date("2023-05-22T19:00:00"),
      //         end_date: new Date("2023-05-22T20:30:00"),
      //         text: "Testing Data",
      //         details: "Philippe-Chatrier Court\n Paris, FRA",
      //       },
      //     ] 
      //   );
      // });

    }, [])

    useEffect(()=> {
        return()=> {
            calendar.current.innerHTML = "";
        }
    })

    return (
        <>  
            <div ref={calendar} style={{width: '100%', height: '100%'}}></div>
        </>
    )
}

export default Calendar1