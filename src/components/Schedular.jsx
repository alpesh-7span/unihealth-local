import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import React, { useEffect, useRef, useState } from 'react';
import { filterData, schAppointmentType } from '../data/data';
import ClientAppointment from '../schedular-component/ClientAppointment';

const scheduler = window.scheduler;

const Schedular = (props) => {
    
    const schedular_elem = useRef();
    const calendar_block = useRef();

    const [eventTypes, setEventTypes] = useState(filterData.work)
    const [eventEnvironments, setEventEnvironments] = useState(filterData.environments)

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);

        if(document.getElementById('patient-details') !== null) {
            document.getElementById('patient-details').remove();
        }
    };

    useEffect(()=> {
        // scheduler.skin = 'material';

        scheduler.plugins({
			minical: true,
            limit: true,	
			serialize: true
		});

        // Set default options
		scheduler.config.multi_day = true;
        scheduler.config.details_on_create = true;
        scheduler.config.server_utc = true;
        scheduler.config.occurrence_timestamp_in_utc = true;


        // Show events on pacific standard time
        // scheduler.attachEvent("onEventLoading", function(ev){
        //     ev.start_date = new Date(ev.start_date.valueOf() - (1000*60*60*8));
        //     ev.end_date = new Date(ev.start_date.valueOf() - (1000*60*60*8));
        //     return true;
        // });
        
        // Define an array of time zones
        var timeZones = [
            { offset: -7, label: "SF" }, // Pacific Time
            { offset: 5.5, label: "IST" }, // Indian Standard Time
            // Add more time zones as needed
        ];
        
        // Customize the y-axis scale labels
        scheduler.templates.hour_scale = function(date) {
            if (date.getMinutes() === 0) {
            var labels = timeZones.map(function(timeZone) {
                var offset = timeZone.offset;
                var timeZoneLabel = timeZone.label;
        
                // Calculate the time zone adjusted date and time
                var timeZoneDate = new Date(date.valueOf() + (offset * 60 * 60 * 1000));
        
                // Build the label with time zone information
                return (
                    `<div class="timezone-wrapper">
                        <div class="timezone-label">${timeZoneLabel}</div>
                        <div class="timezone-time">${scheduler.date.date_to_str("%H:%i")(timeZoneDate)}</div>
                    </div>`
                )
            });
        
            return labels.join(""); // Add line break between labels
            }
        
            return "";
        };
        console.log(scheduler, 'schedular')
        // Set initial height and width
        // scheduler.xy.scale_height = 10; 
        scheduler.xy.scale_width = 100;

        // Default values for filters
        const filters = {};
        Object.values(filterData).forEach((arr) => {
            arr.forEach((item) => {
                filters[item.key] = true;
            });
        });

        const filter_inputs = document.getElementById("filters_wrapper").getElementsByTagName("input");
        for (var i=0; i<filter_inputs.length; i++) {
            var filter_input = filter_inputs[i];

            // set initial input value based on filters settings
            filter_input.checked = filters[filter_input.name];

            // attach event handler to update filters object and refresh view (so filters will be applied)
            filter_input.onchange = function() {
                filters[this.name] = !!this.checked;
                scheduler.updateView();
                updIcon(this);
            };
        }

        // here we are using single function for all filters but we can have different logic for each view
        scheduler.filter_month = scheduler.filter_day = scheduler.filter_week = function(id, event) {
            // display event only if its type is set to true in filters obj
            // or it was not defined yet - for newly created event
            if (filters[event.type] || event.type==scheduler.undefined || filters[event.environment]) {
                return true;
            }

            // default, do not display event
            return false;
        };

         // Custom event popup
        var html = function(id) { return document.getElementById(id); }; //just a helper
        scheduler.showLightbox = function(id) {
            var ev = scheduler.getEvent(id);
            scheduler.startLightbox(id, html("appointment_form"));
        };
        
        function close_form() {
            scheduler.endLightbox(false, html("appointment_form"));
        }

        scheduler.event(document.querySelector("#appointment_form [id='close']"), "click", close_form);

        scheduler.init(schedular_elem.current, new Date(), "week");

        // Block past events
        scheduler.addMarkedTimespan({
            start_date: new Date(1906, 1, 1),
            end_date:   new Date(),
            // css:   "gray_section",   // the name of applied CSS class
            // html:"<b>Blocked</b>",
            type: "dhx_time_block"
        });
        scheduler.addMarkedTimespan({
            days:[0,1,2,3,4,5,6],
            zones:[13*60,15*60],
            type: "dhx_time_block"
        });
        scheduler.updateView();

        // Add events
        scheduler.clearAll();
        scheduler.parse([
            { start_date: "2023-05-30 12:00", end_date: "2023-05-30 20:00", text:"Appointment A-48865", type: "appointment", environment: "all", timezone: 'EST'},
            { start_date: "2023-05-22 14:00", end_date: "2023-05-22 16:00", text:"Task T-44864", type: "task", environment: "all", timezone: 'EST' },
            { start_date: "2023-05-26 16:30", end_date: "2023-05-26 18:00", text:"Training T-46558", type: "training", environment: "test", timezone: 'EST' },
            { start_date: "2023-05-24 18:30", end_date: "2023-05-24 20:00", text:"Appointment A-45564", type: "appointment", environment: "all", timezone: 'EST' }
        ]);

		function updIcon(el){
			el.parentElement.classList.toggle("checked_label");

			var iconEl = el.parentElement.querySelector("i"),
				checked = "check_box",
				unchecked = "check_box_outline_blank",
				className = "icon_color";

			iconEl.textContent = iconEl.textContent==checked?unchecked:checked;
			iconEl.classList.toggle(className);
		}

        //block all modifications
		// scheduler.attachEvent("onBeforeDrag",function(){return false;});
		// scheduler.attachEvent("onClick",function(){return false;});
		// scheduler.config.details_on_dblclick = true;
		// scheduler.config.dblclick_create = false;

        // Add mini calendar
        var calendar = scheduler.renderCalendar({
			container: calendar_block.current, 
			navigation:true,
			handler:function(date){
				scheduler.setCurrentView(date, scheduler.getState().mode);
			}
		});
		scheduler.linkCalendar(calendar);
		scheduler.setCurrentView();
    }, []);
    return (
        <>
            <div id="appointment_form">
                
                <div className="form-wrapper">
                    {
                        schAppointmentType?.map((data,index) => {
                            return (
                                <React.Fragment key={index}>
                                    <h4>{data.label}</h4>
                                    <div className="form-row full-width">
                                        {
                                            data?.options?.map((option,index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <div className="form-group">
                                                            <div className="input-wrapper">
                                                                <input 
                                                                    name={data.key} 
                                                                    type="radio" 
                                                                    id={option.value}
                                                                    value={option.value}
                                                                    checked={selectedOption === option.value}
                                                                    onChange={handleOptionChange}
                                                                />
                                                                <label htmlFor={option.value}>{option.label}</label>
                                                            </div>
                                                            {selectedOption === option.value && (
                                                                selectedOption === 'client_appointment' ?
                                                                <div id='patient-list-wrapper'>
                                                                    <ClientAppointment />
                                                                </div> :  ''
                                                            )}
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
                
                <div className='btn-wrapper'>
                    <button id="close">Close</button>
                </div>
            </div>
            <div className="sch-wrapper">
                <div className="sch_control sch-sidebar">
                    <div ref={calendar_block} className="calendar-block"></div>
                    <div className="filters_wrapper" id="filters_wrapper">
                        {
                            Object.keys(filterData)?.map((key, index) => {
                                return(
                                    <div className="filter-group" key={index}>
                                        <p>{key.charAt(0).toUpperCase() + key.slice(1)} <i className="material-icons icon_color">add</i></p>
                                        {
                                            filterData?.[key]?.map((item, index) => {
                                                return (
                                                    <label className="checked_label" id={item.key} key={item.key}>
                                                        <input type="checkbox" className="sch_radio" name={item.key} value={item.key} defaultChecked/>
                                                        <i className="material-icons icon_color">check_box</i>{item.label}
                                                    </label>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div
                    ref={ schedular_elem }
                    className='sch-block'
                >
                </div>
            </div>
        </>
    )
}

export default Schedular;