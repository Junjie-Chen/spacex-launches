import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { sortCollection, handleError } from './utilities';

function fetchLaunches() {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    fetch('http://localhost:8080/launches')
      .then(response => response.json())
      .then(data => {
        setState({ data, loading: false });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return state;
}

function getSortedLaunchesByDate(dataCollection, func, sortingFunc) {
  let sortedLaunchesByDate = [];

  const hasError = handleError(() => {
    return sortCollection(dataCollection, func, sortingFunc);
  });

  // TODO: returns the error message if any

  if (hasError.result) {
    sortedLaunchesByDate = hasError.result;
  }

  return sortedLaunchesByDate;
}

function Header() {
  return (
    <div className="page-head">
      <h2 className="page-head-title text-center">Space X Launches</h2>
    </div>
  );
}

function Loading() {
  return (
    <div className="progress">
      <div
        className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
        role="progressbar"
        style={{ width: '100%' }}
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        Loading
      </div>
    </div>
  );
}

function Launches({ launches }) {
  const launchesByYear = launches.reduce((list, launch) => {
    const date = launch.launch_date_utc.slice(0, 4);
    list[date] = list[date] || [];
    list[date].push(launch);
    return list;
  }, {});

  return (
    <ul data-testid="launches" className="timeline timeline-variant">
      {Object.keys(launchesByYear).map(launchYear => {
        const sortedLaunchesByDate = getSortedLaunchesByDate(
          launchesByYear[launchYear],
          item => {
            if (!item.launch_date_utc) {
              throw new ReferenceError('The date cannot be found! Please check the corresponding property for the date.');
            }

            return [+new Date(item.launch_date_utc), item];
          },
          (a, b) => a - b
        );

        return (
          <span key={launchYear}>
            <li className="timeline-month">{launchYear}</li>
            {sortedLaunchesByDate.map(launch => (
              <Launch key={launch.flight_number} launch={launch} />
            ))}
          </span>
        );
      })}
    </ul>
  );
}

function Launch({ launch }) {
  const launchIcon = launch.launch_success ? (
    <i className="icon mdi mdi-rocket" />
  ) : (
    <i className="icon mdi mdi-bomb" />
  );

  return (
    <li className="timeline-item timeline-item-detailed right">
      <div className="timeline-content timeline-type file">
        <div className="timeline-icon">{launchIcon}</div>

        <div className="timeline-header">
          <span className="timeline-autor">
            #{launch.id}: {launch.mission_name}
          </span>{' '}
          <p className="timeline-activity">
            {launch.rocket.rocket_name} &mdash; {launch.launch_site.site_name}
          </p>
          <span data-testid="launch-date" className="timeline-time">{launch.launch_date_utc.slice(0, 10)}</span>
        </div>
        <div className="timeline-summary">
          <p>{launch.details}</p>
        </div>
      </div>
    </li>
  );
}

export default function App() {
  const { data, loading } = fetchLaunches();

  return (
    <div>
      <Header />
      {loading ? <Loading /> : <Launches launches={data.launches} />}
    </div>
  );
}
