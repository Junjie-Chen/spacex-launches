import React from 'react';
import { mockData, sortCollection, cloneDeep } from '../setupTests';
import App from '../App';
import { render, cleanup, waitForElement } from 'react-testing-library';
// TODO: resolve act warning https://github.com/kentcdodds/react-testing-library/issues/281
import { act } from 'react-dom/test-utils';

let component;

beforeEach(async () => {
  /* When testing, code that causes React state updates should be wrapped into act(...):

     act(() => {
       // fire events that update state
     });
     // assert on the output

     This ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act */
  await act(async () => {
    component = render(<App />);
    await waitForElement(() => component.getByTestId('launches'));
  });
});

afterEach(cleanup);

test('renders launches', () => {
  expect(component).toMatchSnapshot();
});

test('renders launches in chronological order', () => {
  const renderedLaunchDates = component.getAllByTestId('launch-date');
  const launchesDeepClone = cloneDeep(mockData.launches);
  const sortedLaunchesDeepClone = sortCollection(
    launchesDeepClone,
    item => {
      if (!item.launch_date_utc) {
        throw new ReferenceError('The date cannot be found! Please check the corresponding property for the date.');
      }

      return [+new Date(item.launch_date_utc), item];
    },
    (a, b) => a - b
  );
  const launchDates = sortedLaunchesDeepClone.map(launch => {
    return launch.launch_date_utc.slice(0, 10);
  });

  expect(renderedLaunchDates).toHaveLength(2);
  renderedLaunchDates.forEach((launchDate, index) => {
    expect(launchDate.textContent).toBe(launchDates[index]);
  });
});
