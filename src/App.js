import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { sortCollection, parseUrl, handleError } from './utilities';

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

function getLaunchVideoLink(url, base, parsingFunc) {
  let launchVideoLink = '';

  const hasError = handleError(() => {
    return parseUrl(url, base, parsingFunc);
  });

  // TODO: returns the error message if any

  if (hasError.result) {
    launchVideoLink = hasError.result;
  }

  return launchVideoLink;
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

  let times = 0;

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
              <Launch key={launch.id} launch={launch} times={++times} />
            ))}
          </span>
        );
      })}
    </ul>
  );
}

function Launch({ launch, times }) {
  const launchAlignment = times % 2 !== 0 ? 'right' : 'left';
  const launchStatus = launch.launch_success ? 'success' : 'failure';
  const launchIcon = launch.launch_success ? (
    <i className="icon mdi mdi-rocket" />
  ) : (
    <i className="icon mdi mdi-bomb" />
  );
  const launchVideoLink = getLaunchVideoLink(
    launch.links.video_link,
    'https://www.youtube.com/embed/',
    (url, base) => {
      /* Find YouTube video id using regular expression,
         e.g., ScYUA51-POQ out of https://youtu.be/ScYUA51-POQ.
         Learn more at https://www.regular-expressions.info/lookaround.html */
      const id = url.match(/(?<=v=|e\/)(?:(?!&).)*/)[0];

      if (!id) {
        throw new TypeError('The url does not have an id! Please provide an id.');
      }

      return `${base}${id}`;
    }
  );

  return (
    <li data-testid="launch" className={`timeline-item timeline-item-detailed ${launchAlignment}`}>
      <div className="timeline-content timeline-type file">
        <div data-testid="launch-icon" className={`timeline-icon ${launchStatus}`}>{launchIcon}</div>

        <div className="timeline-header">
          <span data-testid="launch-mission" className="timeline-autor">
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
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          data-testid="launch-video"
          className="embed-responsive-item"
          src={launchVideoLink}
          title={launch.mission_name}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
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
