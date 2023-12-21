import { Event } from "./Event";

export const EventFeed = ({ accusations, participants, statements }) => {
    console.log({ accusations , statements});
  let allEvents = [...accusations, ...statements];

  allEvents = allEvents.sort((a, b) => a.time < b.time ? 1 : -1);

  return (
    <aside className="p-4 bg-grey">
      <ul>
        {allEvents.map((event) => {
          const summary = event.toSummary();
          return (
            <li>
              <Event
                time={summary.time}
                personA={participants[summary.personA] ?? "unknown"}
                personB={participants[summary.personB]?? "unknown"}
                eventName={summary.eventName}
                uid={summary.regardingAccusation}
              />
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
