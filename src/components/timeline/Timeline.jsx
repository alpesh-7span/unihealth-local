import "../../../sch.js?v=6.0.4";
import "../../../sch-mat.css?v=6.0.4";
import { useEffect, useState } from "react";
import data from "./data";
import "./timeline.css";

const deepCopy = (x) => JSON.parse(JSON.stringify(x));

const scheduler = window.scheduler;
let timeline;

const Timeline = () => {
  const [providers, setProviders] = useState(deepCopy(data.providers));
  const [events, setEvents] = useState(deepCopy(data.events));

  useEffect(() => {
    // make the scheduler readonly
    // before loading data from the data source has been started
    scheduler.attachEvent("onLoadStart", function () {
      scheduler.config.readonly = true;
    });

    // make the scheduler editable
    // only after loading data from the data source is completed
    scheduler.attachEvent("onLoadEnd", function () {
      scheduler.config.readonly = false;
    });

    scheduler.plugins({
      timeline: true,
      units: true,
      collision: true,
    });

    scheduler.locale.labels.timeline_tab = "Unit";
    scheduler.locale.labels.section_custom = "Section";
    scheduler.config.details_on_create = true;
    scheduler.config.details_on_dblclick = true;

    //===============
    //Configuration
    //===============

    // set the 1st day of the week
    scheduler.config.start_on_monday = true;

    // create a timeline in the scheduler
    scheduler.createUnitsView({
      name: "unit",
      property: "section_id",
      list: providers,
      size: 7, // the number of units that should be shown in the view
      step: 5, // the number of units that will be scrolled at once
    });

    timeline = scheduler.matrix.timeline;

    //===============
    //Data loading
    //===============
    scheduler.config.lightbox.sections = [
      {
        name: "description",
        height: 130,
        map_to: "text",
        type: "textarea",
        focus: true,
      },
      {
        name: "custom",
        height: 23,
        type: "select",
        options: providers,
        map_to: "section_id",
      },
      { name: "time", height: 72, type: "time", map_to: "auto" },
    ];

    scheduler.init("scheduler_here", new Date(2022, 5, 30), "unit");
    scheduler.parse(events);
  }, []);

  return (
    <div className="timeline-root">
      <div
        id="scheduler_here"
        className="dhx_cal_container timeline-schedule-here"
      >
        <div className="dhx_cal_navline">
          <div className="timeline-navbar">
            <div>
              <button name="timeline_tab">Timeline</button>
            </div>
            <div className="dhx_cal_date"></div>
            <div>
              <div className="dhx_cal_prev_button"></div>
              <div className="dhx_cal_today_button"></div>
              <div className="dhx_cal_next_button"></div>
            </div>
          </div>
        </div>

        <div className="dhx_cal_header"></div>
        <div className="dhx_cal_data"></div>
      </div>
    </div>
  );
};

export default Timeline;
