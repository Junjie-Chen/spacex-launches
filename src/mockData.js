/**
 * @file Creates mock data.
 * @author Junjie Chen <junjie.chen18@gmail.com>
 */

export const mockData = {
  launches: [
    {
      details: "Launched with landing legs and titanium grid fins. Did not attempt a landing due to 'unfavorable weather conditions in the recovery area'.",
      id: "57",
      launch_date_utc: "2018-03-06T05:33:00.000Z",
      launch_site: { site_name: "CCAFS SLC 40" },
      launch_success: true,
      mission_name: "Hispasat 30W-6",
      rocket: { rocket_name: "Falcon 9" },
      links: { video_link: 'https://youtu.be/Kpfrp-GMKKM' }
    },
    {
      details: "Reused booster from the classified NROL-76 mission in May 2017. Following a successful experimental ocean landing that used three engines, the booster unexpectedly remained intact; Elon Musk stated in a tweet that SpaceX will attempt to tow the booster to shore.",
      id: "54",
      launch_date_utc: "2018-01-31T21:25:00.000Z",
      launch_site: { site_name: "CCAFS SLC 40" },
      launch_success: false,
      mission_name: "SES-16 / GovSat-1",
      rocket: { rocket_name: "Falcon 9" },
      links: { video_link: 'https://youtu.be/ScYUA51-POQ' }
    }
  ]
};
