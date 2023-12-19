import { Event } from "./Event";

export const EventFeed = () => {
  return (
    <aside className="p-4 bg-grey">
      <ul>
        <li>
          <Event personA="Alice" personB="Bob" eventName="made" />
        </li>
        <li>
          <Event personA="Alice" personB="Bob" eventName="denied" />
        </li>
        <li>
          <Event personA="Alice" personB="Bob" eventName="lent" />
        </li>
        <li>
          <Event personA="Alice" personB="Bob" eventName="lent" />
        </li>
      </ul>
    </aside>
  );
};
